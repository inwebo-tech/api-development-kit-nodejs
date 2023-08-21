//Authentication with Push notification on mobile

var fs = require('fs'),
    settings = JSON.parse(fs.readFileSync('./settings_inwebo.json'));

exports.render = function (req, res) {
    res.render('push');
};

//Send push request and check push result
exports.sendRequest = function (login, res) {
    
    var request = require('request');
        sendPush = function (callback) {
            
            request({url : 'https://api.myinwebo.com'+'/FS?action=pushAuthenticate' + '&serviceId=' + settings.serviceId + '&userId=' + login + '&format=json', cert: fs.readFileSync(settings.certFile, 'utf8'), key: fs.readFileSync(settings.keyFile, 'utf8'), passphrase: settings.certPassphrase, proxy : settings.proxy}, function (error, response, body) {
                
        if (error) {
            console.log("Got error: " + error.message);
        }else if (!(response.statusCode === 200)){
            res.render('push', {statusCode : response.statusCode, login : login});
        } else {
            var body = JSON.parse(body);
            setTimeout(callback, 500, body.sessionId);
        }
            });
        },
        checkPushResult = function (sessionId) {
            request({url : 'https://api.myinwebo.com'+'/FS?action=checkPushResult' + '&serviceId=' + settings.serviceId + '&sessionId=' + sessionId + '&userId=' + login + '&format=json', cert: fs.readFileSync(settings.certFile, 'utf8'), key: fs.readFileSync(settings.keyFile, 'utf8'), passphrase: settings.certPassphrase, proxy : settings.proxy}, function (error, response, body) {
        if (error) {
            console.log("Got error: " + error.message);
        }else if (!(response.statusCode === 200)){
            res.render('push', {statusCode : response.statusCode, login : login});
        } else {
            var body = JSON.parse(body),
                success=false;
            if (body.err === 'NOK:WAITING') {
                                setTimeout(checkPushResult, 50, sessionId);
            } else {res.render('push', {login : login, err: body.err}); }
        }
            });
        };
    sendPush(checkPushResult);
};