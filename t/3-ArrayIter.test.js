"use strict";
const test = require("tape"); // assign the tape library to the variable "test"
const appRoot = require("app-root-path");
const {filter, merge, exist, ArrayIter} = require(appRoot + "/index.js");

const template = {
	"a1": ArrayIter(filter, {
		"a": String,
		"a11": ArrayIter(exist, Number, {"min": 3}),
		"a12": ArrayIter(
			merge,
			{
				"a121": filter.ArrayIter(filter, Number)
			}
		),
		"b": ArrayIter(exist, Number),
	}),
	"a2": ArrayIter(filter, Number, {"onException": () => undefined})
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
			"b": "b"
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


test("filter with ArrayIter and undefined filter should fail", function (t) {
	let result = filter(
		{"a2": ArrayIter(undefined, Number, {"onException": () => undefined})},
		{"a2": [1, 2, 3]}
	);
	t.deepEqual(result, {}, "undefined filter with customer onException results empty result");

	t.throws(() => filter(
		{"a2": ArrayIter(undefined, Number)},
		{"a2": [1, 2, 3]}
	), Error, "undefined filter with default onException throws Error");

	t.end();
});

test("filter with ArrayIter", function (t) {
	let result_filter = filter(template, data);
	t.deepEqual(result_filter, exam_data);
	t.deepEqual(exam_data, filter(template, data, () => {return undefined;} ));
	t.end();
});

