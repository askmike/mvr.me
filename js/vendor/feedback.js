$(function() {
	$('#feedbackDemo1').on( 'click', function(e) {
		e.preventDefault();
		$.feedback('Just a sample message!');
	});

	$('#feedbackDemo2').on( 'click', function(e) {
		e.preventDefault();
		$.feedback('Loading something important (just kidding).', true);
		setTimeout( submitted, 2500 );
	
		function submitted() {
			$.feedback( 'All done!' );
		}
	});
});

//fgnass.github.com/spin.js#v1.2.5
(function(a,b,c){function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),o={lines:12,length:7,width:5,radius:10,rotate:0,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},p=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},q.defaults,o)};p.defaults={},m(p.prototype,{spin:function(a){this.stop();var b=this,c=b.opts,d=b.el=l(g(0,{className:c.className}),{position:"relative",zIndex:c.zIndex}),e=c.radius+c.length+c.width,h,i;a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"})),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);if(!f){var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;!function q(){j++;for(var a=c.lines;a;a--){var e=Math.max(1-(j+a*p)%m*o,c.opacity);b.opacity(d,c.lines-a,e,c)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))}()}return b},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this},lines:function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c+b.rotate)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),!function(){function a(a,b){return g("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',b)}var b=l(g("group"),{behavior:"url(#default#VML)"});!k(b,"transform")&&b.adj?(i.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(b,c){function f(){return l(a("group",{coordsize:e+" "+e,coordorigin:-d+" "+ -d}),{width:e,height:e})}function k(b,e,g){h(i,h(l(f(),{rotation:360/c.lines*b+"deg",left:~~e}),h(l(a("roundrect",{arcsize:1}),{width:d,height:c.width,left:c.radius,top:-c.width>>1,filter:g}),a("fill",{color:c.color,opacity:c.opacity}),a("stroke",{opacity:0}))))}var d=c.length+c.width,e=2*d,g=-(c.width+c.length)*2+"px",i=l(f(),{position:"absolute",top:g,left:g}),j;if(c.shadow)for(j=1;j<=c.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=c.lines;j++)k(j);return h(b,i)},p.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}):f=k(b,"animation")}(),a.Spinner=p})(window,document);


/*
		jQuery feedback plugin

		author: Mike van Rossum
*/
;(function( $ ){

	$.feedback = function( parameter, spin, time ) {  
		var options;
		
		if( typeof parameter === 'object' ) {
			options = parameter;
		}
		
		var p,
			body = $( 'body' ),
			elem = $( '#jFeedback' ),
			count = elem.data( 'feedback' ) || { started: 0, done: 0 },
		
		// these are the default settings
			settings = $.extend({
				fadeSpeed: 200,
				style: true,
				content: {
					backgroundColor: 'black',
					borderRadius: '20px',
					width: '500px',
					padding: '20px 50px',
					color: 'white',
					margin: 'auto',
					opacity: 0.8,
					overflow: 'hidden'
				},
				jFeedback: {
					'text-align': 'center',
					position: 'fixed',
					top: '60px',
					left: 0,
					right: 0,
					'z-index': 10
				},
				spin: {
					opts: {
						lines: 10, // The number of lines to draw
						length: 2, // The length of each line
						width: 5, // The line thickness
						radius: 11, // The radius of the inner circle
						color: '#fff', // #rgb or #rrggbb
						speed: 1.2, // Rounds per second
						trail: 48, // Afterglow percentage
						shadow: false, // Whether to render a shadow
						hwaccel: false, // Whether to use hardware acceleration
						className: 'spinner', // The CSS class to assign to the spinner
						zIndex: 2e9, // The z-index (defaults to 2000000000)
						top: 7, // Top position relative to parent in px
						left: 505 // Left position relative to parent in px
					},
					css: {
						position: 'relative',
						top: '-16px'	
					}
				},
				p: {
					margin: 0,
					'float': 'left'
				}
			}, options),
			
		// this function creates the dom element
			createElem = function() {
				var style = settings.style,
				
				// the container
					div = $( '<div/>', {
						'id': 'jFeedback'
					})
						.css( style ? settings.jFeedback : {} )
						.data('feedback', 0)
						.hide(),
				// the content div
					content = $( '<div/>', {
						'class': 'jFeedbackContent'
					})
						.css( style ? settings.content : {} )
						.appendTo( div ),
				// the p that holds the text
					p = $( '<p/>' )
						.css( style ? settings.p : {} )
						.appendTo( content ),
				// the div that holds the spinner
					spin = $( '<div/>', {
						'id': 'jFeedbackSpin'
					})	
						.css( style ? settings.spin.css : {} )
						.appendTo( content );
				
				return div;
			},
		// take the dom element off dom or creates a new one
			getElem = function() {
				return elem[0] ? elem.detach() : createElem();
			},
		// update the text, fadeIn and append to the dom
			update = function( feedback ) {
				var el = getElem();
			
				el
					.find( '.jFeedbackContent' )
						.find( 'p' )
							.text( feedback )
						.end()
					.end()
					.appendTo( body )
					.fadeIn( settings.fadeSpeed )
					.find( '#jFeedbackSpin' )
						.spin( spin ? settings.spin.opts : false );
					
				if(!spin) {
					
					var removeEl = function() {
						remove(el);
					}
					
					el.click( removeEl );
					// we can't use $().delay because we want to be able to force hide
					setTimeout( removeEl, time || 2000  );
					
				}
			},
			remove = function(el) {
				
				console.log(el.data('feedback') + ' VS ' + count);
				
				if( el.data('feedback') === count ) {
					el.data( 'feedback', ++count );
					el.fadeOut( settings.fadeSpeed );
				}	
			};
			
		count.started++;	
		elem.data('feedback', count);
			
		if( typeof parameter === 'string' ) {
			update( parameter );
		} else if( !parameter && elem[0] ) {
			remove( elem );
		}
		
		//add init and ability to change settings
		
	};
	
	// pluginify spinner
	$.fn.spin = function(opts) {
	  this.each(function() {
	    var $this = $(this),
	        data = $this.data();

	    if (data.spinner) {
	      data.spinner.stop();
	      delete data.spinner;
	    }
	    if (opts !== false) {
	      data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
	    }
	  });
	  return this;
	};	
	
	
	$.test = function() {
		var body = $('body')
		,	count = body.data('count') || 0;
		
		body.data('count', ++count);
		
		console.log(count);
		
	}
	
})( jQuery );