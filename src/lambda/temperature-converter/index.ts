import { APIGatewayEvent, APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters, Callback, Context } from "aws-lambda";
import TemperatureService from "../../service/TemperatureService";
import { BaseHandler } from "../../utils/base-handler";
import { CustomError } from "../../utils/error";
import { Temperature } from "../../utils/interfaces";
import { ResponseType } from "../../utils/response";

export async function handler(
    event: APIGatewayEvent,
    context: Context,
    response: Callback
) {
    return new TemperatureConverterController().handle(event, context, response);
}

class TemperatureConverterController extends BaseHandler {
    protected async doWork(
        event: APIGatewayEvent,
        context: Context,
        response: Callback
    ) {
        const { pathParameters, body, queryStringParameters } = event;

        const { condition } = this.validateQueryString(queryStringParameters);
        const { from } = this.validateParameters(pathParameters);
        const { temperature } = this.validateBody(body);

        let result: number = 0;
        let type: Temperature = Temperature.FAHRENHEIT;
        if (from === Temperature.CELCIUS) {
            type = Temperature.FAHRENHEIT;
            result = TemperatureService.convertCelciusToFahrenheit(temperature);
        }
        if (from === Temperature.FAHRENHEIT) {
            type = Temperature.CELCIUS;
            result = TemperatureService.convertFahrenheitToCelcius(temperature);
        }

        return {
            type,
            temperature: result,
            ...(condition ? { condition: TemperatureService.temperatureCondition(result, type) } : undefined)
        };
    }

    validateQueryString(query: APIGatewayProxyEventQueryStringParameters | null) {
        let condition = undefined;
        if (query && query.condition) {
            condition = query.condition === "true";
        }

        return {
            condition
        }
    }

    validateParameters(params: APIGatewayProxyEventPathParameters | null) {
        if (!params || !params.from) {
            throw new CustomError('Missing parameter: from is required', ResponseType.INVALID_PARAMETER);
        }

        if (![
            Temperature.CELCIUS,
            Temperature.FAHRENHEIT
        ].includes(params.from as Temperature)) {
            throw new CustomError('Invalid value: could not recognize :from value', ResponseType.INVALID_PARAMETER);
        }

        return params;
    }

    validateBody(body: string | null) {
        if (!body || typeof body !== 'string') {
            throw new CustomError('Missing field: temperature is required', ResponseType.INVALID_PARAMETER);
        }

        const parsedBody = JSON.parse(body);
        if (!parsedBody.temperature) {
            throw new CustomError('Missing field: temperature is required', ResponseType.INVALID_PARAMETER);
        }

        if (typeof parsedBody.temperature !== 'number') {
            throw new CustomError('Invalid value: temperature must be a number', ResponseType.INVALID_PARAMETER);
        }

        return parsedBody;
    }
}