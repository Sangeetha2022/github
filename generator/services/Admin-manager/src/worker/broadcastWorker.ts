import { Response } from 'express';
import { Broadcastsupportworker } from '../SupportWorker/broadcastSupportWorker';
import * as fs from 'fs';
import * as path from 'path';

let broadcastsupport = new Broadcastsupportworker();
export class Broadcastworker {

    public brodcastworker(templatelocation, generationpath, callback) {
        let templatepath = templatelocation;
        console.log('-----template---path---', templatepath);
        broadcastsupport.broadcastservice(templatepath, generationpath, (data) => {
            callback(data);
        })
    }
}