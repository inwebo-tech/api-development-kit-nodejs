//Sealing routes

module.exports = function (app) {
	var sealing = require('../controllers/sealing.server.controller');

    app.route('/sealing')
        .get(sealing.render)
        .post(function (req, res) {sealing.sendRequest(req.body.login, req.body.otp, req.body.data, res); });
};