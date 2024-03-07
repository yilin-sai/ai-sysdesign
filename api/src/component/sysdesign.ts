import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import OpenAI from "openai";
import dotenv from "dotenv";
import pythonrunner from "./pythonrunner";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env["GPT_API_KEY"],
});

interface IRequest {
  users: string; // users of the system
  functionalReq: string; // functional requirements of the system
  nonfunctionalReq: string; // nonfunctional requirements
  other: string; // other considerations
}

const sysdesign = async (req: Request, res: Response, next: NextFunction) => {
  const request = req.body as IRequest;
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `you are a senior solution architect, please write a python code snippet using Diagrams library to create a high level system diagram based on the following information:
          - the users of the system are: ${request.users}
          - the functional requirements of the system are: ${request.functionalReq}
          - the nonfunctional requirements are: ${request.nonfunctionalReq}
          - In addition, please note that: ${request.other}

          Make sure to apply the following restrictions and don't skip any of them:
          - Only return python code, and nothing else. Output with no introduction, no explanation, only code.
          - The python code should have exactly one Diagram() statement with name="High Level System Diagram" and show=False.
          - Only import the following modules:
            from diagrams import Diagram, Cluster
            from diagrams.onprem.client import Client, User
            from diagrams.aws.blockchain import BlockchainResource,Blockchain
            from diagrams.aws.compute import EC2, Lambda
            from diagrams.aws.database import Database
            from diagrams.aws.storage import SimpleStorageServiceS3Bucket
          - If you can't provide the code, please start the answer with "I'm sorry" and explain why.
          `,
        },
      ],
      model: "gpt-4",
    });
    const answer = chatCompletion.choices[0].message.content;
    // const code = answer?.match(/```(.)ython\n((.|\n)*)```/); // extract the python code
    if (answer && !answer.startsWith("I'm sorry")) {
      const diagramUrl = pythonrunner(answer);
      res.status(httpStatus.OK);
      res.send({ status: "OK", diagramUrl });
    } else {
      // if no code is provided, return the answer which should explain the reason
      res.status(httpStatus.OK);
      res.send({ status: "REFUSED", answer });
    }
  } catch (err) {
    next(err);
  }
};

export default sysdesign;
