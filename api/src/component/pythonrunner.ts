import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { exec } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const pythonrunner = (req: Request, res: Response, next: NextFunction) => {
  const fileName = `${new Date().toISOString()}.png`;
  // run the python script and upload the diagram to s3
  exec(
    `echo '${req.body.data}' > diagram.py && \
     python diagram.py && \
     mv *.png ${fileName} && \
     aws s3 mv ./ s3://${process.env.S3_BUCKET}/ --recursive --exclude "*" --include "*.png" --exclude "node_modules/*"`,
    (err) => {
      next(err);
    }
  );
  res.status(httpStatus.OK);
  res.send({
    status: "OK",
    diagramUrl: `https://${process.env.S3_BUCKET}.s3.${
      process.env.AWS_REGION
    }.amazonaws.com/${encodeURI(fileName)}`,
  });
};

export default pythonrunner;
