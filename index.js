"use strict";

module.exports = function objFilter (template, obj) {
	
	if (typeof template === 'undefined') {
		return undefined;
	} else if ( typeof template === 'object' ){
		if (typeof obj === 'object') {
			var result = {};
			Object.keys(template).forEach( function (key) {
				var tmp = objFilter(template[key], obj[key]);
				
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
}
