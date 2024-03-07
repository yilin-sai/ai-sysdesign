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
  users: string;
  functionalReq: string;
  nonfunctionalReq: string;
  other: string;
}

const gpt = async (req: Request, res: Response, next: NextFunction) => {
  const request = req.body as IRequest;
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `forget about all the previous conversations and contexts,
          write a python code snippet using Diagrams library to create a high level system diagram based on the following information:
          - the users of the system are: ${request.users}
          - the functional requirements of the system are: ${request.functionalReq}
          - the nonfunctional requirements are: ${request.nonfunctionalReq}
          - In addition, please note that: ${request.other}
          - The python code should produce a single diagram
          - Only import the following:
          from diagrams import Diagram, Cluster
          from diagrams.onprem.client import Client, User
          from diagrams.aws.blockchain import BlockchainResource,Blockchain
          from diagrams.aws.compute import EC2, Lambda
          from diagrams.aws.database import Database
          from diagrams.aws.storage import SimpleStorageServiceS3Bucket

          Do not include any shell script in the answer.
          If you can't provide the code, please explain why.
          `,
        },
      ],
      model: "gpt-4",
    });
    const answer = chatCompletion.choices[0].message.content;
    const code = answer?.match(/```(.)ython\n((.|\n)*)```/); // extract the python code
    if (code) {
      const diagramUrl = pythonrunner(code[2]);
      res.status(httpStatus.OK);
      res.send({ status: "OK", diagramUrl, code: code[2] });
    } else {
      // if no code is provided, return the answer which should explain the reason
      res.status(httpStatus.OK);
      res.send({ status: "OK", answer });
    }
  } catch (err) {
    next(err);
  }
};

export default gpt;
