//Functions for groups management

var fs = require('fs'),
    groups = require('../controllers/groups.server.controller'),
    settings = JSON.parse(fs.readFileSync('./settings_inwebo.json'));

//Send soap request to list all groups and render groups homepage
exports.sendGroupsRequest = function (req, res) {
    var soap = require('soap'),
        url = settings.provisioningWsdlFile,
        args = {userid : 0, serviceid: settings.serviceId, offset: 0, nmax: 25};
    soap.createClient(url, function (err, client) {
        client.setSecurity(new soap.ClientSSLSecurity(settings.keyFile, settings.certFile, {passphrase: settings.certPassphrase, proxy : settings.proxy}));
        client.serviceGroupsQuery(args, function (err, result) {
            res.render('groupsHome', {
                result: result.serviceGroupsQueryReturn.err,
                groupsIds: result.serviceGroupsQueryReturn.id,
                groupsNames: result.serviceGroupsQueryReturn.name,
                err : err
            });
        });
    });
};

//Send soap request to list users of specified group and all users
exports.sendGroupUsersRequest = function (groupId, groupName, deletedLogin, deletedRes, deletedErr, addedLogin, addedRes, addedErr, res) {
    var soap = require('soap'),
        url = settings.provisioningWsdlFile,
        args = {userid: 0, groupid : groupId, offset: 0, nmax: 25, sort: 0},
        args2 = {userid : 0, serviceid : settings.serviceId, offset: 0, nmax: 25, sort: 0};
    soap.createClient(url, function (err, client) {
        client.setSecurity(new soap.ClientSSLSecurity(settings.keyFile, settings.certFile, {passphrase: settings.certPassphrase, proxy : settings.proxy}));
        client.loginsQueryByGroup(args, function (err, result) {
            client.loginsQuery(args2, function (err2, result2) {
                groups.renderUsers(result.loginsQueryByGroupReturn, result2.loginsQueryReturn, groupId, groupName, deletedLogin, deletedRes, deletedErr, addedLogin, addedRes, addedErr, err, err2, res);
            });
        });
    });
};

//Render specified group page
exports.renderUsers = function (result, result2, groupId, groupName, deletedLogin, deletedRes, deletedErr, addedLogin, addedRes, addedErr, err, err2, res) {
    res.render('groupUserManagement', {
        result: result.err,
        n: result.n,
        usersIds: result.id,
        usersLogins: result.login,
        usersFirstNames: result.firstname,
        usersLastNames: result.name,
        usersEmail: result.mail,
        groupId: groupId,
        groupName : groupName,
        deletedLogin : deletedLogin,
        deletedRes : deletedRes,
        deletedErr : deletedErr,
        result2: result2.err,
        n2: result2.n,
        usersIds2: result2.id,
        usersLogins2: result2.login,
        addedLogin : addedLogin,
        addedRes : addedRes,
        addedErr : addedErr,
        err : err,
        err2 : err2
    });
};

//Remove user from specified group
exports.removeUserFromGroup = function (groupId, groupName, loginId, login, res) {
    var soap = require('soap'),
        url = settings.provisioningWsdlFile,
        args = {userid : 0, groupid : groupId, loginid: loginId};
    soap.createClient(url, function (err, client) {
        client.setSecurity(new soap.ClientSSLSecurity(settings.keyFile, settings.certFile, {passphrase: settings.certPassphrase, proxy : settings.proxy}));
        client.groupAccountDelete(args, function (err, result) {
            groups.sendGroupUsersRequest(groupId, groupName, login, result.groupAccountDeleteReturn, err, -1, -1, -1, res);
        });
    });
};

//Add user to specified group
exports.addUserToGroup = function (groupId, groupName, loginId, login, res) {
    var soap = require('soap'),
        url = settings.provisioningWsdlFile,
        args = {userid : 0, groupid : groupId, loginid: loginId, role: 0};
    soap.createClient(url, function (err, client) {
        client.setSecurity(new soap.ClientSSLSecurity(settings.keyFile, settings.certFile, {passphrase: settings.certPassphrase, proxy : settings.proxy}));
        client.groupAccountCreate(args, function (err, result) {
            groups.sendGroupUsersRequest(groupId, groupName, -1, -1, -1, login, result.groupAccountCreateReturn, err, res);
        });
    });
};