import Fred from 'node-fred'
import * as mongoose from 'mongoose';
import { EntitySchema } from '../models/Fred';
import * as request from 'request';
import { response } from 'express';
import { json } from 'body-parser';

const request = require('request');
const entityModel = mongoose.model('Entity', EntitySchema);

export class FredDao {

  public entityModelData: any = {
    name: 'fredentity',
    description: 'fred',
    entity_type: 'text',
    project_id: '',
    feature_id: '',
    is_default: false,
    field: []
  }
  public getFred(data, callback) {
    console.log('i am data--da0000->>>', data);
    this.entityModelData.project_id = data.projectId;
    this.entityModelData.feature_id = data.featureId;

    console.log('url----->>>', `${data.endPointUrl}?${data.params}&api_key=${data.api_key}&file_type=json`)

    request.get(`${data.endPointUrl}?${data.params}&api_key=${data.api_key}&file_type=json`, async (response, err, body) => {
      let fredData = JSON.parse(body).categories;
      let allEntity = await this.getAllDetails(fredData);
      callback(allEntity);
    })

  }

  public async getAllDetails(data) {
    console.log(' ', data)
    return new Promise((resolve) => {
      data.forEach(e => {
        Object.keys(e).forEach(key => {
          const tempData = {
            name: '',
            type_name: 'text  ',
            data_type: '',
            description: '',
            is_default: false,
            is_entity_type: false,
            is_list_type: false,
            list_type: '',
            list_value: '',
            entity_id: '',
          }
          tempData.name = key;
          tempData.data_type = typeof (e[key]);
          this.entityModelData.field.push(tempData)
        })
        let entity = new entityModel(this.entityModelData);
        console.log('i am entity--->>>', this.entityModelData)
        entity.save().then(result => {
          resolve(result)
        }).catch(err => {
          resolve(err);
        })
      })
    });
  }

  public quickTest(data, callback: CallableFunction) {
    console.log('data 0---->>', data.api_key.key);
    console.log('data 0---->>', data.api_key.value);

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
    console.log('keyy--valuse-->>',URL );
    request.get(`${URL}`, async (response, err, body) => {
      console.log('bodyyy--->>', body);
      callback(body);
    })

  }

}













//   public entityModelData: any = {
//     name: 'fredentity',
//     description: 'fred',
//     entity_type: 'text',
//     flow_id: '',
//     connectors: '',
//     project_id: '',
//     feature_id: '',
//     is_default: false,
//     field: []
//   }
//   public ObjectKey: any = [];
//   public dataTypeArray: any = [];
//   public getFred(id, callback) {




//     // this.entityModelData.project_id = id.projectId;
//     // this.entityModelData.feature_id = id.featureId;
//     // this.entityModelData.flow_id = id.flowId;
//     // this.entityModelData.connectors = id.connectors;
//     // this.getCategory(123, callback)
//   }
//   public getCategory(categoryId: number, callback) {
//     fred.categories.getCategory(categoryId).then(async (result: any) => {
//       let allEntity = await this.getAllDetails(result.categories);
//       callback(allEntity);
//     });
//   }
//   public async getAllDetails(data) {
//     console.log(' ', data)
//     return new Promise((resolve) => {
//       data.forEach(e => {
//         Object.keys(e).forEach(key => {
//           const tempData = {
//             name: '',
//             type_name: 'text  ',
//             data_type: '',
//             description: '',
//             is_default: false,
//             is_entity_type: false,
//             is_list_type: false,
//             list_type: '',
//             list_value: '',
//             entity_id: '',
//           }
//           tempData.name = key;
//           tempData.data_type = typeof (e[key]);
//           this.entityModelData.field.push(tempData)
//         })
//         let entity = new entityModel(this.entityModelData);
//         console.log('i am entity--->>>', this.entityModelData)
//         entity.save().then(result => {
//           resolve(result)
//         }).catch(err => {
//           resolve(err);
//         })
//       })
//     });
//   }
// }




//new--->>>
// Object.keys(e).forEach((keyData)=>{
//   console.log('keydata---->>', keyData)
//   const tempData = {
//           name: '',
//           type_name: 'text  ',
//           data_type: '',
//           description: '',
//           is_default: false,
//           is_entity_type: false,
//           is_list_type: false,
//           list_type: '',
//           list_value: '',
//           entity_id: '',
//         }
//         tempData.name = keyData;
//         Object.values(e).forEach(allValuse=>{
//           console.log('all--valuse--->>', allValuse);
//           tempData.type_name = typeof(allValuse)
//         })
//         this.entityModelData.field.push(tempData);
// })------------

// data.forEach(e => {
//   this.ObjectKey = Object.keys(e);
//   dataType.push(e);
//   dataType.map(element => {
//     let temObjcet = {
//       data_type: ''
//     }
//     temObjcet.data_type = typeof(element.id);
//     this.dataTypeArray.push(temObjcet.data_type);
//     temObjcet.data_type = typeof (element.name);
//     this.dataTypeArray.push(temObjcet.data_type);
//     temObjcet.data_type = typeof (element.parent_id);
//     this.dataTypeArray.push(temObjcet.data_type);
//   })
//   this.dataTypeArray.forEach(async dataType => {
//     const tempData = {
//       name: '',
//       type_name: 'text  ',
//       data_type: '',
//       description: '',
//       is_default: false,
//       is_entity_type: false,
//       is_list_type: false,
//       list_type: '',
//       list_value: '',
//       entity_id: '',
//     }
//     tempData.data_type = dataType;
//     this.entityModelData.field.push(tempData);
//   });
//   this.ObjectKey.forEach(each => {
//     const tempData = {
//       name: '',
//       type_name: 'text  ',
//       data_type: '',
//       description: '',
//       is_default: false,
//       is_entity_type: false,
//       is_list_type: false,
//       list_type: '',
//       list_value: '',
//       entity_id: '',
//     }
//     this.entityModelData.field[0].name = each;
    // tempData.name = each;
    // this.entityModelData.field.push(tempData);
  // })
  // console.log('i am all object--->>>',this.entityModelData);
// });

//old------->>
// let dataType = []
// this.dataTypeArray = [];
// data.forEach(e => {
//   this.ObjectKey = Object.keys(e);
//   dataType.push(e);
//   dataType.map(element => {
//     let temObjcet = {
//       data_type: ''
//     }
//     temObjcet.data_type = typeof (element.id);
//     this.dataTypeArray.push(temObjcet.data_type);
//     temObjcet.data_type = typeof (element.name);
//     this.dataTypeArray.push(temObjcet.data_type);
//     temObjcet.data_type = typeof (element.parent_id);
//     this.dataTypeArray.push(temObjcet.data_type);
//   })
//   this.dataTypeArray.forEach(async dataType => {
//     this.entityObject[0].data_type = dataType;
//   })
// });
// this.ObjectKey.forEach(async each => {
//   this.entityObject[0].name = each;
//   let entity = new entityModel(this.entityObject);
//   entity.save().then(result => {
//     callback(result);
//   }).catch(err => {
//     console.log('i am the errror---->>s')
//   })
// })
