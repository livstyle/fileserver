import express, { Express } from 'express';

import { Api } from "./api/api.module";
import { router } from './common/decorators/MRoute';

new Api();

const app: Express = express();

app.use('/', router);

app.listen(3000, () => {
    console.log('Launch Successfully');
});


