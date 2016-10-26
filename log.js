;(function () {
	
	var method
	,	noop = function () {}
	,	methods = ['debug', 'error', 'info', 'log',	'time', 'warn']	//	basic commands only --> add more if necessary
	,	length = methods.length, i = 0
	,	console = (window.console = window.console || {})	//	if console object doesn't exist, create empty object
	,	prot = Function.prototype
	,	bind = prot.bind
	
	//	define active and inactive functions once only:
	,	active = bind
		?	bind.call (console.log, console)	//	bind exists (modern browser and ie9+)
		:	function () {
				prot.apply.call (console.log, console, arguments);		//	ie6-8
			}
	,	inactive = noop

	//	for console object, if method doesn't exist, add stub
	while (i < length) {
		method = methods[i++];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
	
	//	attach on & off toggle methods to both active and inactive functions:
	active.on = inactive.on = function () {
		window.log = active;
	}
	
	active.off = inactive.off = function () {
		window.log = inactive;
	}
	
	//	default to activate logging:
	active.on();
	
})();
