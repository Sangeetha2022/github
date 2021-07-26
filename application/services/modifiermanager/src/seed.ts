import * as modifierJSON from './assests/modifier.json';
import modifierModel from './models/DefaultModifier';


export class seedData {

    private modifierModel = modifierModel;

    public modifiers() {

        modifierJSON.modifier.map(modifierElement => {
            this.modifierModel.findOneAndUpdate({ _id: modifierElement['_id'] }, modifierElement, { new: true }, (err, data) => {
                if (data === null) {
                    let modifier = new this.modifierModel(modifierElement);
                    modifier.save();
                }
            });
        });

    }


}