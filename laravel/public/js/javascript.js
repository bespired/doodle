	var scrollTimer;
	var scrollTopDestination;
	var scrollworks = true;

	function scrollTo( locationY )
	{
		var documentScrollTop= (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

		scrollTopDestination = locationY;
		if ( scrollTopDestination > document.documentElement.scrollHeight-document.body.clientHeight ){
			scrollTopDestination = document.documentElement.scrollHeight-document.body.clientHeight;
		}
		if ( scrollTopDestination < 0){ scrollTopDestination = 0; }

		scrollTimer = setInterval( function(){

			var documentScrollTop= (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

			if ( documentScrollTop == scrollTopDestination )
			{
				clearInterval(scrollTimer);

			}else{

				var thisTop = documentScrollTop;
				var dist = ( thisTop - scrollTopDestination) * .75;
				if ( dist < 0 ){
					if ( dist < -150 ) dist = -150;
					if ( dist > -1 ) dist = -1;
				}else{
					if ( dist > 150 ) dist = 150;
					if ( dist < 1 ) dist = 1;
				}

				var dest = Math.floor(thisTop - dist);
				if ( scrollworks )
				{
					document.body.scrollTop = dest;
					documentScrollTop= document.body.scrollTop;
					if ( documentScrollTop != dest ) scrollworks= false;
				}
				if ( !scrollworks )
				{
					document.documentElement.scrollTop = dest;
				}

			}

		}, 10 );
	}

	var isClipPathSupported = function () {

		var base = 'clipPath',
			prefixes = [ 'webkit', 'moz', 'ms', 'o' ],
			properties = [ base ],
			testElement = document.createElement( 'testelement' ),
			attribute = 'polygon(50% 0%, 0% 100%, 100% 100%)';

		// Push the prefixed properties into the array of properties.
		for ( var i = 0, l = prefixes.length; i < l; i++ ) {
			var prefixedProperty = prefixes[i] + base.charAt( 0 ).toUpperCase() + base.slice( 1 ); // remember to capitalize!
			properties.push( prefixedProperty );
		}

		// Interate over the properties and see if they pass two tests.
		for ( var i = 0, l = properties.length; i < l; i++ ) {
			var property = properties[i];

			// First, they need to even support clip-path (IE <= 11 does not)...
			if ( testElement.style[property] === '' ) {

				// Second, we need to see what happens when we try to create a CSS shape...
				testElement.style[property] = attribute;
				if ( testElement.style[property] !== '' ) {
					return true;
				}
			}
		}

		return false;
	};

	function classAdd(a, b) {
		var c = document.querySelector(a);
		if ( c !== null )
		{
			c.classList ? c.classList.add(b) : c.className += " " + b
		}
	}

	function classRemove(a, b) {
		var c = document.querySelector(a);
		c.classList ? c.classList.remove(b) : c.className = c.className.replace(new RegExp("(^|\\b)" + b.split(" ").join("|") + "(\\b|$)", "gi"), " ")
	}

	function styleAdd(a, b) {
		var c = document.querySelector(a);
		for (var d in b) c && (c.style[d] = b[d])
	}

	function appendClass(a, b) {
		var c = "#{}".replace("#", b),
			d = document.createElement("style");
		d.type = "text/css", d.id = a, d.styleSheet ? d.styleSheet.cssText = c : d.appendChild(document.createTextNode(c));
		var e = document.head || document.getElementsByTagName("head")[0];
		e.appendChild(d)
	}

	function hasClass(a, b) {
		var c = document.querySelector(a);
		return c.classList ? c.classList.contains(b) : new RegExp("(^| )" + b + "( |$)", "gi").test(c.className)
	}

	function numParse(a) {
		var b = {
			0: "zero",
			1: "first",
			2: "second",
			3: "third",
			4: "fourth",
			5: "fifth",
			6: "sixth",
			7: "seventh",
			8: "eighth",
			9: "ninth",
		   10: "tenth",
		   11: "eleventh",
		   12: "twelfth",

		};
		return b[a]
	}

	function wordParse(a) {
		var b = {
			zero: 0,
			first: 1,
			second: 2,
			third: 3,
			fourth: 4,
			fifth: 5,
			sixth: 6,
			seventh: 7,
			eighth: 8,
			ninth: 9,
			tenth: 10,
			eleventh: 11,
			twelfth: 12
		};
		return b[a.toLowerCase()]
	}



	var body = document.body, html = document.documentElement;


	document.addEventListener("scroll", function(){
		if ( document.body.scrollTop > 25 )
		{
			if ( document.querySelector('.mouse-container.fadeout') === null )
			{
				classAdd('.mouse-container', 'fadeout');
			}
		}
		if ( document.body.scrollTop < 25 )
		{
			if ( document.querySelector('.mouse-container.fadeout') !== null )
			{
				classRemove('.mouse-container', 'fadeout');
			}
		}
	});

	if( navigator.userAgent.indexOf('MSIE 9') > 0 )
	{
		document.querySelector('.layer0').innerHTML = '';
		document.querySelector('.layer1').innerHTML = '';
		document.querySelector('.layer3').innerHTML = '';

	}else{

		for(var l=0; l< 4; l++)
		{
			for(var c=0; c< 4; c++)
			{
				var f= ((l+1) * 20) / 100.0;
				var i= c + l*4;
				var s= Math.floor( l*20 + Math.random() * 10 + 20) / 100;
				var r= Math.floor(Math.random() * 180) - 90;
				var x= Math.floor(Math.random() * 100);
				var y= Math.floor(Math.random() * 20 + l * 20);
				var styles= {
					left: x+'%',
					top: y+'%',
					transform: 'scale('+s+') rotateZ('+r+'deg)',
					webkitTransform: 'scale('+s+') rotateZ('+r+'deg)',
					msTransform: 'scale('+s+') rotateZ('+r+'deg)'

				}
				styleAdd('.pluisje'+i, styles);
			}
		}
	}

	var scene = document.getElementById('parallax');
	var parallax = new Parallax(scene,{
		invertX: false,
		invertY: false,
		scalarX: 65,
		scalarY: 25
	});

	if ( window.innerWidth < 480 )
	{
		document.querySelector('.jmpgevers h1').innerHTML = 'dr. J.M.P. Gevers';
		document.querySelector('.jmpgevers h2').innerHTML = 'Teams | Time | Leadership | Creativity<br>Innovation | Adaptation';
	}

		var elements = document.querySelectorAll('.mailto');
		Array.prototype.forEach.call(elements, function(el, i){
			el.addEventListener('click', function(e){
				var person= 'j.m.p.gevers';
				var domain= 'ln.eut'.split('').reverse().join('');
				this.setAttribute('href', "mailto:"+person+"@"+domain);
			})
			el.removeAttribute('target', '');
		});

		var elements = document.querySelectorAll('.callto');
		Array.prototype.forEach.call(elements, function(el, i){
			el.addEventListener('click', function(e){
				var country= '+31';
				var city   = '40';
				var number = '2474178';
				this.setAttribute('href', "tel:"+country+city+number);
			})
			el.removeAttribute('target', '');
		});



	function project_select(pg)
	{
		document.querySelector('.projects .viewport').setAttribute('class', 'viewport '+numParse(pg));
		document.querySelector('.projects .boxes').setAttribute('class', 'boxes '+numParse(pg));
		return false;
	}

	function project_slide(dir, max)
	{
		var cur = wordParse(document.querySelector('.projects .viewport').getAttribute('class').substr(9));
		cur+=dir;
		if (( cur > 0 ) && ( cur <= max )) project_select(cur);
		return false;
	}

	function project_more(me)
	{
		var par = me.parentNode.parentNode.parentNode
		if (par.classList) { par.classList.add('more'); }else{ par.className += ' more'; }
		return false;
	}

	var projecttime = new Hammer( document.querySelectorAll('.projects .rollwrapper')[0] );
	projecttime.on('swiperight', function(ev) {
		console.log(">>");
		project_slide(-1);
	});
	projecttime.on('swipeleft', function(ev) {
		console.log("<<");
		project_slide(1);
	});



	function course_select(pg)
	{
		document.querySelector('.courses .viewport').setAttribute('class', 'viewport '+numParse(pg));
		document.querySelector('.courses .boxes').setAttribute('class', 'boxes '+numParse(pg));
		return false;
	}

	function course_slide(dir)
	{
		var cur = wordParse(document.querySelector('.courses .viewport').getAttribute('class').substr(9));
		cur+=dir;
		if (( cur > 0 ) && ( cur <= 5 )) course_select(cur);
		return false;
	}

	function course_more(me)
	{
		var par = me.parentNode.parentNode.parentNode
		if (par.classList) { par.classList.add('more'); }else{ par.className += ' more'; }
		return false;
	}

	appendClass('type-for-story', '.courses .story');
	var coursestories = document.querySelectorAll('.courses .story');
	var maxheight = 0;
	Array.prototype.forEach.call(coursestories, function(el, i){
		maxheight= Math.max(maxheight, el.offsetHeight);
	});
	var storyheight= ".courses .story { min-height: {H}px !important;}".replace('{H}', 20+maxheight);

	document.getElementById('type-for-story').innerHTML = storyheight;

	var coursetime = new Hammer( document.querySelectorAll('.courses .rollwrapper')[0] );
	coursetime.on('swiperight', function(ev) {
		console.log(">>");
		course_slide(-1);
	});
	coursetime.on('swipeleft', function(ev) {
		console.log("<<");
		course_slide(1);
	});



	var phone= false,
		ipad=false;

	if ( navigator.userAgent.toLowerCase().indexOf('iphone') > -1 ) phone= true;
	if ( navigator.userAgent.toLowerCase().indexOf('android') > -1 ) phone= true;
	if ( navigator.userAgent.toLowerCase().indexOf('ipad') > -1 ) ipad= true;

	if ( phone ) styleAdd('.callme', {display:'inline-block'});

	if ( ipad )
	{
		appendClass('ipad-font-fix', '');
		var sections=document.querySelectorAll('section');
		var fix = '';
		Array.prototype.forEach.call(sections, function(el, i){

			var classes= el.getAttribute('class');
			var classid= classes.split(' ');
			fix+= '.{N} h2{ font-weight: 400; -webkit-font-smoothing: auto; } '.replace('{N}', classid[0]);
		});
		var footer = '.footer .grey .title{ font-weight: 400; -webkit-font-smoothing: auto; }';
		document.getElementById('ipad-font-fix').innerHTML = fix + footer;

	}

	Math.radians = function(degrees) {
		return degrees * Math.PI / 180;
	};

	var slant_angle = 7.5;
	var head        = document.head || document.getElementsByTagName('head')[0];
	var anglefactor = Math.tan( Math.radians(slant_angle) );

	function slant()
	{

		if ( document.querySelector('.slant') === null ) return;

		var aspect = window.innerWidth / window.innerHeight;
		var top= aspect * 10;
//		var bot= 100- aspect * 10;
		var cur = document.querySelector('.slant').offsetHeight;
		var opp = anglefactor * window.innerWidth;
		var bot = cur - opp;

		var poly= 'polygon(0 0, 100% 0, 100% {B}px, 0% 100%)'
			.replace('{T}', top)
			.replace('{B}', Math.floor(bot));

		var clippath= 'clip-path:' + poly;
		var slanting= ".slant { {C}; -webkit-{C}; padding-bottom: {H}px }"
			.replace('{C}', clippath)
			.replace('{C}', clippath)
			.replace('{H}', Math.floor(opp));

		if (isClipPathSupported()){
			var spacer= ".spacer { min-height: {H}px; }"
				.replace('{H}', (document.querySelector('.footer .grey').offsetHeight-20) );
		}else{
			var spacer= ".spacer { min-height: {H}px; }"
				.replace('{H}', (document.querySelector('.footer .grey').offsetHeight+60) );

				spacer+=".footershade { transform: skewY(0deg); -ms-transform: skewY(0deg); }";
		}

		document.getElementById('type-for-slant').innerHTML = slanting + spacer;

		var check = 'slantdone('+cur+')';
		setTimeout( check, 20 );

	}

	function slantdone( h )
	{
		if ( Math.floor(h) != Math.floor(document.querySelector('.slant').offsetHeight) ) slant();
	}

	window.addEventListener('resize', function(){
		slant();
	});

	document.addEventListener("scroll", function(){
		var docheight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
		var documentScrollTop= (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

		if ( document.querySelector('.footer.invisible') !== null )
		{
			if (( documentScrollTop > docheight / 4 ) || ipad )
			{
				classRemove('.footer.invisible', 'invisible');
			}
		}else{
			if ( documentScrollTop < docheight / 4 )
			{
				classAdd('.footer', 'invisible');
			}
		}
	});

	var loading;
	loading = setInterval( function(){
//		console.log( document.readyState );
		if ( document.readyState != 'loading') {
			clearInterval(loading);

			appendClass('type-for-slant', '.slant');

			slant();
			slant();
		}
	}, 10);



	if( window.innerHeight < 500 )
	{
		appendClass('fix-small-height', '.menulist');
		var p = 2; if ( window.innerHeight < 400 ) p = 0;
		var pad = '.personal img {width: 33%;} .menulist ul li { padding: {P}px 0 {P}px 2em;}'.replace('{P}', p).replace('{P}', p);
		document.getElementById('fix-small-height').innerHTML = pad;
	}

	var elements = document.querySelectorAll('[data-scrollto]');
	Array.prototype.forEach.call(elements, function(el, i){

		el.addEventListener('click', function(e){

			var scrolltoname = el.getAttribute('data-scrollto');
			var scrollY= 0;

			if ( document.getElementById(scrolltoname) !== null ){
				scrollY= document.getElementById(scrolltoname).offsetTop;
			}
			if ( scrolltoname == 'top') scrollY= 0;
			if ( scrolltoname == 'bottom') scrollY= document.documentElement.scrollHeight;
			if ( scrolltoname == 'contact') scrollY= document.documentElement.scrollHeight;


			if ( scrollY >= 0 ){
				e.preventDefault();

				scrollTo( scrollY );

				if (hasClass('.fullfixed', 'selected'))
				{
					classRemove('.fullfixed.selected', 'selected')
				}

				if (document.querySelector('.menulist .selected')!==null) { classRemove('.menulist .selected', 'selected'); }

			}else{
				alert(scrolltoname + ' not defined');
			}

		});

	});

	document.querySelector('.xmarksthespot').addEventListener('click', function(event){

		//var fullfixed = document.querySelector('.fullfixed');
		//if (fullfixed.classList.contains('selected'))
		if (hasClass('.fullfixed', 'selected'))
		{

			classRemove('.fullfixed.selected', 'selected');
			classRemove('.mainmenu.selected', 'selected');

		}else{

			classAdd('.fullfixed', 'selected');
			classAdd('.mainmenu', 'selected');

			var startTime = (new Date()).getTime();
			requestAnimFrame(function() {
				animate(circles, canvas, context, startTime, startTime );
			});

		}
		event.preventDefault();
		event.stopPropagation();
	});



	function drawCircle(obj,context,r) {
		context.beginPath();
		context.arc(obj.x, obj.y, r, 0, 2 * Math.PI, false);
		context.fill();
	}
	function drawLine(obj1,obj2,context) {
		context.beginPath();
		context.moveTo(obj1.x, obj1.y);
		context.lineTo(obj2.x, obj2.y);
		context.stroke();
	}
	function animate(circles, canvas, context, startTime, last ) {
		// update
		var time = (new Date()).getTime() - startTime;
		var diff= time - last;
		var f = diff / 10.0;

		var fullfixed= document.querySelector('.fullfixed.selected');
		if ( fullfixed !== null )
		{
			// clear
			context.clearRect(0, 0, canvas.width, canvas.height);

			// virtual animate
			for( points= 0; points < circles.length; points++){
				var c= circles[points];
				c.x += c.vx / (2.0 * f);
				c.y += c.vy / (2.0 * f);
				if ( c.x < -50 ) c.vx=-c.vx ;
				if ( c.x > 250 ) c.vx=-c.vx ;
				if ( c.y < -50 ) c.vy=-c.vy ;
				if ( c.y > 250 ) c.vy=-c.vy ;
			}

			context.strokeStyle = 'rgba(255,255,255, 0.1)';
			for( frompoint= 0; frompoint < circles.length; frompoint++){
				var a= circles[points];
				max = frompoint; if( max > 5 ) max= 5;
				for( topoint= 0; topoint < max; topoint++){
					drawLine(circles[frompoint],circles[topoint], context);
				}
			}
			context.fillStyle = 'rgba(255,255,255, 0.1)';
			for( points= 0; points < circles.length; points++){
				drawCircle(circles[points], context,10);
			}
			context.fillStyle = 'rgba(255,255,255, 0.5)';
			for( points= 0; points < circles.length; points++){
				drawCircle(circles[points], context, 2);
			}

			// request new frame?
			requestAnimFrame(function() {
				animate(circles, canvas, context, startTime, time );
			});
		}

	}

	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	var circles= [];
	for( points= 0; points < 20; points++)
	{
		var circle = {
			 x: Math.random() * 400 - 100,
			 y: Math.random() * 200 - 100,
			vx: Math.random() - 0.5,
			vy: Math.random() - 0.5,
			r: 10
		};
		circles.push( circle );
	}

	// wait one second before starting animation
	setTimeout(function() {
		var startTime = (new Date()).getTime();
		animate(circles, canvas, context, startTime, 0);
	}, 1000);


	var sections= document.querySelectorAll('section');

	document.addEventListener("scroll", function(){
		var section= sections[0];
		var active = true;
		var documentScrollTop= (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		for(var i=0; i<sections.length; i++){

			if ( sections[i].offsetTop > -1 )
			{
				if( documentScrollTop > sections[i].offsetTop - 20){
					var item= sections[i].getAttribute('class');
					if ( item ) {
						if ( item.indexOf('full') == 0 ) active = false;
						if ( item.indexOf('footer') == 0 ) active = false;
						if ( active ) section= item.replace(' ','-');
					}
				}
			}
		}

		document.querySelector('.xmarksthespot').setAttribute('class', 'xmarksthespot b_'+section);
	});


	(function() {
		var lastTime = 0;
		var vendors = ['webkit', 'moz'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame =
			  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); },
				  timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
	}());

	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60); };
	})();


// if(navigator.userAgent.indexOf('Chrome') == -1)
// {
// 	var images = new Array()
// 	function preload() {
// 		for (i = 0; i < preload.arguments.length; i++) {
// 			images[i] = new Image()
// 			images[i].onload = function(){
// 				styleAdd( this.data, { 'backgroundImage': 'url('+this.src+')' });
// 			};
// 			images[i].data= preload.arguments[i][0];
// 			images[i].src = preload.arguments[i][1];
// 		}
// 	}
// 	preload(
// 		[ '.aboutme',  "static/images/gradient-blue-big.jpg" ],
// 		[ '.theses',   "static/images/gradient-dandilion-big.jpg" ],
// 		[ '.teaching', "static/images/gradient-teaching-big.jpg"]
// 	);
// }
