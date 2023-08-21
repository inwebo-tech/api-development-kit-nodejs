//Test if settings are configured

//Render test page
exports.render = function (req, res) {
    var settings = require('../../settings_inwebo.json');
    res.render('test', {
        serviceId : settings.serviceId,
        certFile : settings.certFile,
        keyFile : settings.keyFile,
        certPassphrase : settings.certPassphrase
    });
};