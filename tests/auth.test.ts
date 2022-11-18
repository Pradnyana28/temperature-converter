import request from 'supertest';

const key = process.env.SECRET_TOKEN;

describe('custom authorizer', () => {
    const connection = request(process.env.API_ENDPOINT);

    it('successfully validate authorization token', async () => {
        const response = await connection.post('/temperature/convert/CELCIUS')
            .set('Authorization', key!);
        expect(response.statusCode).toEqual(422);
        expect(response.body.error).toEqual('INVALID_PARAMETER');
    });

    it('successfully validate no header provided', async () => {
        const response = await connection.post('/temperature/convert/CELCIUS');
        expect(response.statusCode).toEqual(401);
        expect(response.body.message).toEqual('Unauthorized');
    });

    it('successfully validate invalid authentication', async () => {
        const response = await connection.post('/temperature/convert/CELCIUS')
            .set('Authorization', 'FAKE');
        expect(response.statusCode).toEqual(403);
        expect(response.body.Message).toEqual('User is not authorized to access this resource with an explicit deny');
    });

    it('successfully validate authorization token with case-incensitive header', async () => {
        const response = await connection.post('/temperature/convert/CELCIUS')
            .set('AuthOrizAtion', key!);
        expect(response.statusCode).toEqual(422);
        expect(response.body.error).toEqual('INVALID_PARAMETER');
    });
});