"use strict";
const test = require("tape"); // assign the tape library to the variable "test"
const appRoot = require("app-root-path");
const {filter, merge, exist, ArrayIter} = require(appRoot + "/index.js");

const template = {
	"a1": ArrayIter(filter, {
		"a": String,
		"a11": ArrayIter(exist, Number, {"min": 3}),
		"a12": ArrayIter(merge, {
			"a121": filter.ArrayIter(filter, Number)
		}),
	}),
	"a2": ArrayIter(filter, Number)
};

var data = {
	"a1": [
		{
			"a": "a",
			"a11": [1, 2, 3, {}],
			"a12": [
				{
					"a121": [1, 2, 3]
				},
				{
					"a121": [1, 2, 3]
				},
				{
					"a121": [1, 2, 3]
				},
			],
		},
		{
			"a11": [1, 2, 3],
			"a12": [
				{
					"a121": [1, 2, 3]
				},
				{
					"a121": [1, 2, 3]
				},
				{
					"a121": [1, 2, 3]
				}
			],
		},
	],
	"a2": [1, 2, 3]
};

const exam_data  = {
	"a1": [
		{
			"a": "a",
			"a11": [1, 2, 3],
			"a12": [
				{
					"a121": [1, 2, 3]
				},
				{
					"a121": [1, 2, 3]
				},
				{
					"a121": [1, 2, 3]
				}
			],
		},
		{
			"a11": [1, 2, 3],
			"a12": [
				{
					"a121": [1, 2, 3]
				},
				{
					"a121": [1, 2, 3]
				},
				{
					"a121": [1, 2, 3]
				}
			],
		},
	],
	"a2": [1, 2, 3]
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
	// console.log(JSON.stringify(result_filter, null, 4));
	t.deepEqual(result_filter, exam_data);
	t.deepEqual(exam_data, filter(template, data, () => {return undefined;} ));
	t.end();
});

