import { handler } from ".";
import { CustomError } from "../../utils/error";
import { ResponseType, StatusCode } from "../../utils/response";

describe('TemperatureConverterController', () => {
    it('should successfully convert temperature from celcius to fahrenheit', async () => {
        const mockEvent = {
            pathParameters: {
                from: 'CELCIUS'
            },
            queryStringParameters: {
                condition: 'true'
            },
            body: JSON.stringify({
                temperature: 40
            })
        };

        expect(
            await handler(mockEvent as any, {} as any, {} as any)
        ).toEqual({
            statusCode: 200,
            body: JSON.stringify({
                type: 'FAHRENHEIT',
                temperature: 104,
                condition: 'VERY_HOT'
            })
        });
    });

    it('should successfully convert temperature from fahrenheit to celcius', async () => {
        const mockEvent = {
            pathParameters: {
                from: 'FAHRENHEIT'
            },
            queryStringParameters: {
                condition: 'true'
            },
            body: JSON.stringify({
                temperature: 32
            })
        };

        expect(
            await handler(mockEvent as any, {} as any, {} as any)
        ).toEqual({
            statusCode: 200,
            body: JSON.stringify({
                type: 'CELCIUS',
                temperature: 0,
                condition: 'VERY_COLD'
            })
        });
    });

    it('should successfully validate incorrect path parameters', async () => {
        const mockEvent = {
            pathParameters: {
                from: 'FAHRENHEITSSSS'
            },
            queryStringParameters: {
                condition: 'true'
            },
            body: JSON.stringify({
                temperature: 32
            })
        };

        const result1 = await handler(mockEvent as any, {} as any, {} as any);
        expect(result1.statusCode).toEqual(StatusCode.INVALID_PARAMETER);

        const result2 = await handler({
            ...mockEvent,
            pathParameters: {
                fromsss: 'FAHRENHEIT'
            }
        } as any, {} as any, {} as any);
        expect(result2.statusCode).toEqual(StatusCode.INVALID_PARAMETER);
    });

    it('should successfully validate incorrect query string', async () => {
        const mockEvent = {
            pathParameters: {
                from: 'FAHRENHEIT'
            },
            queryStringParameters: {
                conditions: 'true'
            },
            body: JSON.stringify({
                temperature: 32
            })
        };

        expect(
            await handler(mockEvent as any, {} as any, {} as any)
        ).toEqual({
            statusCode: 200,
            body: JSON.stringify({
                type: 'CELCIUS',
                temperature: 0
            })
        });

        expect(
            await handler({
                ...mockEvent,
                queryStringParameters: {
                    condition: 'trueeeeee'
                }
            } as any, {} as any, {} as any)
        ).toEqual({
            statusCode: 200,
            body: JSON.stringify({
                type: 'CELCIUS',
                temperature: 0
            })
        });
    });

    it('should successfully validate incorrect body', async () => {
        const mockEvent = {
            pathParameters: {
                from: 'FAHRENHEIT'
            },
            queryStringParameters: {
                condition: 'true'
            },
            body: JSON.stringify({
                temperatures: 32
            })
        };

        const result1 = await handler(mockEvent as any, {} as any, {} as any);
        expect(result1.statusCode).toEqual(StatusCode.INVALID_PARAMETER);

        const result2 = await handler({
            ...mockEvent,
            body: JSON.stringify({
                temperature: '32'
            })
        } as any, {} as any, {} as any);
        expect(result2.statusCode).toEqual(StatusCode.INVALID_PARAMETER);

        const result3 = await handler({
            ...mockEvent,
            body: {
                temperature: '32'
            }
        } as any, {} as any, {} as any);
        expect(result3.statusCode).toEqual(StatusCode.INVALID_PARAMETER);
    });
});