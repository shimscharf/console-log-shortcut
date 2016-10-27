//  console object if it doesn't exists (ie6-8, mobile browsers)

var console = console || (function () {
	
	var msgs = 0
	,	cache = ''
	,	div
	
	,	resolve = function () {
			var i = 0, l = arguments.length, str, arg, ret = ''
			
			while ( i < l ) {
				arg = arguments[i++]
				if (typeof arg == 'function') {
					str = '<span style="color:green;">function ()</span>'		//	if it is a function, match the output of firebug
				} else if (Object.prototype.toString.call(arg) == '[object Array]') {
					str = '<span style="color:blue;font-weight:bold;">[ </span>' + resolve.apply (null, arg) + '<span style="color:blue;font-weight:bold;"> ]</span>';
				} else if (typeof arg == 'object') {
					str = '<span style="color:green;">' + arg + '</span>'
				} else if (typeof arg == 'boolean') {
					str = '<span style="color:blue;">' + arg + '</span>'
				} else {
					str = arg
				}
				
				ret += (ret ? ", " : "") + str;
			}
			return ret;
	}
	
	, log = function () {
		var msg = resolve.apply (null, arguments);
		
		if (document && document.body) {
			div = document.getElementById('logger');	// null if not found
			if ( !div ) {
				div = document.createElement('div');
				div.id = 'logger';
				div.innerHTML += cache;
				document.body.appendChild(div);
			}
			div.innerHTML = ++msgs + ': ' + msg + "<br>" + div.innerHTML;
		} else {
			cache = ++msgs + ': ' + msg + "<br>" + cache;
		}
	}
	
	return {
		clear :	function () {
			div.innerHTML = '';
		}
	,	log : log
	}
}());
