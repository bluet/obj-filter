"use strict";

var appRoot = require('app-root-path');
const assert = require('assert');

var objectFilter = require(appRoot + "/index.js");

var test_template = {
    "runtime": {
        "connectionState": "connected",
        "powerState": function () {return "HELLOWORLD"},
        "bootTime": "my boot time",
        "paused": false,
        "snapshotInBackground": 1111111
    }
};

var test_data = {
    "vm": {
        "value": "vm-999",
        "type": "VirtualMachine"
    },
    "runtime": {
        "device": [
            {
                "key": 9999
            }
        ],
        "connectionState": "connected",
        "powerState": "poweredOn",
        "bootTime": "2017-04-20T13:56:19.377Z",
        "paused": false,
        "snapshotInBackground": false
    }
};

var exam_data  = {
    "runtime": {
        "connectionState": "connected",
        "powerState": "HELLOWORLD",
        "bootTime": "2017-04-20T13:56:19.377Z",
        "paused": false,
        "snapshotInBackground": false
    }
};


var result_data = objectFilter(test_template, test_data)
assert.deepEqual(result_data, exam_data);

console.log('Test OK');

return 1;
