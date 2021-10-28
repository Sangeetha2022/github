import mongoose = require('mongoose');
import { Resourceschema } from './model/resource';
 import { resourcetypes } from './assets/resources';

const resourcemodel = mongoose.model('Resource', Resourceschema);
export class SeedService {
    constructor() { }
    public create(): void {
        resourcetypes.map(something =>{
            console.log('enter into seed resurce name', something);
            // resourcemodel.findOneAndUpdate({resource_name: something['resource_name']},
            // something, {new: true}, (err, data)=>{
            //         if (data === null){
                    let screenroute = new resourcemodel(something);
                    console.log('data a save', screenroute);
                    screenroute.save();
                // }
            })
        // })
    }
   
 }
