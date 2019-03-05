// @flow
"use strict";

function filter (template, obj, onException) {

	// exclude what's undefined in template
	if (typeof template === "undefined") {
		return undefined;
	}

	// only check Type
	if ( _isType(template) ) {
		if ( _sameType(template, obj) ) {
			return obj;
		}

		// type mismatch
		if (onException) {
			return onException(template, obj);
		}
		return undefined;
	}

	// handle Array as True
	if (template instanceof Array) {
		if (onException) {
			return onException(
				template,
				obj,
				"obj-filter: Doesn't support Array in template yet. The meaning might differ in different context. Please use custom function instead.\nTreating as `true`"
			);
		}
		return obj;
	}
	
	// filtering
	if ( typeof template === "object" ){
		if (typeof obj === "object") {
			var result = {};
			Object.keys(template).forEach( function (key) {
				var tmp = filter(template[key], obj[key], onException);
				
				if (typeof tmp !== "undefined") {
					result[key] = tmp;
				}
			});
			return result;
		}

		// type mismatch
		if (onException) {
			return onException(template, obj);
		}
		return undefined;
	}
	
	
	if ( typeof template === "function" ) {
		return template(obj);
	}

	return obj;
}

function merge (template, obj, onException) {

	// exclude what's undefined in template
	if (typeof template === "undefined") {
		return undefined;
	}

	// only check Type
	if ( _isType(template) ) {
		if ( _sameType(template, obj) ) {
			return obj;
		}

		// type mismatch
		if (onException) {
			return onException(
				template,
				obj,
				"obj-filter: merge: Using Type Checking in template but object target object doesn't match.\nReturning template Type as result."
			);
		}
		return template;
	}

	// handle Array as True
	if (template instanceof Array) {
		if (onException) {
			return onException(
				template,
				obj,
				"obj-filter: merge: Doesn't support Array in template yet. The meaning might differ in different context. Please use custom function instead.\nTreating as `true`"
			);
		}
		return obj;
	}
	
	// obj ? obj : template ;
	if ( typeof template === "object" ){
		if (typeof obj === "object") {
			var result = {};
			Object.keys(template).forEach( function (key) {
				var ret = merge(template[key], obj[key], onException);
				
				if (typeof ret !== "undefined") {
					result[key] = ret;
				} else if (typeof template[key] !== "undefined") {
					result[key] = template[key];
				}
			});
			return result;
		} else {
			// type mismatch
			if (onException) {
				return onException(
					template,
					obj,
					"obj-filter: merge: template is object but target is not.\nReturning template as result."
				);
			}
			return template;
		}
	}
	
	// must before "undefined" handling, so user can handle undefined if they wanted
	if ( typeof template === "function" ) {
		return template(obj);
	}

	// must after typeof template === 'function', so user can handle it if they wanted
	if (typeof obj === "undefined") {
		return template;
	}

	return obj;
}

function exist (template, obj, onException) {

	// exclude what's undefined in template
	if (typeof template === "undefined") {
		return undefined;
	}

	// only check Type
	if ( _isType(template) ) {
		if ( _sameType(template, obj) ) {
			return obj;
		}

		// type mismatch
		if (onException) {
			return onException(
				template,
				obj,
				"obj-filter: exist: Using Type Checking in template but object target object doesn't match.\nReturning undefined."
			);
		}
		
		return undefined;
	}

	// handle Array as True
	if (template instanceof Array) {
		if (onException) {
			return onException(
				template,
				obj,
				"obj-filter: exist: Doesn't support Array in template yet. The meaning might differ in different context. Please use custom function instead.\nTreating as `true`"
			);
		}
		return obj;
	}
	
	// must before "undefined" handling, so user can handle undefined if they wanted
	if (typeof template === "function") {
		return template(obj);
	}
	
	// must after typeof template === 'function', so user can handle it if they wanted
	if (typeof obj === "undefined") {
		return undefined;
	}
	
	// check if all keys exists recursively
	if (typeof template === "object") {
		var result = {};

		for (const key in template) {
			if (template[key] === undefined) {
				// value 'undefined' means skip
				continue;
			}
			
			var tmp = exist(template[key], obj[key], onException);

			if (typeof tmp !== "undefined") {
				result[key] = tmp;
			} else {
				return undefined;
			}
		}

		return result;
	}
	
	// return whatever obj has
	return obj;
}


function _isType (template) {
	if (
		(template === String)
		|| (template === Number)
		|| (template === Boolean)
		|| (template === Array)
		|| (template === Symbol)
		|| (template === Map)
		|| (template === Set)
		|| (template === WeakMap)
		|| (template === WeakSet)
		|| (template === Object)
		|| (template === Function)
	) {
		return true;
	}

	return false;
}

function _sameType (template, obj) {
	if (
		(template === String && typeof obj === "string")
		|| (template === Number && typeof obj === "number")
		|| (template === Boolean && typeof obj === "boolean")
		|| (template === Array && Array.isArray(obj))
		|| (template === Symbol && typeof obj === "symbol")
		|| (template === Map && obj instanceof Map)
		|| (template === Set && obj instanceof Set)
		|| (template === WeakMap && obj instanceof WeakMap)
		|| (template === WeakSet && obj instanceof WeakSet)
		|| (template === Object && typeof obj === "object")
		|| (template === Function && typeof obj === "function")
	) {
		return true;
	}

	return false;
}


module.exports = filter;
module.exports.merge = merge;
module.exports.exist = exist;