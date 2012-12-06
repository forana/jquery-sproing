/*
2012 Alex Foran
written for no real reason at all
*/

// Configuration - you might as well hardcode these if you want to change them.
sproing = {
	// ms between 'ticks' of the animation
	TICK_DELAY: 50,
	// initial ending offset, in pixels
	INITIAL_VELOCITY: 50.0,
	// multiplier for slowdown
	DECAY_MULTIPLIER: 0.9,
	// number of pixels under which to stop animating
	TERMINAL_VELOCITY: 0.1
};

$.fn.sproing = function() {
	var el = this.get(0);
	if (!el.sproing)
	{
		el.sproing={};
		var textNode = this.contents().get(0);
		var text = textNode.textContent;
		textNode.parentNode.removeChild(textNode);

		var currentParent=this;
		el.sproing.letters = [];
		for (var i=0; i<text.length; i++)
		{
			var letter = text[i];
			if (letter==" ")
			{
				letter="&nbsp;";
			}
			var letterElement = $("<div class='sproing'>"+letter+"</div>")
				.css("display","inline-block")
				.css("position","relative");
			currentParent.append(letterElement);
			currentParent=letterElement;
			el.sproing.letters.push(letterElement);
		}
	}

	el.sproing.velocity = sproing.INITIAL_VELOCITY;
	if (!el.sproing.interval)
	{
		el.sproing.interval = setInterval(function() {
			if (Math.abs(el.sproing.velocity)<sproing.TERMINAL_VELOCITY)
			{
				for (var i=0; i<el.sproing.letters.length; i++)
				{
					el.sproing.letters[i].css("top","0px");
				}
				el.sproing.velocity=0;
				clearInterval(el.sproing.interval);
				el.sproing.interval=false;
			}
			else
			{
				var velchunk = el.sproing.velocity/el.sproing.letters.length;
				for (var i=0; i<el.sproing.letters.length; i++)
				{
					el.sproing.letters[i].css("top",velchunk*i+"px");
				}
				el.sproing.velocity*=-sproing.DECAY_MULTIPLIER;
			}
		},sproing.TICK_DELAY);
	}
};