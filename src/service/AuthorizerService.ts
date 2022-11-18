import fs from 'fs';
import path from 'path';
import base64 from 'base-64';
import { IdentifiedObject } from '../utils/interfaces';
import { ResponseType } from '../utils/response';
import { CustomError } from '../utils/error';

class AuthorizerService {
    private tokenPath = '../tools/token.txt';

    async authenticateToken(key: string) {
        const validatedToken = this.validateToken(key);
        const principalId = '';
        const effect = validatedToken ? 'Allow' : 'Deny';
        const context = {};
        return this.generateSuccessPolicy(principalId, effect, context);
    }

    validateToken(key: string) {
        const resolvedPath = path.resolve(path.join(__dirname, this.tokenPath));
        const savedToken = fs.readFileSync(resolvedPath);
        const encode = base64.decode(key);
        return encode === savedToken.toString();
    }

    generateSuccessPolicy(principalId: string, effect: string, context: IdentifiedObject) {
        return {
            principalId,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [{ Action: 'execute-api:Invoke', Effect: effect, Resource: '*' }]
            },
            context
        };
    }

    generateCustomErrorPolicy(error: Error | CustomError) {
        return {
            principalId: '',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [{ Action: 'execute-api:Invoke', Effect: 'Deny', Resource: '*' }]
            },
            context: {
                'message': error instanceof CustomError ? error.message : 'Not authorized!',
                'error': error instanceof CustomError ? error.name : ResponseType.ACCESS_DENIED
            }
        };
    }
}

export default new AuthorizerService();