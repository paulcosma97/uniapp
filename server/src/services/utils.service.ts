import {Response} from "express";

export function sendBadRequest(res: Response, message?: string): void {
    res.status(400);
    res.json({
        code: 'Bad Request',
        message
    })
}

export function sendInternalServerError(res: Response): void {
    res.status(400);
    res.json({
        code: 'Internal Server Error'
    })
}