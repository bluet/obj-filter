"use strict";
var test = require('tape'); // assign the tape library to the variable "test"
var appRoot = require('app-root-path');
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


test('filter should contain: runtime, powerState, bootTime, paused, snapshotInBackground', function (t) {
	var result_filter = filter(template, data);
	t.deepEqual(result_filter, exam_filter);
	t.end();
});

test('filter.merge should contain: runtime, powerState, bootTime, paused, snapshotInBackground, CoffeeTeaOrMe', function (t) {
	var result_merge = filter.merge(template, data);
	t.deepEqual(result_merge, exam_merge);
	t.end();
});
