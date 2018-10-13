exports.lowerKeys = (obj) => {
	let key, keys = Object.keys(obj);
	let n = keys.length;
	let newobj={};
	while (n--) {
			key = keys[n];
			newobj[key.toLowerCase()] = obj[key];
	}
	return newobj;
}