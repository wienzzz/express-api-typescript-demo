import { dbCore } from '../config/db.config';
import { NextFunction, Request, Response } from "express";
import { IResponse } from '../interface/response.interface';

export async function getNasabah(req: Request, res: Response, next: NextFunction) {
    let _response: IResponse = { status: false, message: '' };
    try {
        let _scin = (<string>req.query.scin)?.split(",");
        dbCore
            .select('nomor_nas', 'nama_nas', 'alamat', 'id_nomor','npwp')
            .from('t_nasabah')
            .whereIn('nomor_nas', _scin)
            .then((result) => {
                _response.status = true;
                _response.message = "berhasil ambil data scin";
                _response.data = result;
                return res.status(200).json(_response);
            }, (err: any) => {
                _response.status = false;
                _response.message = err.message;
                return res.json(_response);
            });
    } catch (err: any) {
        console.error(`Error while doing getNasabah`, err?.message);
        next(err);
    }
}

export async function searchNasabah(req: Request, res: Response, next: NextFunction) {
    let _response: IResponse = { status: false, message: '' };
    try {
        let _scin = <string>req.query.nomor_nas ?? '%';
        let _nama = '%'+<string>req.query.nama_nas+'%' ?? '%';
        let _alamat = '%'+<string>req.query.alamat+'%' ?? '%';
        let _ktp = <string>req.query.id_nomor+'%' ?? '%';
        let _npwp = <string>req.query.npwp+'%' ?? '%';
        const nasabah = await dbCore
            .select('nomor_nas', 'nama_nas', 'alamat', 'id_nomor','npwp')
            .from('t_nasabah')
            .whereILike('nomor_nas', _scin)
            .andWhereILike('nama_nas', _nama)
            .andWhereILike('alamat',_alamat)
            .andWhereILike('id_nomor',_ktp)
            .andWhereILike('npwp',_npwp)
            .then((result) => {
                _response.status = true;
                _response.message = "berhasil cari nasabah data scin";
                _response.data = result;
                return res.status(200).json(_response);
            }, (err: any) => {
                _response.status = false;
                _response.message = err.message;
                return res.json(_response);
            });
    } catch (err: any) {
        console.error(`Error while doing getNasabah`, err?.message);
        next(err);
    }
}