# Temperature Transform API


## Overview

An API service that convert the temperature from Celcius or Fahrenheit to desired output. This project is developed with TypeScript since it will reduce the possibility of mistype or bug in the code.


## Published API

POST: https://enepdejfp2.execute-api.ap-southeast-1.amazonaws.com/dev/temperature/convert/FAHRENHEIT?condition=true

Headers:
- Authorization: `SVJPTk1BTi1QT1dFUkZVTA==`

Body: `{
    "temperature": 20
}`

## How To Use

### 1. Prerequisites

Before start using this API, make sure all of these tools are satisfied:
- `Node.js` version 16 or greater
- `npm` version 8 or greater
- Create the AWS client and secret key with IAM User in AWS Console and use it in this `scripts/deploy.sh` file by replacing the `AWS_ACCESS_KEY` and `AWS_SECRET_KEY` variable. ([Create Access and Secret key](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html))
- Optional: Update the `SECRET_TOKEN` variable in `/src/tools/generate-token.ts` file

### 2. Install

Install all the dependencies with this command:

```
npm install
```

### 3. Build

This project use the default TypeScript compiler to export the script to JavaScript. Run this command to build the project:

```bash
npm run build
```

### 4. Generate Authorization Token

Since the endpoint is protected with `AWS API Gateway Custom Authorizer` that require authorization token in the header then we need to generate the token first so the authenticator can validate the incoming request. You can run this command to generate new authorization token:

```
npm run generate:token
```

This will save the generated token to a file named `token.txt` under `dist/tools` folder.

### 5. Deployment

This project already bundled with Serverless.yml and deployment scripts to deploy the project to AWS cloud service. All you need to do is by running this command:

LINUX/WSL/OSX: To deploy under UNIX environment:

First, set the file to be an executable file.
```bash
chmod +x ./scripts/deploy.sh
```
Second, execute the deploy file.
```bash
./scripts/deploy.sh
```

WINDOWS: To deploy under DOS environment, use this command:
```cmd
.\scripts\deploy.cmd
```

* NOTE: When this command is executed, it'll also execute the test cases prior deployment.

## Development

There is no special action required for the development. You can start immediately write the code, fix, or append new features. After finish writing code, deploy the project with the deploy command. You'll then can test it through the endpoint that will be presented after the project successfully deployed.

## Tests

The test framework used in this project is `jest` since it provides us some of the essentials features that we need for testing such as `mock`, `spy`, `assert`, etc.. All tests can be run with this single command `npm run test:ci` to make sure everything is working as expected. You can also run each test independently with the following scenarios.

### Unit Test

To run the unit test only, you can execute this command:

```
npm run test
```

All tests under `.spec.ts` extension will be executed.

### Unit Test + Code Coverage

To see whether all the line of codes has been covered by the unit test, run this command to see the coverage report:

```
npm run test:coverage
```

### Integration Test

The integration test will test the real API after successfully deployed. You can update the `API_ENDPOINT` and `SECRET_TOKEN` if necessary in this file `jest-env.js`:

```
npm run test:integration
```

* NOTE: This test is excluded from the `deploy` script since it's depend on the API endpoint base url.

### End-to-end Test

To test or use the endpoint, you need to deploy it first with run deploy command then the API will be presented in the console.


## Request and Response Contract

This section describe how the client should handle request and response from the API.

| Endpoint                   | Method | Request Payload                  | Response                                                   |
| -------------------------- | ------ | -------------------------------- | ---------------------------------------------------------- |
| /temperature/convert/:from | POST   | ```{     "temperature": 20 } ``` | ```{     "temperature": 30,     "type": "FAHRENHEIT" } ``` |


### Optional Queries

- `?condition=true` => To display the current temperature condition based on the value provided. Possible values: `VERY_COLD`, `COLD`, `WARM`, `HOT`, `VERY_HOT`, `YOUR_PC_BURNT`, `NO_IDEA`

### Status Code

| Status Code | Type               | Description                                               |
| ----------- | ------------------ | --------------------------------------------------------- |
| 200         | SUCCESSFUL         | The payload is successfully processed                     |
| 422         | INVALID PARAMETERS | The `type` in the URL parameter or the payload is invalid |

### Error Response

```json
{
    "error": "INVALID_PARAMETERS",
    "message": "Missing field: temperature is required"
}
```

## Proposal

Based on the functionality and requirement of the API, I think by using Serverless approach will be a good fit for this circumstance.

### Virtual Machine VS Serverless

Virtual machine is great in some scenarios such as running a complex application or an application that requires to use custom amount of RAM, Disk Storage, and CPUs. Moreover, it might need to monitor and maintain it as well.

On the other hand, serverless not require us to maintain or monitor it 24 hours. Hence, we can focus on build the feature and write the code. Because of that, serverless infrastructure is a match this requirement.

### Architecture

![Temperature API Architecture](https://i.ibb.co/xjmXgg8/Untitled-Diagram.jpg)