//Authentication with SOAP

var fs = require('fs'),
    settings = JSON.parse(fs.readFileSync('./settings_inwebo.json'));

//Render SOAP page
exports.render = function (req, res) {
    res.render('soap');
};

//Send SOAP request for authentication
exports.sendRequest = function (login, otp, res) {
    var soap = require('soap'),
        url = settings.authenticationWsdlFile,
        args = {userId : login, serviceId : settings.serviceId, token : otp};
    soap.createClient(url, function (err, client) {
        client.setSecurity(new soap.ClientSSLSecurity(settings.keyFile, settings.certFile, {passphrase: settings.certPassphrase, proxy : settings.proxy}));
        client.Authenticate(args, function (err, result) {
            res.render('soap', {result : result.authenticateReturn, login : login, error : err});
        });
    });
};