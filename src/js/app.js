var path = require('path'),
    fs = require('fs'),
    jf = require('jsonfile'),
    gui = require('nw.gui'),
    win = gui.Window.get();

// Namespace
var eHIS = window.eHIS || {};
// eHIS version
eHIS.version = '1.0.0';
eHIS.saltKey = "Fi'rpk[k],sklki8k,";
// Application data path
eHIS.appPath = gui.App.dataPath;
// Set space for json file
jf.spaces = 2;
eHIS.configFile = path.join(eHIS.appPath, 'config.json');

// Check configuration file exist
var isExist = fs.existsSync(eHIS.configFile);
if (!isExist) {
    var config = {
        db: {
            host: '127.0.0.1',
            port: 3306,
            database: 'eHIS',
            user: 'root',
            password: ''
        },
        dc: {
            url: 'http://his.mkh.go.th:3000',
            private_key: '123456'
        }
    };
    // create configure file
    jf.writeFileSync(eHIS.configFile, config);
}

// clear null value
eHIS.clearNull = function (str) {
  return !str ? '-' : str;
};

// Get url parameters
eHIS.getUrlParam = function (param) {
    var pageUrl = window.location.search.substring(1),
        urlVal = pageUrl.split('&');

    for (var i = 0; i < urlVal.length; i++) {
        var sParamName = urlVal[i].split('=');
        if (sParamName[0] == param) return sParamName[1];
    }
};

// Exit program
eHIS.doExit = function () {
    gui.App.quit();
};

// show window when ready
onload = function() {
    win.show();
};

process.on('uncaughtException', function (e) {
    console.log(e);
});