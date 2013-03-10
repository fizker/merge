module.exports = merge

function merge(a, b /*, ...args */) {
	var args = Array.prototype.slice.call(arguments, 2)

	var out = {}
	Object.keys(a || {}).forEach(function(key) {
		out[key] = a[key]
	})
	Object.keys(b || {}).forEach(function(key) {
		var val = b[key]
		// We only want to do this for actual objects
		// Any falsy type is not an actual object (0, '', null, etc)
		if(val
		&& typeof(val) == 'object'
		&& a[key]
		&& typeof(a[key]) == 'object'
		) {
			val = merge(a[key], val)
		}
		out[key] = val
	})
	if(args.length) {
		args.unshift(out)
		out = merge.apply(null, args)
	}
	return out
}
