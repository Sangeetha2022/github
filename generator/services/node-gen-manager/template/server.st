server(model) ::= <<
import * as $model.framework$ from '$model.framework$';
import * as $model.bodyParser$ from 'body-parser';
import * as $model.orm$ from 'mongoose';
import * as $model.cors$ from 'cors';

const PORT = $model.PORT$;

class App {

    public app: $model.framework$.Application = $model.framework$();
    public mongoUrl = '$model.DbConnection$';

    constructor() {
        this.config();
        this.mongoSetup();
    }

    private config(): void {
        this.app.use($model.bodyParser$.json());
        this.app.use($model.bodyParser$.urlencoded({ extended: false }));
        this.app.use($model.framework$.static('public'));

        // Enable CORS
        this.app.use($model.cors$({ credentials: true, origin: true }))
    }
    private mongoSetup(): void {
        $model.orm$.Promise = global.Promise;
        $model.orm$.connect(this.mongoUrl, { useNewUrlParser: true });
    }

}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port  ' + PORT);
})



>>