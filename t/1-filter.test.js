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
	},
	"running": Boolean
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

var exam_filter  = {
	"runtime": {
		"powerState": "HELLO WORLD poweredOn",
		"paused": false,
		"snapshotInBackground": false
	}
};


test("filter with undefined template should fail", function (t) {
	t.false(filter(undefined, data), "empty template results empty result");
	t.end();
});

test("filter with String Type template", function (t) {
	t.equal("data", filter(String, "data"), "string matches String");
	t.false(filter(String, String), "not equal to `String` object");
	t.equal("data", filter(String, String, () => {return "data";} ), "use onException to help");
	t.end();
});

test("filter should contain: runtime, powerState, bootTime, paused, snapshotInBackground", function (t) {
	var result_filter = filter(template, data);
	t.deepEqual(result_filter, exam_filter);
	t.deepEqual(exam_filter, filter(template, data, () => {return undefined;} ));
	t.end();
});

