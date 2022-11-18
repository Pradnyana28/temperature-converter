import request from 'supertest';

const key = process.env.SECRET_TOKEN;

describe('custom authorizer', () => {
    const connection = request(process.env.API_ENDPOINT);

    it('successfully convert parameter', async () => {
        const response = await connection.post('/temperature/convert/CELCIUS')
            .set('Authorization', key!)
            .send({
                temperature: 10
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            temperature: 50,
            type: 'FAHRENHEIT'
        });
    });

    it('successfully convert parameter with condition', async () => {
        const response = await connection.post('/temperature/convert/CELCIUS?condition=true')
            .set('Authorization', key!)
            .send({
                temperature: 10
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            temperature: 50,
            type: 'FAHRENHEIT',
            condition: 'VERY_COLD'
        });
    });
});