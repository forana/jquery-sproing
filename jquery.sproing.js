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
	// store some config into the element itself
	if (!el.sproing)
	{
		el.sproing={};

		// get the text node and remove it
		var textNode = this.contents().get(0);
		var text = textNode.textContent;
		textNode.parentNode.removeChild(textNode);

		// add each letter into the container of the previous letter
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
				// assign styles
				.css("display","inline-block")
				.css("position","relative");
			currentParent.append(letterElement);
			currentParent=letterElement;
			el.sproing.letters.push(letterElement);
		}
	}

	// sproingooingiongionginiongiongoignogingoingoingg
	el.sproing.velocity = sproing.INITIAL_VELOCITY;
	if (!el.sproing.interval)
	{
		el.sproing.interval = setInterval(function() {
			// if we're ready to die...
			if (Math.abs(el.sproing.velocity)<sproing.TERMINAL_VELOCITY)
			{
				// set back to zero so that some letter isn't randomly off by a pixel
				for (var i=0; i<el.sproing.letters.length; i++)
				{
					el.sproing.letters[i].css("top","0px");
				}
				el.sproing.velocity=0;
				// stop sproinging
				clearInterval(el.sproing.interval);
				el.sproing.interval=false;
			}
			else
			{
				// figure out the max height
				var velchunk = el.sproing.velocity/el.sproing.letters.length;
				for (var i=0; i<el.sproing.letters.length; i++)
				{
					// assign the letter a vertical distance away from where it should be based on that max height.
					el.sproing.letters[i].css("top",velchunk*i+"px");
				}
				// multiplying by a negative multiplier makes the magic happen
				el.sproing.velocity*=-sproing.DECAY_MULTIPLIER; // did you know *=- looks like a rocket when you're sleepy?
			}
		},sproing.TICK_DELAY);
	}
};