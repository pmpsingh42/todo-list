'use strict';

const path            = require('path'),
    fs              = require('fs'),
    expressJWT      = require('express-jwt'),
    env             = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    api_path        = env.API.site,
    admin_api_path  = env.API.admin;

class AppRouter {
    constructor(app, router){
        this.call = {
            frontend : {}
        };
        this.frontend = {};
        this.backend = {};

        /**/
        this.api_path = api_path;
        this.admin_api_path = admin_api_path;

        /**/
        this.app = app;
        this.router = router;
    }

    loadAppClasses(){
        fs.readdirSync(path.resolve('./app/controllers/frontend')).forEach(file => {
            let name = file.substr(0, file.indexOf('.'));
            /*Store Classes in frontend object*/
            this.frontend[name] = require(path.resolve(`./app/controllers/frontend/${name}`));
            /*Init All Classes & add Object to Array*/
            this.call['frontend'][name] = new this.frontend[name]();
        });
    }

    unlessRoutes(){
        this.router.use(expressJWT({
            secret: new Buffer(env.secret).toString('base64'),
        }).unless({
            path: [
                this.api_path+'save',
                this.api_path+'get-all-user',
                this.api_path+'get-one',
                this.api_path+'delete',
                this.api_path + 'update-user'
            ]
        }));
    }

    loadAppRoutes(){
        this.router.post('/save', this.call['frontend']['UserController'].save);
        this.router.get('/get-all-user', this.call['frontend']['UserController'].getUser);
        this.router.get('/get-one', this.call['frontend']['UserController'].getOne);
        this.router.post('/delete', this.call['frontend']['UserController'].delete);
        this.router.put('/update-user', this.call['frontend']['UserController'].updateUser);

    }

    init(){
        this.loadAppClasses();
        this.unlessRoutes();
        this.loadAppRoutes();

        return this.router;
    }
}

module.exports = AppRouter;