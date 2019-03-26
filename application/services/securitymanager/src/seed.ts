import mongoose = require('mongoose');
import { Roleschema } from '../src/models/Role';
import { roletypes } from '../src/assets/role';

const roletypemodel = mongoose.model('Role', Roleschema);

export class RoleSeedData {

    constructor() { }

    public Createrole(): void {
        roletypes.map(roles => {
            roletypemodel.findOneAndUpdate({ role: roles['role'] },
                roles, { new: true }, (err, data) => {
                    if (data === null) {
                        let roletype = new roletypemodel(roles);
                        roletype.save();
                    }
                });
        });
    }
}