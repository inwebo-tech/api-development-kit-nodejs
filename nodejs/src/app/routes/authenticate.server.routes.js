//Authentication routes

module.exports = function (app) {
    var push = require('../controllers/push.server.controller'),
        rest = require('../controllers/rest.server.controller'),
        soap = require('../controllers/soap.server.controller');

    app.route('/push')
        .get(push.render)
        .post(function (req, res) {push.sendRequest(req.body.login, res); });

    app.route('/rest')
        .get(rest.render)
        .post(function (req, res) {rest.sendRequest(req.body.login, req.body.otp, res); });

    app.route('/soap')
        .get(soap.render)
        .post(function (req, res) {soap.sendRequest(req.body.login, req.body.otp, res); });
};