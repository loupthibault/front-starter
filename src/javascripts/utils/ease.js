const _HALF_PI  = Math.PI / 2;

module.exports = {

  //Linear
  linear: function (t) { return t },

  // Quad
  easeInQuad: function (t) { return t*t },
  easeOutQuad: function (t) { return t*(2-t) },
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },

  // Cubic
  easeInCubic: function (t) { return t*t*t },
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },

  // Quart
  easeInQuart: function (t) { return t*t*t*t },
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },

  // Quint
  easeInQuint: function (t) { return t*t*t*t*t },
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },

  // Expo
  easeInExpo: function (t) { return Math.pow(2, 10 * (t - 1)) - 0.001; },
  easeOutExpo:  function (t) { return 1 - Math.pow(2, -10 * t); },
  easeInOutExpo: function (t) { return ((t *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (t - 1)) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))); },

  // Circ
  easeInCirc: function (t) { return -(Math.sqrt(1 - (t * t)) - 1); },
  easeOutCirc:  function (t) { return Math.sqrt(1 - (t = t - 1) * t); },
  easeInOutCirc: function (t) { return ((t*=2) < 1) ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1); },

  // Sine
  easeInSine: function (t) { return -Math.cos(t * _HALF_PI) + 1; },
  easeOutSine:  function (t) { return Math.sin(t * _HALF_PI); },
  easeInOutSine: function (t) { return -0.5 * (Math.cos(Math.PI * t) - 1); }

}
