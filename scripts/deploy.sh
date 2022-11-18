# Define variables
AWS_ACCESS_KEY="<YOUR_AWS_ACCESS_KEY>"
AWS_SECRET_KEY="<YOUR_AWS_SECRET_KEY>"
ENVIRONMENT="dev"
REGION="ap-southeast-1"
STAGE="dev"

# Install dependencies
npm install

# Install serverless
npm install -g serverless serverless-plugin-common-excludes serverless-plugin-include-dependencies glob

# Build the app
npm run build

# Generate token
npm run generate:token

# Run test
npm run test:ci

# Prune the dev dependencies
npm prune --production

# Configure Serverless
sls config credentials --profile peatix-test --provider aws --key ${AWS_ACCESS_KEY} --secret ${AWS_SECRET_KEY} -o
mkdir -p ./dist/layer/nodejs/node_modules
cp -r ./node_modules ./dist/layer/nodejs
cp serverless.yml ./dist

# Deploy to cloud provider
cd ./dist
SLS_DEBUG=* sls deploy --aws-profile peatix-test --region ${REGION} --stage ${STAGE}

# Cleanup global module (For running local only)
npm uninstall -g serverless serverless-plugin-common-excludes serverless-plugin-include-dependencies glob