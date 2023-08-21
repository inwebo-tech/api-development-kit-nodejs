//Users management routes

module.exports = function (app) {
	var users = require('../controllers/users.server.controller');

    app.route('/users')
        .get(users.render);

    app.route('/usersCreate')
        .get(users.create)
        .post(function (req, res) {users.sendCreateRequest(req.body.login, req.body.firstName, req.body.lastName, req.body.emailAdress, req.body.activationCode, res); });

    app.route('/usersSearch')
        .post(function (req, res) {users.sendSearchRequest(req.body.login, res); });

    app.route('/usersDelete')
        .post(function (req, res) {users.sendDeleteRequest(req.body.loginId, req.body.login, res); });

    app.route('/usersEdit')
        .get(function (req, res) {users.edit(req.query.loginId, req.query.login, req.query.firstname, req.query.lastname, req.query.email, res); })
        .post(function (req, res) {users.sendEditRequest(req.body.loginId, req.body.login, req.body.firstname, req.body.lastname, req.body.email, res); });
};