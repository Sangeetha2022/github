server(model) ::= <<
import * as $model.express$ from 'express';
import * as $model.bodyParser$ from 'body-parser';
import * as $model.orm$ from 'mongoose';
import * as $model.cors$ from 'cors';

const PORT = $model.PORT$;

class App {

    public app: $model.express$.Application = $model.express$();
    public mongoUrl = '$model.DbConnection$';

    constructor() {
        this.config();
        this.mongoSetup();
    }

    private config(): void {
        this.app.use($model.bodyParser$.json());
        this.app.use($model.bodyParser$.urlencoded({ extended: false }));
        this.app.use($model.express$.static('public'));

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