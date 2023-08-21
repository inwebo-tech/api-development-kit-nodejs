//Groups management routes

module.exports = function (app) {
	var groups = require('../controllers/groups.server.controller');

    app.route('/groups')
        .get(groups.sendGroupsRequest);

    app.route('/groupUserManagement')
        .get(function (req, res) {groups.sendGroupUsersRequest(req.query.groupId, req.query.groupName, -1, -1, -1, -1, -1, -1, res); });

    app.route('/removeUserFromGroup')
        .get(function (req, res) {groups.removeUserFromGroup(req.query.groupId, req.query.groupName, req.query.loginId, req.query.login, res); });

    app.route('/addUserToGroup')
        .get(function (req, res) {groups.addUserToGroup(req.query.groupId, req.query.groupName, req.query.loginId, req.query.login, res); });
};