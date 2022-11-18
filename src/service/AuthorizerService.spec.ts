import AuthorizerService from "./AuthorizerService";
import base64 from 'base-64';
import { ResponseType, StatusCode } from "../utils/response";
import { CustomError } from "../utils/error";

jest.mock('fs', () => ({
    readFileSync: () => ({
        toString: () => 'IRONMAN'
    })
}));

describe('AuthorizerService', () => {
    const token = 'IRONMAN';
    let encodedToken: string;

    beforeAll(() => {
        encodedToken = base64.encode(token);
    });

    describe('authenticateToken()', () => {
        it('should successfully authenticate a token: allow', async () => {
            const expectPolicy = AuthorizerService.generateSuccessPolicy('', 'Allow', {});

            const result = await AuthorizerService.authenticateToken(encodedToken);
            expect(result).toEqual(expectPolicy);
        });
    });

    describe('generateCustomErrorPolicy()', () => {
        it('should successfully generate custom error token: Error', async () => {
            const errorInstance = new Error('failed');
            const expectPolicy = {
                principalId: '',
                policyDocument: {
                    Version: '2012-10-17',
                    Statement: [{ Action: 'execute-api:Invoke', Effect: 'Deny', Resource: '*' }]
                },
                context: {
                    'message': 'Not authorized!',
                    'error': ResponseType.ACCESS_DENIED
                }
            };
            const result = await AuthorizerService.generateCustomErrorPolicy(errorInstance);
            expect(result).toEqual(expectPolicy);
        });

        it('should successfully generate custom error token: CustomError', async () => {
            const errorInstance = new CustomError('failed', ResponseType.ACCESS_DENIED, StatusCode.ACCESS_DENIED);
            const expectPolicy = {
                principalId: '',
                policyDocument: {
                    Version: '2012-10-17',
                    Statement: [{ Action: 'execute-api:Invoke', Effect: 'Deny', Resource: '*' }]
                },
                context: {
                    'message': errorInstance.message,
                    'error': errorInstance.name
                }
            }
            const result = AuthorizerService.generateCustomErrorPolicy(errorInstance);
            expect(result).toEqual(expectPolicy);
        });
    });
});