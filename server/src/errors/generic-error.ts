import {Response} from "express";
import {sendInternalServerError} from "../services/utils.service";

export default class GenericError extends Error {
    constructor(public handler: (res: Response) => any) {
        super();
    }

}

function isGenericError(error: any): error is GenericError {
    return 'handler' in error;
}

export async function handleError(error: any, res: Response) {
    if (isGenericError(error)) {
        await error.handler(res);
    } else {
        sendInternalServerError(res);
    }
}