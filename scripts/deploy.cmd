@SETLOCAL ENABLEDELAYEDEXPANSION ENABLEEXTENSIONS
@ECHO ON

:: Define variables
SET AWS_ACCESS_KEY=<YOUR_AWS_ACCESS_KEY>
SET AWS_SECRET_KEY=<YOUR_AWS_SECRET_KEY>
SET ENVIRONMENT=dev
SET REGION=ap-southeast-1
SET STAGE=dev

:: Install dependencies
call npm install

:: Install serverless
call npm install -g serverless serverless-plugin-common-excludes serverless-plugin-include-dependencies glob

:: Build the app
call npm run build

:: Generate token
call npm run generate:token

:: Run test
call npm run test:ci

:: Prune the dev dependencies
call npm prune --production

:: Configure Serverless
call sls config credentials --profile peatix-test --provider aws --key %AWS_ACCESS_KEY% --secret %AWS_SECRET_KEY% -o
mkdir .\dist\layer\nodejs\node_modules
xcopy .\node_modules .\dist\layer\nodejs\node_modules /E /H /C /I
copy serverless.yml .\dist

:: Deploy to cloud provider
cd .\dist
call sls deploy --aws-profile peatix-test --region %REGION% --stage %STAGE%

:: Cleanup global module (For running local only)
call npm uninstall -g serverless serverless-plugin-common-excludes serverless-plugin-include-dependencies glob