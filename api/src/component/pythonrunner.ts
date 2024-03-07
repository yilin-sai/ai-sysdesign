import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const pythonrunner = (code: string) => {
  const file = `${new Date().toISOString()}.png`;
  const bucket = process.env.S3_BUCKET;

  // run the python script and upload the diagram to s3
  execSync(
    `echo '${code}' > diagram.py && \
     python diagram.py && \
     mv high_level_system_diagram.png ${file} && \
     aws s3 mv ./${file} s3://${bucket}/`
  );

  return `https://${bucket}.s3.${
    process.env.AWS_REGION
  }.amazonaws.com/${encodeURI(file)}`;
};

export default pythonrunner;
