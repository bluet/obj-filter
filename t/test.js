"use strict";

var appRoot = require('app-root-path');
const assert = require('assert');

var objFilter = require(appRoot + "/index.js");

var template = {
    "runtime": {
        "connectionState": undefined,
        "powerState": function (args) {return "HELLOWORLD " + args},
        "bootTime": "my boot time",
        "paused": false,
        "snapshotInBackground": 1111111
    }
};

var data = {
    "vm": {
        "type": "VirtualMachine"
    },
    "runtime": {
        "device": 9999,
        "connectionState": "connected",
        "powerState": "poweredOn",
        "bootTime": "2017-04-20T13:56:19.377Z",
        "paused": false,
        "snapshotInBackground": false
    }
};

var exam  = {
    "runtime": {
        "powerState": "HELLOWORLD poweredOn",
        "bootTime": "2017-04-20T13:56:19.377Z",
        "paused": false,
        "snapshotInBackground": false
    }
};


var result = objFilter(template, data)
assert.deepEqual(result, exam);

console.log('Test OK');

return 1;
