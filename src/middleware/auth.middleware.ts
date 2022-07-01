import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response, Request, NextFunction } from 'express';
import { IResponse } from '../interface/response.interface';
import { dbCore } from '../config/db.config';
dotenv.config();
let _response: IResponse = { status: false, message: ''};
export function authenticateToken(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined {
  const token = req.headers['token']


  if (token == null) {
    _response.status = false;
    _response.message = "Token not found";
    return res.status(401).json(_response);
  }

  jwt.verify(<string>token, <string>process.env.JWT_TOKEN
    ,(err, decoded) => {
      console.log(err)

      if (err) {
        if (err.name === 'TokenExpiredError') {
          _response.status = false;
          _response.message = "Token Expired";
          return res.status(498).json(_response);
        } else {
          _response.status = false;
          _response.message = "Token Expired";
          return res.status(401).json(_response);
        }
      }
      let _token = (<any>decoded).token;
      dbCore
        .count('user_id as jumlah')
        .from('t_user')
        .where({ 'api_key': _token })
        .first()
        .then((result) => {
          if (result.jumlah) {
            next()
          } else {
            _response.status = false;
            _response.message = "Unknown Token Error #1";
            return res.status(401).json(_response);
          }
        }, (error: any) => {
          _response.status = false;
            _response.message = "Unknown Token Error #2";
            return res.status(401).json(_response);
        })
      
 
    }) 
}