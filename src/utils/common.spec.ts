import { convertKeyToUppercase } from "./common";

describe('Common', () => {
    it('should convert all object key to uppercase', async () => {
        const objectSample = {
            hello: 'world',
            Authorization: 'key',
            'x-access-token': 'key'
        };
        const objectExpect = {
            HELLO: 'world',
            AUTHORIZATION: 'key',
            'X-ACCESS-TOKEN': 'key'
        }
        const result = convertKeyToUppercase(objectSample);
        expect(result).toEqual(objectExpect);
    });
});