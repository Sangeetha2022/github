
import { githubactionController } from '../controllers/githubactionController';
import { Request, Response } from 'express';

export class Routes {

    public githubactionController: githubactionController = new githubactionController();

    public routes(app): void {

        app.route('/health/aws-deployment').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        // for aws live
        app.route('/generate/aws-deployment/live/githubaction').post(this.githubactionController.generategithubaction);
        // for aws local
        app.route('/generate/aws-deployment/local/githubaction').post(this.githubactionController.generategithubaction_local);

    }
}