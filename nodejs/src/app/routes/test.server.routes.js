//Test route

module.exports = function (app) {
	var test = require('../controllers/test.server.controller');

    app.get('/test', test.render);
};