import { myDatabase } from '../config/db.config';
import { NextFunction, Request, Response } from "express";
import { generateAccessToken } from '../service/jwt.service';
import { IResponse } from '../interface/response.interface';

import crypto from 'crypto';
export async function doLogin(req: Request, res: Response, next: NextFunction) {
    let _response: IResponse = { status: false, message: '' };
    try {
        let _user: string = <string>req.body.user_id;
        let _password: string = <string>req.body.user_password;

        myDatabase
            .count('user_id as counter')
            .from('t_user')
            .whereRaw('user_id = ? user_pass = ?', [_user, _password])
            .first().then((result) => {
                if (result.counter) {
                    let _random = crypto.randomBytes(32).toString('hex');
                    let _token = generateAccessToken({ sub: _user, token: _random }, 36010);
                    myDatabase('t_user')
                        .where('user_id', _user)
                        .update({
                            'api_key': _random
                        }).then(() => {
                            _response.status = true;
                            _response.message = "Login Done and Token Generated";
                            _response.data = { token: _token };
                            return res.status(200).json(_response);
                        }, (err: any) => {
                            _response.status = false;
                            _response.message = err.message;
                            return res.json(_response);
                        });
                }
                else {
                    _response.status = false;
                    _response.message = "Kombinasi user dan password tidak ketemu";
                    return res.status(403).json(_response);
                }
            });
    } catch (err: any) {
        console.error(`Error while doing getNasabah`, err?.message);
        next(err);
    }
}