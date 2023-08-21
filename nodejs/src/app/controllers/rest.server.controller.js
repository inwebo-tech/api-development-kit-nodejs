//Authentication with REST

var fs = require('fs'),
    settings = JSON.parse(fs.readFileSync('./settings_inwebo.json'));


exports.render = function (req, res) {
    res.render('rest');
};

//Send REST request for authentication
exports.sendRequest = function (login, otp, res) {
    var request = require('request');

    request({url : 'https://api.myinwebo.com'+'/FS?action=authenticateExtended' + '&serviceId=' + settings.serviceId + '&userId=' + login + '&token=' + otp + '&format=json', cert: fs.readFileSync(settings.certFile, 'utf8'), key: fs.readFileSync(settings.keyFile, 'utf8'), passphrase: settings.certPassphrase, proxy : settings.proxy}, function (error, response, body) {
        if (error) {
            console.log("Got error: " + error.message);
        }else if (!(response.statusCode === 200)){
            res.render('rest', {statusCode : response.statusCode});
        } else {
            var body = JSON.parse(body);
            res.render('rest', {result : body.err, login : login});
        }
});
};