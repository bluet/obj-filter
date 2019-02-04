// @flow
"use strict";

function filter (template, obj) {

	if (template instanceof Array) {
		console.warn("obj-filter: Doesn't support Array in template yet. The meaning might differ in different context. Please use custom function instead.\nTreating as `true`");
		return obj;
	}
	
	if (typeof template === "undefined") {
		return undefined;
	} else if ( typeof template === "object" ){
		if (typeof obj === "object") {
			var result = {};
			Object.keys(template).forEach( function (key) {
				var tmp = filter(template[key], obj[key]);
				
				if (typeof tmp !== "undefined") {
					result[key] = tmp;
				}
			});
			return result;
		}
	} else if ( typeof template === "function" ) {
		return template(obj);
	} else {
		return obj;
	}
}

function merge (template, obj) {

	if (template instanceof Array) {
		console.warn("obj-filter: Doesn't support Array in template yet. The meaning might differ in different context. Please use custom function instead.\nTreating as `true`");
		return obj;
	}
	
	if (typeof template === "undefined") {
		return undefined;
	} else if ( typeof template === "object" ){
		if (typeof obj === "object") {
			var result = {};
			Object.keys(template).forEach( function (key) {
				var ret = merge(template[key], obj[key]);
				
				if (typeof ret !== "undefined") {
					result[key] = ret;
				} else if (typeof template[key] !== "undefined") {
					result[key] = template[key];
				}
			});
			return result;
		}
	} else if ( typeof template === "function" ) {
		return template(obj);
	} else {
		if (typeof obj === "undefined") {
			return template;
		} else {
			return obj;
		}
	}
}

function exist (template, obj) {

	if (template instanceof Array) {
		console.warn("obj-filter: Doesn't support Array in template yet. The meaning might differ in different context. Please use custom function instead.\nTreating as `true`");
		return obj;
	}
	
	if (typeof template === "undefined") {
		return undefined;
	}
	
	if (typeof template === "function") {
		return template(obj);
	}
	
	// must after typeof template === 'function', so user can handle it if they wanted
	if (typeof obj === "undefined") {
		return undefined;
	}
	
	if (typeof template === "object") {
		var result = {};

		for (const key in template) {
			if (template[key] === undefined) {
				// value 'undefined' means skip
				continue;
			}
			
			var tmp = exist(template[key], obj[key]);

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

module.exports = filter;
module.exports.merge = merge;
module.exports.exist = exist;