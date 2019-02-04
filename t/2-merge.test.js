"use strict";
var test = require("tape"); // assign the tape library to the variable "test"
var appRoot = require("app-root-path");
var filter = require(appRoot + "/index.js");

var template = {
	"runtime": {
		"connectionState": undefined,
		"powerState": function (args) {return "HELLO WORLD " + args;},
		"bootTime": ["my boot time"],
		"paused": false,
		"snapshotInBackground": 1111111,
		"CoffeeTeaOrMe": "Me",
		"obj jj": { "kk": "yy" }
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
		"bootTime": undefined,
		"paused": false,
		"snapshotInBackground": false
	}
};


var exam_merge  = {
	"runtime": {
		"powerState": "HELLO WORLD poweredOn",
		"bootTime": ["my boot time"],
		"paused": false,
		"snapshotInBackground": false,
		"CoffeeTeaOrMe": "Me",
		"obj jj": { "kk": "yy" }
	}
};

test("filter.merge with undefined template should fail", function (t) {
	var result_fail = filter.merge(undefined, data);
	t.false(result_fail);
	t.end();
});

test("filter.merge should contain: runtime, powerState, bootTime, paused, snapshotInBackground, CoffeeTeaOrMe", function (t) {
	var result_merge = filter.merge(template, data);
	t.deepEqual(result_merge, exam_merge);
	t.end();
});
