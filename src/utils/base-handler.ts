import { APIGatewayEvent, Callback, Context } from "aws-lambda";

export abstract class BaseHandler {
    async handle(
        event: APIGatewayEvent,
        context: Context,
        response: Callback
    ) {
        try {
            const result = await this.doWork(event, context, response);
            return {
                statusCode: 200,
                body: JSON.stringify(result)
            };
        } catch (error: any) {
            return {
                statusCode: error.code,
                body: JSON.stringify({
                    error: error.name,
                    message: error.message
                })
            };
        }
    }

    protected abstract doWork(
        event: APIGatewayEvent,
        context: Context,
        response: Callback
    ): void;
}