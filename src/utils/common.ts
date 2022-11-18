import { IdentifiedObject } from "./interfaces";

export const convertKeyToUppercase = (obj: IdentifiedObject) => {
    return Object.keys(obj).reduce((newObj: IdentifiedObject, key) => {
        newObj[key.toString().toUpperCase()] = obj[key];
        return newObj;
    }, {});
};