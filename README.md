[![Build Status](https://travis-ci.org/BlueT/obj-filter.svg?branch=master)](https://travis-ci.org/BlueT/obj-filter) 
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=obj-filter&metric=alert_status)](https://sonarcloud.io/dashboard?id=obj-filter)

# obj-filter - JavaScript Object Filter / Merger.

JavaScript Object Filter. **Deep** filtering key/content *recursively*.  
Support **type checking**, **wildcard**, **nested**, and **filter function** in *template*.

## INSTALL

`npm i obj-filter`

Or find help from:
- https://www.npmjs.com/package/obj-filter
- https://github.com/BlueT/obj-filter

## SYNOPSIS

~~~~ js
"use strict";

const {filter, merge, exist, ArrayIter} = require('obj-filter');

const template = {
    "runtime": {
        "connectionState": undefined,   // excluded
        "powerState": function (args) {return "HELLO WORLD " + args},   // pass into the checker function
        "bootTime": "my boot time",     // included
        "paused": false,
        "snapshotInBackground": 1111111,
        "numbers": ArrayIter(filter, Number),   // value of "numbers" must be an array, and will check all elements in the array
    },
    "running": Boolean
};

let clean_data = filter( template, fetchData() );
let updated_data = filter.merge( clean_data, newUpdates() );
let clean_full_data = filter.exist( template, fetchData() );
~~~~

## Template Object
According to the **Template Object structure**, `obj-filter` supports the following types of value with different behaviors to build the result object.

### undefined
If the *value* of the key is `undefined`, the key will be **filtered** (skipped) and will not included in result object.

### object
If the *value* of the key is an `object`, `obj-filter` will _dive into it and check the **deeper** level of keys_.  

### function
If the *value* of the key is an `function`, `obj-filter` will _pass the **value** of the same key in **input data** to the **function**_, and includes it's returned data in result.  
So it's your call to customize how you would like to handle, define what you want to do with the input data. Be sure to **return something** from your function.

- If return `undefined`, the key will be **filtered** (skipped).
- If return anything else, the key will be **included**.

### DataTypes / Constructors
`String`, `Number`, `Boolean`, `Array`, `Symbol`, `Map`, `Set`, `WeakMap`, `WeakSet`, `Object`, `Function` in template will do type checking on target object.

Success if type matches and fails if they don't.

### Anything else (string, array, number, etc)
The value of the key will be **included**.

### onException callback function
You can pass an additional `onException` callback function into `filter()`, `filter.merge()`, and `filter.exist()` to handle exceptions.

`onException(template, input, error_msg)` will be called when data expected but type mismatch or undefined.

~~~~ js
filter(template, data, (tpl, obj, err) => { console.dir({tpl, obj, err}); return undefined; });
~~~~


## ArrayIter Check Array Elements

If you want to check `values of array`, use `ArrayIter`. It makes sure that value must be an Array and checks all elements in the array.

The first two arguments are required:
- (required) filter / merge / exist
- (required) template
- (optional) option
    - min: an Integer, default `0`. indicates at least how many elements must be valid. If the result array contains elements fewer than that number, the whole result will be `undefined`.
    - onException: a Function, will be called when exception occurred.

~~~~ js
const template = {
	"a1": ArrayIter(filter, {
		"a": String,
		"a11": ArrayIter(
            exist,
            Number,
            {"onException": () => undefined}
        ),
		"a12": ArrayIter(merge, {
			"a121": filter.ArrayIter(filter, Number, {"min": 3})
		}),
	}),
	"a2": ArrayIter(filter, Number)
};
~~~~


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
        "powerState": function (args) {return "HELLO WORLD " + args},    // pass data into your function, and use it as result value
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
        "powerState": "HELLO WORLD poweredOn",
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

### Separated template file

You can save template into separated files.

Say _data_template/vmInfo.js_

~~~~ js
{
    "runtime": {
        "connectionState": undefined,
        "powerState": function (args) {return "HELLO WORLD " + args},
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
        "powerState": function (args) {return "HELLO WORLD " + args},
        "CoffeeTeaOrMe": "Me"
    }
};

var newUpdates = fetchChanges();

// Assume:
// var newUpdates = {
//    "runtime": {
//        "connectionState": "connected",
//        "powerState": "poweredOn"
//    }
//};


var updated_data = filter.merge(template, newUpdates);

// updated_data is:
{
    "runtime": {
        "powerState": "HELLO WORLD poweredOn",
        "bootTime": "2017-04-20T13:56:19.377Z",
        "CoffeeTeaOrMe": "Me"
   }
};
~~~~


## `exist` Function

### Similar to default `filter`, but All Keys in template must also exists in input data.

~~~~ js
"use strict";

var filter = require('obj-filter');

var template = {
	"vm": undefined,
	"runtime": {
		"connectionState": undefined,
		"powerState": function (args) {return "HELLO WORLD " + args},
		"bootTime": "my boot time",
		"obj jj": { "kk": "yy" }
	}
};

var data = fetch_from_somewhere();

// Assume:
// var data = {
// 	"runtime": {
// 		"device": 9999,
// 		"connectionState": "connected",
// 		"powerState": "poweredOn",
// 		"bootTime": 2,
// 		"obj jj": { "kk": "zz" }
// 	}
// };


var clean_full_data = filter.exist(template, data);

// clean_full_data is:
{
	"runtime": {
		"powerState": "HELLO WORLD poweredOn",
		"bootTime": 2,
		"obj jj": { "kk": "zz" }
	}
};
~~~~

## Contribute

PRs welcome!  
If you use/like this module, please don't hesitate to give me a **Star**. I'll be happy whole day!

_Hope this module can save your time, a tree, and a kitten._
