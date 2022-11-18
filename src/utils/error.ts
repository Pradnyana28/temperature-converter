export class CustomError extends Error {
    constructor(public message: string, public name: string, public code?: number) {
        super(message);
        this.code = code ?? 422;
    }
}