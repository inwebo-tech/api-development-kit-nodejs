//Data sealing verification

var fs = require('fs'),
    settings = JSON.parse(fs.readFileSync('./settings_inwebo.json'));

exports.render = function (req, res) {
    res.render('sealing');
};

//Send data sealing verification request with REST
exports.sendRequest = function (login, otp, data, res) {
    var request = require('request');

    request({url : 'https://api.myinwebo.com'+'/FS?action=sealVerify' + '&serviceId=' + settings.serviceId + '&userId=' + login + '&token=' + otp + '&data=' + data + '&format=json', cert: fs.readFileSync(settings.certFile, 'utf8'), key: fs.readFileSync(settings.keyFile, 'utf8'), passphrase: settings.certPassphrase, proxy : settings.proxy}, function (error, response, body) {
        if (error) {
            console.log("Got error: " + error.message);
        } else if (!(response.statusCode === 200)){
            res.render('sealing', {statusCode : response.statusCode});
        } else {
            var body = JSON.parse(body);
            res.render('sealing', {result : body.err, login : login});
        }
});
};