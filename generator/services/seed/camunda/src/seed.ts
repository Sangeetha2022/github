import mongoose = require('mongoose');
import { Resourceschema } from './model/resource';
import { resourcetypes } from './assets/Screen';

const resourcemodel = mongoose.model('Resource', Resourceschema);

export class ResourceSeedData {

    constructor() { }

    public Createresource(): void {
        resourcetypes.map(something =>{
            resourcemodel.findOneAndUpdate({resources: something['resources']},
            something, {new: true}, (err, data)=>{
                if (data === null){
                    let screenroute = new resourcemodel(something);
                    screenroute.save();
                }
            })
        })
    }
}