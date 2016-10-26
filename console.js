//  fix console object if it doesn't exists (ie6-8, mobile browsers)

var console = console || (function () {
	
	var msgs = 0
	,	cache = ''
	,	console = {}
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
		var i = 0, msg = '', l = arguments.length, str, arg
		
		while ( i < l ) {
			//arg = arguments[i++]
			msg += (msg ? ", " : "") + resolve (arguments[i++]);
		}
		
		if (document && document.body) {
			div = document.getElementById('logger');
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
	
	console.clear = function () {
		div.innerHTML = '';
	}
	
	console.log = log;
	return console;
}());
