function slideshow(root_elem, first_elem, last_elem)
{
	this.root = root_elem;
	this.first = first_elem;
	this.cur = this.first;
	this.last = last_elem;

	/* Some aliases to SVG root element functions */
	this.pause = this.root.pauseAnimations;
	this.unpause = this.root.unpauseAnimations;
	this.is_paused = this.root.animationsPaused;
}

slideshow.prototype.seek = function (n)
{
	var that = this;
	var __seek = function(n, a, t) {
		/* 
		 * a is the *ElementSibling property moving in the
		 * direction specified by the sign of n.
		 *
		 * t is the last element in the given direction. 
		 */
		var next_elem = that.cur;

		for (; n > 0; n--) {
			if ((next_elem === t) || !next_elem[a])
				break;
			next_elem = next_elem[a];
		}
		if (that.cur != next_elem) {
			that.cur.setAttributeNS(null, "display", "none");
			that.cur = next_elem;
			that.cur.setAttributeNS(null, "display", "inline");
			that.root.setCurrentTime(0);
		}
	}

	n = n || 1;
	if (n > 0) {
		__seek(n, "nextElementSibling", this.last);
	} else if (n < 0) {
		__seek(-n, "previousElementSibling", this.first);
	}
}

slideshow.prototype.toggle_pause = function ()
{
	if (this.root.animationsPaused()) {
		this.root.pauseAnimations();
	} else {
		this.root.unpauseAnimations();
	}
}

/*
 * An example of how to initialize a slideshow object
 */
var ss;

function init_globals()
{
	var r;

	if (!window.document || !window.document.documentElement)
		return;
	r = window.document.documentElement;
	ss = new slideshow(r, r.getElementById("slideshow-first"),
			  r.getElementById("slideshow-last"));
}
