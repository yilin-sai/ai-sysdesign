import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import OpenAI from "openai";
import dotenv from "dotenv";

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
          content: `write python code using Diagrams library to create a high level simple system diagram based on the following information:
          - the users of the system are: ${request.users}
          - the functional requirements of the system are: ${request.functionalReq}
          - the nonfunctional requirements are: ${request.nonfunctionalReq}
          - In addition, please note that: ${request.other}

          The answer should only contain python code. If you can't provide the code, please explain why.
          Do not import from diagrams.generic
          `,
        },
      ],
      model: "gpt-4",
    });
    const answer = chatCompletion.choices[0].message.content;
    const code = answer?.match(/```python\n((.|\n)*)```/)?.[1]; // extract the python code
    const data = code ? code : answer; // if no code is provided, return the answer which should explain the reason
    res.status(httpStatus.OK);
    res.send({ status: "OK", data });
  } catch (err) {
    next(err);
  }
};

export default gpt;
