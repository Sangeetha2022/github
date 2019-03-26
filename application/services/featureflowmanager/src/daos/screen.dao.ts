import { Request } from 'express';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import ScreenModel from '../models/screen/screen.model';
import ScreenDto from '../models/screen/screen.dto';
import IScreen from '../models/screen/screen.interface';

export class ScreenDao {

    private screen = ScreenModel;

    saveScreen = async (screen, callback: CallableFunction) => {
        const screenDto: ScreenDto = screen;
        const createdScreen = new this.screen({
            ...screenDto
        });
        const savedScreen = await createdScreen.save();
        callback(savedScreen);
    }

    getAllScreen = async (req: Request, callback: CallableFunction) => {
        const posts = await this.screen.find();
        callback(posts);
    }

    getScreenByID = async (req: Request, next, callback: CallableFunction) => {
        const id = req.params.id;
        const screen = await this.screen.findById(id);
        if (screen) {
            callback(screen);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    getScreenByFeatureName = async (req: Request, next, callback: CallableFunction) => {
        const name = req.query.name;
        console.log("i am the params", name)
        const screen = await this.screen.findOne(name);
        if (screen) {
            callback(screen);
        } else {
            next(new PostNotFoundException(name));
        }
    }



    deleteScreen = async (screenID, next, callback: CallableFunction) => {
        const id = screenID;
        const successResponse = await this.screen.findByIdAndDelete(id);
        if (successResponse) {
            callback(200);
        } else {
            next(new PostNotFoundException(id));
        }
    }

    updateScreen = async (req, next, callback: CallableFunction) => {
        const id = req.params.id;
        const postData: IScreen = req.body;
        postData.updated_date = new Date();
        const post = await this.screen.findByIdAndUpdate(id, postData, { new: true });
        if (post) {
            callback(post);
        } else {
            next(new PostNotFoundException(id));
        }
    }

}