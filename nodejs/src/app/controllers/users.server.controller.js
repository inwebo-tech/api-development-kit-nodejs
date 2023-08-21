//User Management

var fs = require('fs');
var settings = JSON.parse(fs.readFileSync('./settings_inwebo.json'));

//Render user management homepage
exports.render = function (req, res) {
    res.render('usersHome');
};

//Render page to create a new user
exports.create = function (req, res) {
    res.render('usersCreate');
};

//Send create request
exports.sendCreateRequest = function (login, firstName, lastName, emailAdress, activationCode, res) {
    var soap = require('soap'),
        url = settings.provisioningWsdlFile,
        args = {userId : 0, serviceId: settings.serviceId, login: login, firstname : firstName, name: lastName, mail : emailAdress, phone : '', status: 0, role: 0, access: 1, codetype: activationCode, lang: 'en', extrafields : {}};
    soap.createClient(url, function (err, client) {
        client.setSecurity(new soap.ClientSSLSecurity(settings.keyFile, settings.certFile, {passphrase: settings.certPassphrase, proxy : settings.proxy}));
        client.loginCreate(args, function (err, result) {
            client.loginGetCodeFromLink({code : result.loginCreateReturn.code}, function (err2, result2) {
                client.loginGetInfoFromLink({code : result.loginCreateReturn.code}, function (err3, result3) {
                    res.render('usersCreate', {result : result.loginCreateReturn.err, code: result.loginCreateReturn.code, id : result.loginCreateReturn.id, login : login, codetype: activationCode, loginGetCodeFromLinkReturn : result2.loginGetCodeFromLinkReturn, loginGetInfoFromLinkReturn: result3.loginGetInfoFromLinkReturn, err2 : err2, err3 : err3});
                });
            });
        });
    });
};

//Send login search request
exports.sendSearchRequest = function (login, res) {
    var soap = require('soap'),
        url = settings.provisioningWsdlFile,
        args = {userId : 0, serviceId: settings.serviceId, login: login, exactmatch : 0, offset : 0, nmax : 100, sort : 0};
    soap.createClient(url, function (err, client) {
        client.setSecurity(new soap.ClientSSLSecurity(settings.keyFile, settings.certFile, {passphrase: settings.certPassphrase, proxy : settings.proxy}));
        client.loginSearch(args, function (err, result) {
            res.render('usersHome', {searchResulterr : result.loginSearchReturn.err, searchResultLogins : result.loginSearchReturn.login, searchResultLoginIds: result.loginSearchReturn.id, searchResultFirstNames: result.loginSearchReturn.firstname, searchResultLastNames: result.loginSearchReturn.name, searchResultEmails: result.loginSearchReturn.mail, err : err });
        });
    });
};

//Send delete user request
exports.sendDeleteRequest = function (loginId, login, res) {
    var soap = require('soap'),
        url = settings.provisioningWsdlFile,
        args = {userid : 0, serviceid: settings.serviceId, loginid: loginId};
    soap.createClient(url, function (err, client) {
        client.setSecurity(new soap.ClientSSLSecurity(settings.keyFile, settings.certFile, {passphrase: settings.certPassphrase, proxy : settings.proxy}));
        client.loginDelete(args, function (err, result) {
            res.render('usersHome', {result : result.loginDeleteReturn, deletedLogin : login, deleteErr : err});
        });
    });
};

//Render edit user page
exports.edit = function (loginId, login, firstname, lastname, email, res) {
    res.render('usersEdit', {
        loginId : loginId,
        login : login,
        firstname : firstname,
        lastname : lastname,
        email : email
    });
};

//Send edit user request
exports.sendEditRequest = function (loginId, login, firstname, lastname, email, res) {
    var soap = require('soap'),
        url = settings.provisioningWsdlFile,
        args = {userid : 0, serviceid: settings.serviceId, loginid: loginId, login: login, firstname: firstname, name: lastname, mail: email, phone : '', status : 0, role : 0, extrafields : {}};
    soap.createClient(url, function (err, client) {
        client.setSecurity(new soap.ClientSSLSecurity(settings.keyFile, settings.certFile, {passphrase: settings.certPassphrase, proxy : settings.proxy}));
        client.loginUpdate(args, function (err, result) {
            res.render('usersEdit', {result : result.loginUpdateReturn, loginId : loginId, login : login, firstname : firstname, lastname : lastname, email : email, editErr : err});
        });
    });
};