# obj-filter - JavaScript Object Filter.

JavaScript Object Filter. **Deep** filtering key/content *recursively*.  
Support **wildcard**, **nested**, and **filter_function** in *template*.

~~~~ js
"use strict";

var objFilter = require('obj-filter');

var template = {
    "runtime": {
        "connectionState": undefined,
        "powerState": function (args) {return "HELLOWORLD " + args},
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


var result = objFilter(template, data);

// result is:
{
   "runtime": {
       "powerState": "HELLOWORLD poweredOn",
       "bootTime": "2017-04-20T13:56:19.377Z",
       "paused": false,
       "snapshotInBackground": true
   }
};
~~~~

## Template Object
According to the **Template Object structure**, `obj-filter` supports the following types of value with different behaviour to build the result object.

### undefined
If the *value* of the key is `undefined`, the key will be **filtered** (skipped) and will not included in result object.

### object
If the *value* of the key is an `object`, `obj-filter` will _dive into it and check the **deeper** level of keys_.  

### function
If the *value* of the key is an `function`, `obj-filter` will _pass the **value** of the same key in **input data** to the **function**_, and includes it's returned data in result.  
So it's your call to customize how you would like to handle, define what you want to do with the input data. Be sure to **return something** from your function.

- If return `undefined`, the key will be **filtered** (skipped).
- If return anything else, the key will be **included**.

### Anything else (string, integer, `true`, `false`, etc)
The value of the key will be **included**.
