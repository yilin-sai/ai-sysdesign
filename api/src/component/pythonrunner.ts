import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { exec } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const pythonrunner = (req: Request, res: Response, next: NextFunction) => {
  exec(
    `echo '${
      req.body.data
    }' > diagram.py && python diagram.py && aws s3 cp ./ s3://${
      process.env.S3_BUCKET
    }/${new Date().toISOString()} --recursive --exclude "*" --include "*.png" --exclude "node_modules/*"`,
    (err) => {
      next(err);
    }
  );
  res.status(httpStatus.OK);
  res.send({ status: "OK" });
};

export default pythonrunner;
