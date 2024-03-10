import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20000,
});

interface IRequest {
  users: string; // users of the system
  functionalReq: string; // functional requirements of the system
  nonfunctionalReq: string; // nonfunctional requirements
  other: string; // other considerations
}

export async function getSysDesign(request: IRequest) {
  console.log(process.env["NEXT_PUBLIC_API_URL"]);
  return api.post("/sysdesign", request);
}
