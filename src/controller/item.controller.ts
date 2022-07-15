import { myDatabase } from '../config/db.config';
import { NextFunction, Request, Response } from "express";
import { IResponse } from '../interface/response.interface';

export async function addItem(req: Request, res: Response, next: NextFunction) {
    let _response: IResponse = { status: false, message: '' };
    try {
        let _id: string = <string>req.body.item_id;
        let _name: string = <string>req.body.item_name;
        let _price: number = <number>req.body.price_list; 
        let _stock: number = <number>req.body.stock; 
        let _info: string = <string>req.body.item_info;

        myDatabase('m_item')
            .insert([{item_id: _id, item_name: _name, price_list: _price, stock: _stock, item_info: _info}])
            .then((result) => {
                _response.status = true;
                _response.message = "Add Item Success";
                return res.status(200).json(_response);
            }, (err: any) => {
                _response.status = false;
                _response.message = err.message;
                return res.json(_response);
            });
    } catch (err: any) {
        console.error(`Error while doing addItem`, err?.message);
        next(err);
    }
}

export async function editItem(req: Request, res: Response, next: NextFunction) {
    let _response: IResponse = { status: false, message: '' };
    try {
        let _id: string = <string>req.body.item_id;
        let _name: string = <string>req.body.item_name;
        let _price: number = <number>req.body.price_list; 
        let _stock: number = <number>req.body.stock; 
        let _info: string = <string>req.body.item_info;

        myDatabase('m_item')
            .where('item_id',_id)
            .update({
                item_name: _name,
                price_list: _price, 
                stock: _stock,
                item_info: _info
            })
            .then((result) => {
                _response.status = true;
                _response.message = "Update Item Success";
                return res.status(200).json(_response);
            }, (err: any) => {
                _response.status = false;
                _response.message = err.message;
                return res.json(_response);
            });
    } catch (err: any) {
        console.error(`Error while doing addItem`, err?.message);
        next(err);
    }
}

export async function getItem(req: Request, res: Response, next: NextFunction) {
    let _response: IResponse = { status: false, message: '' };
    try {
        let _id = <string>req.query.item_id;

        myDatabase
            .select('item_id','item_name','price_list','stock','item_info')
            .from('m_item')
            .where('item_id',_id)
            .first()
            .then((result) => {
                _response.status = true;
                _response.data = result;
                _response.message = "Get Item Success";
                return res.status(200).json(_response);
            }, (err: any) => {
                _response.status = false;
                _response.message = err.message;
                return res.json(_response);
            });
    } catch (err: any) {
        console.error(`Error while doing getItem`, err?.message);
        next(err);
    }
}

export async function listItem(req: Request, res: Response, next: NextFunction) {
    let _response: IResponse = { status: false, message: '' };
    try {
        let _search = (<string>req.query.search_keyword) ? <string>req.query.search_keyword+'%' : '%';
        myDatabase
            .select('item_id','item_name','price_list','stock','item_info')
            .from('m_item')
            .whereILike('item_name',_search)
            .then((result) => {
                _response.status = true;
                _response.data = result;
                _response.message = "List Item Success";
                return res.status(200).json(_response);
            }, (err: any) => {
                _response.status = false;
                _response.message = err.message;
                return res.json(_response);
            });
    } catch (err: any) {
        console.error(`Error while doing listItem`, err?.message);
        next(err);
    }
}

export async function deleteItem(req: Request, res: Response, next: NextFunction) {
    let _response: IResponse = { status: false, message: '' };
    try {
        let _id = <string>req.body.item;
        myDatabase('m_item')
            .where('item_id',_id)
            .delete()
            .then((result) => {
                _response.status = true;
                _response.message = "Delete Item Success";
                return res.status(200).json(_response);
            }, (err: any) => {
                _response.status = false;
                _response.message = err.message;
                return res.json(_response);
            });
    } catch (err: any) {
        console.error(`Error while doing deleteItem`, err?.message);
        next(err);
    }
}

