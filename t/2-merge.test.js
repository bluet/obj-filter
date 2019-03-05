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


var exam_merge  = {
	"runtime": {
		"powerState": "HELLO WORLD poweredOn",
		"bootTime": ["my boot time"],
		"paused": false,
		"snapshotInBackground": false,
		"CoffeeTeaOrMe": "Me",
		"obj jj": { "kk": "yy" }
	},
	"running": Boolean
};

test("filter.merge with undefined template should fail", function (t) {
	var result_fail = filter.merge(undefined, data, () => {return undefined;} );
	t.false(result_fail, "empty template results empty result");
	t.end();
});

test("filter.merge with String Type template", function (t) {
	t.equal("data", filter.merge(String, "data"), "string matches String");
	t.equal(String, filter.merge(String, String), "not equal to `String` object");
	t.end();
});

test("filter.merge should contain: runtime, powerState, bootTime, paused, snapshotInBackground, CoffeeTeaOrMe", function (t) {
	var result_merge = filter.merge(template, data);
	t.deepEqual(result_merge, exam_merge);
	t.end();
});
