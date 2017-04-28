# obj-filter
JavaScript Object content Filter. Support wildcard, nested, and filter function in template.

	"use strict";
	
	var objectFilter = require('obj-filter');
	
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
	
	
	var result = JSON.stringify( objectFilter(test_template, test_data), null, 4 );
	var exam = JSON.stringify( exam_data, null, 4 );
  
	if (result === exam) {
		console.log('Test OK');
	}
