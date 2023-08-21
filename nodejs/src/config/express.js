var express = require('express'),
    swig = require('swig'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    favicon = require('serve-favicon');

module.exports = function () {
    var app = express();

    app.use(favicon(__dirname + '/../public/img/favicon.png'));

    //bodyParser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(methodOverride());

    app.engine('server.view.html', swig.renderFile);
    app.set('view engine', 'server.view.html');
    app.set('views', './app/views');
// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
    app.set('view cache', false);
// To disable Swig's cache, do the following:
//swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!
    
    

    
    
//Routes
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/authenticate.server.routes.js')(app);
    require('../app/routes/test.server.routes.js')(app);
    require('../app/routes/sealing.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/groups.server.routes.js')(app);
    app.use(express.static('./public'));
    
    return app;
};