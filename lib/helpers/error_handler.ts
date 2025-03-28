import IError from "../types/error";

export const getSpecificError = (name: string, errors: IError[]) => {
    const error = errors?.find((error) => error.field === name);
    return error?.message;
}

export const getErrText = (err: any, def = '') => {
    const msg: string = typeof err === 'string' ? err : err?.message || def || '';
    msg && console.log('error =>', msg);
    return msg;
};