import { dbCore } from '../config/db.config';
import { NextFunction, Request, Response } from "express";

export async function getNasabah(req: Request, res: Response, next: NextFunction) {
    try {
        let _scin = (<string>req.query.scin)?.split(",");
        const nasabah = await dbCore
            .select('nomor_nas', 'nama_nas', 'alamat', 'id_nomor','npwp')
            .from('t_nasabah')
            .whereIn('nomor_nas', _scin);
        res.json(nasabah);
    } catch (err: any) {
        console.error(`Error while doing getNasabah`, err?.message);
        next(err);
    }
}