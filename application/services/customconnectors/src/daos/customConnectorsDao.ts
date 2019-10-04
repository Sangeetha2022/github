import * as mongoose from 'mongoose';
import { EntitySchema } from '../models/customConnector';
import * as request from 'request';
import { response } from 'express';
import { json } from 'body-parser';

const request = require('request');

export class CustomConnectorsDao {



  public quickTestcustomConnectors(data, callback: CallableFunction) {

    const quickTestData = {
      name: data.name,
      description: data.description,
      endPointUrl: data.endPointUrl,
      apiMethods: data.apiMethods,
      pathVariable: data.pathVariable,
      queryParams: data.queryParams,
      properties: data.properties
    }

    const tempArry = [];
    quickTestData.properties.map(({ key, value }) => {
      const queryKeyValue = `${key}=${value}`;
      tempArry.push(queryKeyValue);
    });
    const convertStr = tempArry.toString();
    const keyAndValue = convertStr.replace(/,/g, '&')
    const URL = `${quickTestData.endPointUrl}?${data.api_key.key}=${data.api_key.value}&${keyAndValue}&file_type=json`
    console.log('keyy--valuse-->>', URL);
    request.get(`${URL}`, async (response, err, body) => {
      console.log('bodyyy--->>', body);
      callback(body);
    })

  }

}













