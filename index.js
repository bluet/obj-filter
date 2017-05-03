"use strict";

function filter (template, obj) {
	
	if (typeof template === 'undefined') {
		return undefined;
	} else if ( typeof template === 'object' ){
		if (typeof obj === 'object') {
			var result = {};
			Object.keys(template).forEach( function (key) {
				var tmp = filter(template[key], obj[key]);
				
				if (typeof tmp !== 'undefined') {
					result[key] = tmp
				};
			});
			return result;
		}
	} else if ( typeof template === 'function' ) {
		return template(obj);
	} else {
		return obj;
	}
};

function merge (template, obj) {
	
	if (typeof template === 'undefined') {
		return undefined;
	} else if ( typeof template === 'object' ){
		if (typeof obj === 'object') {
			var result = {};
			Object.keys(template).forEach( function (key) {
				var ret = merge(template[key], obj[key]);
				
				if (typeof ret !== 'undefined') {
					result[key] = ret;
				} else if (typeof template[key] !== 'undefined') {
					result[key] = template[key];
				};
			});
			return result;
		}
	} else if ( typeof template === 'function' ) {
		return template(obj);
	} else {
		if (typeof obj === 'undefined') {
			return template;
		} else {
			return obj;
		}
	}
};

module.exports = filter;
module.exports.merge = merge;
