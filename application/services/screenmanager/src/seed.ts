import * as mongoose from 'mongoose';
import { DefaultScreen } from './models/Defaultscreen';
import {SefScreen} from './models/SefScreen'
import { default_screen } from './assets/Defaultscreen';
import {SEFSCREEN} from './assets/SefScreen'

const defaultscreen = mongoose.model('Default_screen', DefaultScreen);
const sefscreen = mongoose.model('Sef_screen', SefScreen);

export class Feedseeddata {

    public defaultScreen(): void {
        defaultscreen.findOneAndUpdate({ screenName: default_screen['screenName'] },
            default_screen, { new: true }, (err, data) => {
                if (data === null) {
                    let screen = new defaultscreen(default_screen);
                    screen.save();
                }
            }
        )
    }

    public sefScreen(): void {
        sefscreen.findOneAndUpdate({ screenName: SEFSCREEN['screenName'] },
        SEFSCREEN, { new: true }, (err, data) => {
                if (data === null) {
                    let sefScreen = new sefscreen(SEFSCREEN);
                    sefScreen.save();
                }
            }
        )
    }
}