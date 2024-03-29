var Konami=function(){var a={addEvent:function(b,c,d,e){if(b.addEventListener)b.addEventListener(c,d,false);else if(b.attachEvent){b["e"+c+d]=d;b[c+d]=function(){b["e"+c+d](window.event,e)};b.attachEvent("on"+c,b[c+d])}},input:"",pattern:"3838404037393739666513",load:function(b){this.addEvent(document,"keydown",function(c,d){if(d)a=d;a.input+=c?c.keyCode:event.keyCode;if(a.input.length>a.pattern.length)a.input=a.input.substr(a.input.length-a.pattern.length);if(a.input==a.pattern){a.code(b);a.input=
""}},this);this.iphone.load(b)},code:function(b){window.location=b},iphone:{start_x:0,start_y:0,stop_x:0,stop_y:0,tap:false,capture:false,orig_keys:"",keys:["UP","UP","DOWN","DOWN","LEFT","RIGHT","LEFT","RIGHT","TAP","TAP","TAP"],code:function(b){a.code(b)},load:function(b){this.orig_keys=this.keys;a.addEvent(document,"touchmove",function(c){if(c.touches.length==1&&a.iphone.capture==true){c=c.touches[0];a.iphone.stop_x=c.pageX;a.iphone.stop_y=c.pageY;a.iphone.tap=false;a.iphone.capture=false;a.iphone.check_direction()}});
a.addEvent(document,"touchend",function(){a.iphone.tap==true&&a.iphone.check_direction(b)},false);a.addEvent(document,"touchstart",function(c){a.iphone.start_x=c.changedTouches[0].pageX;a.iphone.start_y=c.changedTouches[0].pageY;a.iphone.tap=true;a.iphone.capture=true})},check_direction:function(b){x_magnitude=Math.abs(this.start_x-this.stop_x);y_magnitude=Math.abs(this.start_y-this.stop_y);x=this.start_x-this.stop_x<0?"RIGHT":"LEFT";y=this.start_y-this.stop_y<0?"DOWN":"UP";result=x_magnitude>y_magnitude?
x:y;result=this.tap==true?"TAP":result;if(result==this.keys[0])this.keys=this.keys.slice(1,this.keys.length);if(this.keys.length==0){this.keys=this.orig_keys;this.code(b)}}}};return a};

konami = new Konami();
konami.code = function() {
	$('body').toggleClass('konami');
};
konami.load();

$(function() {

	if (window.location.hash === '#contact') {
		$('.card').addClass('flip');
	}

	$('.logo').on('click', function(e) {
		e.preventDefault();
		window.location.hash = $(this).data('hash') || '';
		$('.card').toggleClass('flip');
	});

	$('form').on('submit', function(e) {
		e.preventDefault();
		var $heading = $('.back.face h1')
		,	$postmark = $('.postmark')
		,	$sendButton = $('input.send')
		;

		$heading.find('span').remove();
		$postmark.removeClass('sent');
		$sendButton.hide();

		$.ajax({
			url: 'contact.php',
			type: 'POST',
			data: {
				name: $('input[name=name]', this).val(),
				email: $('input[name=email]', this).val(),
				message: $('textarea[name=message]', this).val()
			},
			success: function(data, textStatus, jqXHR) {
				$heading.append('<span>'+jqXHR.responseText+'</span>');
				$('.postmark').addClass('sent');
				$('input[type=text], input[type=email], textarea').val('');
			},
			error: function(jqXHR, textStatus, errorThrown) {
				$heading.append('<span class="error">'+jqXHR.responseText+'</span>');
			},
			complete: function(jqXHR, textStatus) {
				$('input.send').show();
			}
		});
	});

});