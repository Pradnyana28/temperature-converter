import { CustomError } from "./error";
import { ResponseType, StatusCode } from "./response";

describe('CustomError', () => {
    it('should trigger an error', async () => {
        try {
            throw new CustomError('Message', ResponseType.ACCESS_DENIED, StatusCode.ACCESS_DENIED);
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError);
            expect(error.message).toEqual('Message');
            expect(error.code).toEqual(StatusCode.ACCESS_DENIED);
            expect(error.name).toEqual(ResponseType.ACCESS_DENIED);
        }
    });
});