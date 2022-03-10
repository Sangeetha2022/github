import * as mongoose from 'mongoose';
import gfcModel from '../models/gfc';
import { gfcSchema } from '../models/gfc';
import * as fs from 'fs';
import * as path from 'path';
import { CustomLogger } from '../config/Logger';

// Connect to db
const mongoUrl: string = process.env.mongoUrl;
// const mongoUrl: string = 'mongodb://admin:password@127.0.0.1:27017/GeppettoStage?authSource=admin';
const db = mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(res => { console.log('mongodb connected') });
const featuresconfig = mongoose.model('shareable_features', gfcSchema);

let gfc = gfcModel;

  // // Add Shared_Feature
  // const  addSharedFeature = (sharedfeature) => {
  //   gfc.create(sharedfeature).then(sharedfeature => {
  //     console.info('New SharedFeature Added');
  //     mongoose.connection.close();
  //   });
  // }

  // initialize all Shared_Feature
  export const initializeAllSharedFeature = async(sharedfeature, callback) => {
    if(sharedfeature === 'all'){
      let appPath = path.resolve(__dirname, '../../../geppetto/template/seed/sharedfeatures/');
      let datas = await fs.readdirSync(appPath).forEach(async file => {
        let folder = path.resolve(__dirname, `${appPath}/${file}/gepfeatureconfig.json`);
        new CustomLogger().showLogger('info', `feature an adding into DB in ${file}`);
        await fs.readFile(folder, 'utf-8', (err, data) => { 
          let featuresData = JSON.parse(data);
          featuresconfig.findOneAndUpdate({ feature_name: featuresData['feature_name'] },
              featuresData, { new: true }, (err, data) => {
                  if(data === null){
                    new CustomLogger().showLogger('info', `New feature add ${featuresData['feature_name']}`)
                    let featuresSave = new featuresconfig(featuresData);
                    featuresSave.save();
                  }
              });
          });
      });
      callback(datas);
    }
  }

  // initialize Specific Shared_Feature
  export const initializeSharedFeature = (sharedfeature) => {
    let appPath = path.resolve(__dirname, '../../../geppetto/template/seed/sharedfeatures/');
    let folder = path.resolve(__dirname, `${appPath}/${sharedfeature}/gepfeatureconfig.json`);
    new CustomLogger().showLogger('info', `feature an adding into DB in ${sharedfeature}`);
    fs.readFile(folder, 'utf-8',(err, data) => { 
      let featuresData = JSON.parse(data);
      gfc.findOneAndUpdate({ feature_name: featuresData['feature_name'] },
          featuresData, { new: true }, (err, data) => {
              if(data === null){
                new CustomLogger().showLogger('info', `New feature add ${featuresData['feature_name']}`)
                let featuresSave = new gfc(featuresData);
                featuresSave.save();
              }
          });
    });
  }
  
  // Find Shared_Feature
  export const findSharedFeature = (name) => {
    // Make case insensitive
    const search = new RegExp(name, 'i');
    gfc.find({$or: [{feature_name: search}]})
      .then(feature => {
        console.info(feature);
        console.info(`${feature.length} matches`);
        mongoose.connection.close();
      });
  }
  
  // Update Shared_Feature
  export const updateSharedFeature = (_id, feature) => {
    console.log('answer', feature);
    gfc.updateOne({ _id }, feature)
      .then(feature => {
        console.info('Shared_Feature Updated');
        mongoose.connection.close();
      });
  }
  
  // Remove SharedFeature
  export const removeSharedFeature = (name) => {
    console.log('name', name);
    gfc.deleteOne({ feature_name: name })
      .then(sharedfeature => {
        console.info('SharedFeature Removed');
        mongoose.connection.close();
      });
  }
  
  // List SharedFeatures
  export const listSharedFeatures = () => {
    gfc.find()
      .then(sharedfeatures => {
        console.info(sharedfeatures);
        console.info(`${sharedfeatures.length} sharedfeatures`);
        mongoose.connection.close();
      });
  }

  // initilialize data to close
  function connectionClose(result){
    if(result === true){
      console.log('finished');
    }
  }
  




