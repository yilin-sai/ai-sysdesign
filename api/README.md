# REST API

The REST API has a single endpoint `POST /sysdesign`. The endpoint generates a system architecture diagram (a png file) based on the requiments specified in the request.

Request:

```javascript
{
  users: string; // users of the system
  functionalReq: string; // functional requirements of the system
  nonfunctionalReq: string; // nonfunctional requirements
  other: string; // other considerations
}
```

Response:

```javascript
{
  status: "OK";
  diagramUrl: string; // URL of the generated system diagram
}
```

or

```javascript
{
  status: "REFUSED";
  answer: string; // the reason why chatgpt refused to generate a diagram
}
```

## How it works

Upon receiving a request, the endpoint interfaces with the ChatGPT API to retrieve Python code for drawing the system diagram. Subsequently, it initiates a shell process to execute the Python code. Finally, the resulting diagram is uploaded to Amazon S3.

## Development

### Prerequisites

The API requires:

- Node version: v18.16.0
- Python 3
- Graphviz
- AWS CLI

The neccessary python libraries are listed in `py-requirements.txt`. The script to set up an EC2 (Ubuntu) with the necessary environment is `ec2-setup.sh`.

After installing the prerequisites:

```sh
npm install
npm run dev
```
