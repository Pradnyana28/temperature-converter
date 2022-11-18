import { handler } from ".";
import AuthorizerService from "../../service/AuthorizerService";
import { CustomError } from "../../utils/error";
import { ResponseType } from "../../utils/response";

describe('CustomAuthorizerController', () => {
    const successPolicy = AuthorizerService.generateSuccessPolicy('', 'Allow', {})
    const mockApiGatewayEvent = {
        headers: {
            Authorization: 'key'
        }
    };

    it('should successfully authenticate a request', async () => {
        jest.spyOn(AuthorizerService, 'authenticateToken')
            .mockReturnValue(Promise.resolve(successPolicy));

        const mockCallback = jest.fn();
        const result = await handler(mockApiGatewayEvent as any, {} as any, mockCallback);
        expect(result).toEqual(successPolicy);
    });

    it('should failed authenticate a request', async () => {
        const errorMessage = new CustomError('failed', '');
        const errorPolicy = AuthorizerService.generateCustomErrorPolicy(errorMessage);
        jest.spyOn(AuthorizerService, 'authenticateToken')
            .mockRejectedValue(errorMessage as never);

        const mockCallback = jest.fn();
        const result = await handler(mockApiGatewayEvent as any, {} as any, mockCallback);
        expect(result).toEqual(errorPolicy);
    });

    it('should failed authenticate a request: no header presented', async () => {
        const errorMessage = new CustomError('Invalid Headers! authorization is required.', ResponseType.INVALID_PARAMETER);
        const errorPolicy = AuthorizerService.generateCustomErrorPolicy(errorMessage);

        const mockCallback = jest.fn();
        const result = await handler({
            ...mockApiGatewayEvent,
            headers: {}
        } as any, {} as any, mockCallback);
        expect(result).toEqual(errorPolicy);
    });
});