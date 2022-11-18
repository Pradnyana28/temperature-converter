import { APIGatewayEvent, Callback, Context, CustomAuthorizerResult } from 'aws-lambda';
import AuthorizerService from '../../service/AuthorizerService';
import { convertKeyToUppercase } from '../../utils/common';
import { CustomError } from '../../utils/error';
import { IdentifiedObject } from '../../utils/interfaces';
import { ResponseType } from '../../utils/response';

export async function handler(
    event: APIGatewayEvent,
    context: Context,
    response: Callback
) {
    return new CustomAuthorizerController().doWork(event, context, response);
}

class CustomAuthorizerController {
    async doWork(
        event: APIGatewayEvent,
        context: Context,
        response: Callback
    ) {
        let result;

        try {
            const { Authorization } = this.validateHeader(event.headers);
            result = await AuthorizerService.authenticateToken(Authorization);
        } catch (error: any) {
            result = AuthorizerService.generateCustomErrorPolicy(error);
        }

        return result;
    }

    validateHeader(headers: IdentifiedObject) {
        const transformedHeaders = convertKeyToUppercase(headers);

        if (!transformedHeaders.AUTHORIZATION) {
            throw new CustomError(
                'Invalid Headers! authorization is required.',
                ResponseType.INVALID_PARAMETER
            );
        }

        return {
            Authorization: transformedHeaders.AUTHORIZATION
        };
    }
}