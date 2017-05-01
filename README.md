# obj-filter - JavaScript Object Filter.

JavaScript Object Filter. Deep filtering key/content recursively.  
Support wildcard, nested, and filter_function in template.

	"use strict";
	
	var objectFilter = require('obj-filter');
	
	var template = {
	    "runtime": {
	        "connectionState": undefined,
	        "powerState": function () {return "HELLOWORLD"},
	        "bootTime": "my boot time",
	        "paused": false,
	        "snapshotInBackground": 1111111
	    }
	};
	
	var data = function_or_somewhere();
	
	// Assume:
	// var data = {
	//    "vm": {
	//        "type": "VirtualMachine"
	//    },
	//    "runtime": {
	//        "device": 9999,
	//        "connectionState": "connected",
	//        "powerState": "poweredOn",
	//        "bootTime": "2017-04-20T13:56:19.377Z",
	//        "paused": false,
	//        "snapshotInBackground": true
	//    }
	//};
	
	
	var result = objectFilter(template, data);
	
	// result is:
	// {
	//    "runtime": {
	//        "powerState": "HELLOWORLD",
	//        "bootTime": "2017-04-20T13:56:19.377Z",
	//        "paused": false,
	//        "snapshotInBackground": true
	//    }
	// };
