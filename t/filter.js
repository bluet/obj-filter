"use strict";

var appRoot = require('app-root-path');
const assert = require('assert');

var filter = require(appRoot + "/index.js");

var template = {
    "runtime": {
        "connectionState": undefined,
        "powerState": function (args) {return "HELLOWORLD " + args},
        "bootTime": "my boot time",
        "paused": false,
        "snapshotInBackground": 1111111,
        "CoffeeTeaOrMe": "Me"
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

var exam_filter  = {
    "runtime": {
        "powerState": "HELLOWORLD poweredOn",
        "bootTime": "2017-04-20T13:56:19.377Z",
        "paused": false,
        "snapshotInBackground": false
    }
};

var exam_merge  = {
    "runtime": {
        "powerState": "HELLOWORLD poweredOn",
        "bootTime": "2017-04-20T13:56:19.377Z",
        "paused": false,
        "snapshotInBackground": false,
        "CoffeeTeaOrMe": "Me"
    }
};

var result_filter = filter(template, data)
assert.deepEqual(result_filter, exam_filter);

console.log('filter:\t	Test OK');

var result_merge = filter.merge(template, data)
assert.deepEqual(result_merge, exam_merge);

console.log('merge:\t	Test OK');

