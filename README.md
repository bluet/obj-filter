[![Build Status](https://travis-ci.org/BlueT/obj-filter.svg?branch=master)](https://travis-ci.org/BlueT/obj-filter) 
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=obj-filter&metric=alert_status)](https://sonarcloud.io/dashboard?id=obj-filter)

# obj-filter - JavaScript Object Filter.

JavaScript Object Filter. **Deep** filtering key/content *recursively*.  
Support **wildcard**, **nested**, and **filter_function** in *template*.

## SYNOPSIS

~~~~ js
"use strict";

var filter = require('obj-filter');

var template = {
    "runtime": {
        "connectionState": undefined,
        "powerState": function (args) {return "HELLOWORLD " + args},
        "bootTime": "my boot time",
        "paused": false,
        "snapshotInBackground": 1111111
    }
};

var clean_data = filter( template, fetchData() );

var updated_data = filter.merge( clean_data, newUpdates() );
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

## Default Function

### Keep only wanted data

When fetching data through API, sometimes the returned data could be Huge. You need many of them, but there are also too many trash included in returned data.  
Copying with `result[xxx] = input[xxx];` each by each, line by line, is a hell.  
Now you can copy one returned data structure (in JSON) to your favorite text editor, delete all unwanted lines, paste it back to your code, and use it as template.

~~~~ js
"use strict";

var filter = require('obj-filter');

var template = {
    "runtime": {
        "connectionState": undefined,       // In Template, when the value is undefined, the key will be ignored.
        "powerState": function (args) {return "HELLOWORLD " + args},    // pass data into your function, and use it as result value
        "bootTime": "my boot time",         // The string is just for your own note. Will keep whatever input is in result.
        "paused": false,                    // Will keep whatever input is in result.
        "snapshotInBackground": 1111111     // Will keep whatever input is in result.
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


var clean_data = filter(template, data);

// clean_data is:
{
    "runtime": {
        "powerState": "HELLOWORLD poweredOn",
        "bootTime": "2017-04-20T13:56:19.377Z",
        "paused": false,
        "snapshotInBackground": true
    }
};
~~~~

### User Data Checks

Validate user input data in browser (before send to server), or check them at server-side.

~~~~ js
var template = {
    email: validateEmail(email),                // call function validateEmail and use it's return value as value
    username: function (username) {
        if (/^[a-zA-Z_]+$/.test(username)) {    // check if username contains only a-z or underscore
            return username;
        } else {
            throw new Error('Invalid username');
        }
    },
    password: "original password"               // keep whatever user inputs
}

save_or_send( filter(template, inputData) );
~~~~

### Seperated template file

You can save template into seperated files.

Say _data_template/vmInfo.js_

~~~~ js
{
    "runtime": {
        "connectionState": undefined,
        "powerState": function (args) {return "HELLOWORLD " + args},
        "bootTime": "my boot time",
        "paused": false,
        "snapshotInBackground": 1111111
    }
};
~~~~

Require it as template

~~~~ js
var vm_tpl = require('data_template/vmInfo.js');

var vmData = filter(vm_tpl, yourData)
~~~~

## `merge` Function

### Keep template keys when not provided in input data.

~~~~ js
"use strict";

var filter = require('obj-filter');

var template = {
    "runtime": {
        "connectionState": undefined,
        "powerState": function (args) {return "HELLOWORLD " + args},
        "CoffeeTeaOrMe": "Me"
    }
};;

var newUpdates = fetchChanges();

// Assume:
// var data = {
//    "runtime": {
//        "connectionState": "connected",
//        "powerState": "poweredOn"
//    }
//};


var updated_data = filter.merge(template, newUpdates);

// clean_data is:
{
    "runtime": {
        "powerState": "HELLOWORLD poweredOn",
        "bootTime": "2017-04-20T13:56:19.377Z",
        "CoffeeTeaOrMe": "Me"
   }
};
~~~~

## Contribute
PRs welcome!  
If you use/like this module, please don't hesitate to give me a **Star**. I'll be happy whole day!

_Hope this module can save your time, a tree, and a kitten._
