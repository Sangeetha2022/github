import * as mongoose from 'mongoose';
import { DefaultScreen } from './models/Defaultscreen';
import { default_screen } from './assets/Defaultscreen';

const defaultscreen = mongoose.model('Default_screen', DefaultScreen);

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
}