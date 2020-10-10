(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":6}],2:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":1,"./_getRawTag":4,"./_objectToString":5}],3:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":1}],5:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],6:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":3}],7:[function(require,module,exports){
var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

},{"./isObject":8,"./now":11,"./toNumber":13}],8:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],9:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],10:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":2,"./isObjectLike":9}],11:[function(require,module,exports){
var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

},{"./_root":6}],12:[function(require,module,exports){
var debounce = require('./debounce'),
    isObject = require('./isObject');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;

},{"./debounce":7,"./isObject":8}],13:[function(require,module,exports){
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":8,"./isSymbol":10}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ScrollWatch", {
  enumerable: true,
  get: function get() {
    return _ScrollWatch["default"];
  }
});
Object.defineProperty(exports, "EnterView", {
  enumerable: true,
  get: function get() {
    return _EnterView["default"];
  }
});

var _ScrollWatch = _interopRequireDefault(require("./js/ScrollWatch"));

var _EnterView = _interopRequireDefault(require("./js/EnterView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./js/EnterView":15,"./js/ScrollWatch":19}],15:[function(require,module,exports){
"use strict";

var _index = _interopRequireDefault(require("./inView/index.js"));

var _index2 = _interopRequireDefault(require("./Houdini/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _index["default"])('section').on('enter', function (el) {
  el.classList.add("will-change");
}).on('exit', function (el) {
  el.classList.remove("will-change");
});
(0, _index["default"])('[data-houdini]', {
  top: -200,
  bottom: 200
}).on('enter', function (el) {
  el.classList.add("active");
}).on('exit', function (el) {
  el.classList.remove("active");
});
(0, _index2["default"])('[data-pinokio]');

},{"./Houdini/index.js":17,"./inView/index.js":21}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _registry = _interopRequireDefault(require("./registry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
* Create and return the inView function.
*/
var Houdini = function Houdini() {
  /**
  * Fallback if window is undefined.
  */
  if (typeof window === 'undefined') return;
  /**
  * How often and on what events we should check
  * each registry.
  */

  var interval = 60;
  var triggers = ['scroll', 'resize', 'load'];
  /**
  * Maintain a hashmap of all registries, a history
  * of selectors to enumerate.
  */

  var selectors = {
    history: []
  };
  /**
  * Check each registry from selector history,
  * throttled to interval.
  */

  var check = (0, _throttle["default"])(function () {
    selectors.history.forEach(function (selector) {
      selectors[selector].check();
    });
  }, interval);
  /**
  * For each trigger event on window, add a listener
  * which checks each registry.
  */

  triggers.forEach(function (event) {
    return addEventListener(event, check);
  });
  /**
  * If supported, use MutationObserver to watch the
  * DOM and run checks on mutation.
  */

  if (window.MutationObserver) {
    addEventListener('DOMContentLoaded', function () {
      new MutationObserver(check).observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true
      });
    });
  }
  /**
  * The main interface. Take a selector and retrieve
  * the associated registry or create a new one.
  */


  var control = function control(selector) {
    if (typeof selector !== 'string') return; // Get an up-to-date list of elements.

    var elements = [].slice.call(document.querySelectorAll(selector)); // If the registry exists, update the elements.

    if (selectors.history.indexOf(selector) > -1) {
      selectors[selector].elements = elements;
    } // If it doesn't exist, create a new registry.
    else {
        selectors[selector] = (0, _registry["default"])({
          elements: elements,
          selector: selector
        });
        selectors.history.push(selector);
      }

    return selectors[selector];
  };

  return control;
}; // Export a singleton.


var _default = Houdini();

exports["default"] = _default;

},{"./registry":18,"lodash/throttle":12}],17:[function(require,module,exports){
"use strict";

var _houdini = _interopRequireDefault(require("./houdini.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = _houdini["default"];

},{"./houdini.js":16}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* - Registry -
*
* Maintain a list of elements, a subset which currently pass
* a given criteria, and fire events when elements move in or out.
*/
var HoudiniRegistry = /*#__PURE__*/function () {
  function HoudiniRegistry(_ref) {
    var _this = this;

    var elements = _ref.elements,
        selector = _ref.selector;

    _classCallCheck(this, HoudiniRegistry);

    this.elements = elements;
    this.intersections = [];
    this.selector = selector.replace('[', '').replace(']', '');
    this.elements.forEach(function (el) {
      var attr = el.getAttribute(_this.selector);
      el.intersections = _this.decodeHoudini(attr);
    });
  }

  _createClass(HoudiniRegistry, [{
    key: "decodeHoudini",
    value: function decodeHoudini(attr) {
      var intersections = [];
      var list = attr.replaceAll(' ', '').split(',');
      console.log(list);
      list.forEach(function (l) {
        var _l$split = l.split('['),
            _l$split2 = _slicedToArray(_l$split, 2),
            scroll = _l$split2[0],
            action = _l$split2[1];

        var _scroll$split = scroll.split('->'),
            _scroll$split2 = _slicedToArray(_scroll$split, 2),
            from = _scroll$split2[0],
            to = _scroll$split2[1];

        action = action.replace(']', '');
        var intersection = {
          top: parseInt(from) / 100.0,
          bottom: parseInt(to) / 100.0,
          distance: (parseInt(to) - parseInt(from)) / 100.0
        };

        var _action$split = action.split('='),
            _action$split2 = _slicedToArray(_action$split, 2),
            dim = _action$split2[0],
            values = _action$split2[1];

        var _values$split = values.split('->'),
            _values$split2 = _slicedToArray(_values$split, 2),
            xfrom = _values$split2[0],
            xto = _values$split2[1];

        intersection["".concat(dim, "s")] = parseInt(xfrom);
        intersection["".concat(dim, "e")] = parseInt(xto);
        intersection["".concat(dim, "d")] = parseInt(xto) - parseInt(xfrom);
        intersections.push(intersection);
      });
      return intersections;
    }
    /**
    * Check each element in the registry, if an element
    * changes states, fire an event and operate on current.
    */

  }, {
    key: "check",
    value: function check() {
      this.elements.forEach(function (el) {
        var cl = el.closest('section');
        var clrect = cl.getBoundingClientRect();

        var _el$getBoundingClient = el.getBoundingClientRect(),
            top = _el$getBoundingClient.top,
            bottom = _el$getBoundingClient.bottom,
            width = _el$getBoundingClient.width,
            height = _el$getBoundingClient.height;

        var sY = window.scrollY;
        var wH = window.innerHeight;
        var sH = clrect.height;
        var sT = clrect.top;
        var oT = cl.offsetTop;
        var tD = wH + sH;
        var sC = -(oT - wH - sY);
        var cF = Math.max(Math.min(sC / (wH + sH), 1), 0);
        var swTop = sT + wH;
        var intersections = el.intersections; // intersections.push({
        //     top     : .41,
        //     bottom  : .60,
        //     distance: .19,
        //     pxs     :   0,
        //     pxe     :  25,
        //     pxd     :  25,
        // })

        var xv = 0;
        var yv = 0;
        var sc = 1;
        var rt = 0;
        intersections.forEach(function (i) {
          var relF = (cF - i.top) / i.distance;
          var scrollFactor = (cF - i.top) / i.distance;

          if (i.pxs !== undefined) {
            xv = i.pxs;

            if (cF > i.top && cF < i.bottom) {
              xv = i.pxs + relF * i.pxd;
            } else if (cF > i.bottom) {
              xv = i.pxe;
            }
          }

          if (i.pys !== undefined) {
            yv = i.pys;

            if (cF > i.top && cF < i.bottom) {
              yv = i.pys + relF * i.pyd;
            } else if (cF > i.bottom) {
              yv = i.pye;
            }
          }

          if (i.rts !== undefined) {
            rt = i.rts;

            if (cF > i.top && cF < i.bottom) {
              rt = i.rts + relF * i.rtd;
            } else if (cF > i.bottom) {
              rt = i.rte;
            }
          } // if (i.scs !== undefined){
          //     sc= i.scs
          //     if ((cF > i.top) && (cF < i.bottom)){
          //         sc= i.scs + relF * i.scd
          //     }else if ( cF > i.bottom ) {
          //         sc= i.sce
          //     }
          // }

        });
        var t = "rotate(".concat(rt, "deg) translate(").concat(xv, "vw,").concat(yv, "vh) ");
        el.style.transform = t;
      });
      return this;
    }
  }]);

  return HoudiniRegistry;
}();

var _default = function _default(elements) {
  return new HoudiniRegistry(elements);
};

exports["default"] = _default;

},{}],19:[function(require,module,exports){
"use strict";

window.addEventListener('scroll', function (e) {
  var body = document.querySelector('body'); // console.log( window.scrollY )

  if (window.scrollY) {
    body.classList.remove("at-top");
    body.classList.add("is-scrolled");
  } else {
    body.classList.add("at-top");
    body.classList.remove("is-scrolled");
  }
});

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _registry = _interopRequireDefault(require("./registry"));

var _viewport = require("./viewport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
* Create and return the inView function.
*/
var inView = function inView() {
  /**
  * Fallback if window is undefined.
  */
  if (typeof window === 'undefined') return;
  /**
  * How often and on what events we should check
  * each registry.
  */

  var interval = 100;
  var triggers = ['scroll', 'resize', 'load'];
  /**
  * Maintain a hashmap of all registries, a history
  * of selectors to enumerate, and an options object.
  */

  var selectors = {
    history: []
  };
  var options = {
    offset: {},
    threshold: 0,
    test: _viewport.inViewport
  };
  /**
  * Check each registry from selector history,
  * throttled to interval.
  */

  var check = (0, _throttle["default"])(function () {
    selectors.history.forEach(function (selector) {
      selectors[selector].check();
    });
  }, interval);
  /**
  * For each trigger event on window, add a listener
  * which checks each registry.
  */

  triggers.forEach(function (event) {
    return addEventListener(event, check);
  });
  /**
  * If supported, use MutationObserver to watch the
  * DOM and run checks on mutation.
  */

  if (window.MutationObserver) {
    addEventListener('DOMContentLoaded', function () {
      new MutationObserver(check).observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true
      });
    });
  }
  /**
  * The main interface. Take a selector and retrieve
  * the associated registry or create a new one.
  */


  var control = function control(selector, settings) {
    if (typeof selector !== 'string') return; // Get an up-to-date list of elements.

    var elements = [].slice.call(document.querySelectorAll(selector)); // If the registry exists, update the elements.

    if (selectors.history.indexOf(selector) > -1) {
      selectors[selector].elements = elements;
    } // If it doesn't exist, create a new registry.
    else {
        var localOptions = options;

        if (settings) {
          localOptions.offset.top = settings.top ? settings.top : options.offset.top;
          localOptions.offset.bottom = settings.bottom ? settings.bottom : options.offset.bottom;
        }

        selectors[selector] = (0, _registry["default"])(elements, options);
        selectors.history.push(selector);
      }

    return selectors[selector];
  };
  /**
  * Mutate the offset object with either an object
  * or a number.
  */


  control.offset = function (o) {
    if (o === undefined) return options.offset;

    var isNum = function isNum(n) {
      return typeof n === 'number';
    };

    ['top', 'right', 'bottom', 'left'].forEach(isNum(o) ? function (dim) {
      return options.offset[dim] = o;
    } : function (dim) {
      return isNum(o[dim]) ? options.offset[dim] = o[dim] : null;
    });
    return options.offset;
  };
  /**
  * Set the threshold with a number.
  */


  control.threshold = function (n) {
    return typeof n === 'number' && n >= 0 && n <= 1 ? options.threshold = n : options.threshold;
  };
  /**
  * Use a custom test, overriding inViewport, to
  * determine element visibility.
  */


  control.test = function (fn) {
    return typeof fn === 'function' ? options.test = fn : options.test;
  };
  /**
  * Add proxy for test function, set defaults,
  * and return the interface.
  */


  control.is = function (el) {
    return options.test(el, options);
  };

  control.offset(0);
  return control;
}; // Export a singleton.


var _default = inView();

exports["default"] = _default;

},{"./registry":22,"./viewport":23,"lodash/throttle":12}],21:[function(require,module,exports){
"use strict";

var _inView = _interopRequireDefault(require("./in-view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = _inView["default"];

},{"./in-view.js":20}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* - Registry -
*
* Maintain a list of elements, a subset which currently pass
* a given criteria, and fire events when elements move in or out.
*/
var inViewRegistry = /*#__PURE__*/function () {
  function inViewRegistry(elements, options) {
    _classCallCheck(this, inViewRegistry);

    this.options = options;
    this.elements = elements;
    this.current = [];
    this.handlers = {
      enter: [],
      exit: []
    };
    this.singles = {
      enter: [],
      exit: []
    };
  }
  /**
  * Check each element in the registry, if an element
  * changes states, fire an event and operate on current.
  */


  _createClass(inViewRegistry, [{
    key: "check",
    value: function check() {
      var _this = this;

      this.elements.forEach(function (el) {
        var passes = _this.options.test(el, _this.options);

        var index = _this.current.indexOf(el);

        var current = index > -1;
        var entered = passes && !current;
        var exited = !passes && current;

        if (entered) {
          _this.current.push(el);

          _this.emit('enter', el);
        }

        if (exited) {
          _this.current.splice(index, 1);

          _this.emit('exit', el);
        }
      });
      return this;
    }
    /**
    * Register a handler for event, to be fired
    * for every event.
    */

  }, {
    key: "on",
    value: function on(event, handler) {
      this.handlers[event].push(handler);
      return this;
    }
    /**
    * Register a handler for event, to be fired
    * once and removed.
    */

  }, {
    key: "once",
    value: function once(event, handler) {
      this.singles[event].unshift(handler);
      return this;
    }
    /**
    * Emit event on given element. Used mostly
    * internally, but could be useful for users.
    */

  }, {
    key: "emit",
    value: function emit(event, element) {
      while (this.singles[event].length) {
        this.singles[event].pop()(element);
      }

      var length = this.handlers[event].length;

      while (--length > -1) {
        this.handlers[event][length](element);
      }

      return this;
    }
  }]);

  return inViewRegistry;
}();

var _default = function _default(elements, options) {
  return new inViewRegistry(elements, options);
};

exports["default"] = _default;

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inViewport = inViewport;

/**
* Check whether an element is in the viewport by
* more than offset px.
*/
function inViewport(element, options) {
  var _element$getBoundingC = element.getBoundingClientRect(),
      top = _element$getBoundingC.top,
      right = _element$getBoundingC.right,
      bottom = _element$getBoundingC.bottom,
      left = _element$getBoundingC.left,
      width = _element$getBoundingC.width,
      height = _element$getBoundingC.height;

  var intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right
  };
  var threshold = {
    x: options.threshold * width,
    y: options.threshold * height
  };
  return intersection.t > options.offset.top + threshold.y && intersection.r > options.offset.right + threshold.x && intersection.b > options.offset.bottom + threshold.y && intersection.l > options.offset.left + threshold.x;
}

},{}]},{},[14])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX29iamVjdFRvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvZGVib3VuY2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzU3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9ub3cuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3Rocm90dGxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC90b051bWJlci5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9qcy9FbnRlclZpZXcuanMiLCJzcmMvanMvSG91ZGluaS9ob3VkaW5pLmpzIiwic3JjL2pzL0hvdWRpbmkvaW5kZXguanMiLCJzcmMvanMvSG91ZGluaS9yZWdpc3RyeS5qcyIsInNyYy9qcy9TY3JvbGxXYXRjaC5qcyIsInNyYy9qcy9pblZpZXcvaW4tdmlldy5qcyIsInNyYy9qcy9pblZpZXcvaW5kZXguanMiLCJzcmMvanMvaW5WaWV3L3JlZ2lzdHJ5LmpzIiwic3JjL2pzL2luVmlldy92aWV3cG9ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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NkI7QUFBQSxNQUV0QixNQUZzQix5QkFFdEIsTUFGc0I7QUFBQSxNQUVkLElBRmMseUJBRWQsSUFGYztBQUFBLE1BRVIsS0FGUSx5QkFFUixLQUZRO0FBQUEsTUFFRCxNQUZDLHlCQUVELE1BRkM7O0FBSTFDLE1BQU0sWUFBWSxHQUFHO0FBQ2pCLElBQUEsQ0FBQyxFQUFFLE1BRGM7QUFFakIsSUFBQSxDQUFDLEVBQUUsTUFBTSxDQUFDLFVBQVAsR0FBb0IsSUFGTjtBQUdqQixJQUFBLENBQUMsRUFBRSxNQUFNLENBQUMsV0FBUCxHQUFxQixHQUhQO0FBSWpCLElBQUEsQ0FBQyxFQUFFO0FBSmMsR0FBckI7QUFPQSxNQUFNLFNBQVMsR0FBRztBQUNkLElBQUEsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxTQUFSLEdBQW9CLEtBRFQ7QUFFZCxJQUFBLENBQUMsRUFBRSxPQUFPLENBQUMsU0FBUixHQUFvQjtBQUZULEdBQWxCO0FBS0EsU0FBTyxZQUFZLENBQUMsQ0FBYixHQUFrQixPQUFPLENBQUMsTUFBUixDQUFlLEdBQWYsR0FBd0IsU0FBUyxDQUFDLENBQXBELElBQ0EsWUFBWSxDQUFDLENBQWIsR0FBa0IsT0FBTyxDQUFDLE1BQVIsQ0FBZSxLQUFmLEdBQXdCLFNBQVMsQ0FBQyxDQURwRCxJQUVBLFlBQVksQ0FBQyxDQUFiLEdBQWtCLE9BQU8sQ0FBQyxNQUFSLENBQWUsTUFBZixHQUF3QixTQUFTLENBQUMsQ0FGcEQsSUFHQSxZQUFZLENBQUMsQ0FBYixHQUFrQixPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsR0FBd0IsU0FBUyxDQUFDLENBSDNEO0FBS0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGdldFJhd1RhZyA9IHJlcXVpcmUoJy4vX2dldFJhd1RhZycpLFxuICAgIG9iamVjdFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fb2JqZWN0VG9TdHJpbmcnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUdldFRhZztcbiIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFRvU3RyaW5nO1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIG5vdyA9IHJlcXVpcmUoJy4vbm93JyksXG4gICAgdG9OdW1iZXIgPSByZXF1aXJlKCcuL3RvTnVtYmVyJyk7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICB0aW1lV2FpdGluZyA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmdcbiAgICAgID8gbmF0aXZlTWluKHRpbWVXYWl0aW5nLCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSlcbiAgICAgIDogdGltZVdhaXRpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTeW1ib2w7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBub3c7XG4iLCJ2YXIgZGVib3VuY2UgPSByZXF1aXJlKCcuL2RlYm91bmNlJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRocm90dGxlZCBmdW5jdGlvbiB0aGF0IG9ubHkgaW52b2tlcyBgZnVuY2AgYXQgbW9zdCBvbmNlIHBlclxuICogZXZlcnkgYHdhaXRgIG1pbGxpc2Vjb25kcy4gVGhlIHRocm90dGxlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGBcbiAqIG1ldGhvZCB0byBjYW5jZWwgZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG9cbiAqIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYFxuICogc2hvdWxkIGJlIGludm9rZWQgb24gdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YFxuICogdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZVxuICogdGhyb3R0bGVkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50IGNhbGxzIHRvIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gcmV0dXJuIHRoZVxuICogcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLnRocm90dGxlYCBhbmQgYF8uZGVib3VuY2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gdGhyb3R0bGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgaW52b2NhdGlvbnMgdG8uXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBleGNlc3NpdmVseSB1cGRhdGluZyB0aGUgcG9zaXRpb24gd2hpbGUgc2Nyb2xsaW5nLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsIF8udGhyb3R0bGUodXBkYXRlUG9zaXRpb24sIDEwMCkpO1xuICpcbiAqIC8vIEludm9rZSBgcmVuZXdUb2tlbmAgd2hlbiB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWQsIGJ1dCBub3QgbW9yZSB0aGFuIG9uY2UgZXZlcnkgNSBtaW51dGVzLlxuICogdmFyIHRocm90dGxlZCA9IF8udGhyb3R0bGUocmVuZXdUb2tlbiwgMzAwMDAwLCB7ICd0cmFpbGluZyc6IGZhbHNlIH0pO1xuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIHRocm90dGxlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyB0aHJvdHRsZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRocm90dGxlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsZWFkaW5nID0gdHJ1ZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwge1xuICAgICdsZWFkaW5nJzogbGVhZGluZyxcbiAgICAnbWF4V2FpdCc6IHdhaXQsXG4gICAgJ3RyYWlsaW5nJzogdHJhaWxpbmdcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGU7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b051bWJlcjtcbiIsImltcG9ydCBTY3JvbGxXYXRjaCBmcm9tICcuL2pzL1Njcm9sbFdhdGNoJ1xuaW1wb3J0IEVudGVyVmlldyAgIGZyb20gJy4vanMvRW50ZXJWaWV3J1xuXG5leHBvcnQgeyBTY3JvbGxXYXRjaCB9XG5leHBvcnQgeyBFbnRlclZpZXcgfVxuIiwiaW1wb3J0IGluVmlldyAgZnJvbSAnLi9pblZpZXcvaW5kZXguanMnXG5pbXBvcnQgSG91ZGluaSBmcm9tICcuL0hvdWRpbmkvaW5kZXguanMnXG5cbmluVmlldygnc2VjdGlvbicpXG5cdC5vbignZW50ZXInLCBlbCA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJ3aWxsLWNoYW5nZVwiKTtcbiAgICB9KVxuXHQub24oJ2V4aXQnLCBlbCA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJ3aWxsLWNoYW5nZVwiKTtcbiAgICB9KVxuXG5pblZpZXcoJ1tkYXRhLWhvdWRpbmldJywgeyB0b3A6IC0yMDAsIGJvdHRvbTogMjAwIH0pXG5cdC5vbignZW50ZXInLCBlbCA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgfSlcblx0Lm9uKCdleGl0JywgZWwgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIH0pXG5cblxuSG91ZGluaSgnW2RhdGEtcGlub2tpb10nKSIsImltcG9ydCB0aHJvdHRsZSAgICAgICBmcm9tICdsb2Rhc2gvdGhyb3R0bGUnXG5pbXBvcnQgUmVnaXN0cnkgICAgICAgZnJvbSAnLi9yZWdpc3RyeSdcblxuLyoqXG4qIENyZWF0ZSBhbmQgcmV0dXJuIHRoZSBpblZpZXcgZnVuY3Rpb24uXG4qL1xuY29uc3QgSG91ZGluaSA9ICgpID0+IHtcblxuICAgIC8qKlxuICAgICogRmFsbGJhY2sgaWYgd2luZG93IGlzIHVuZGVmaW5lZC5cbiAgICAqL1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuXG5cbiAgICAvKipcbiAgICAqIEhvdyBvZnRlbiBhbmQgb24gd2hhdCBldmVudHMgd2Ugc2hvdWxkIGNoZWNrXG4gICAgKiBlYWNoIHJlZ2lzdHJ5LlxuICAgICovXG4gICAgY29uc3QgaW50ZXJ2YWwgPSA2MDtcbiAgICBjb25zdCB0cmlnZ2VycyA9IFsnc2Nyb2xsJywgJ3Jlc2l6ZScsICdsb2FkJ11cblxuICAgIC8qKlxuICAgICogTWFpbnRhaW4gYSBoYXNobWFwIG9mIGFsbCByZWdpc3RyaWVzLCBhIGhpc3RvcnlcbiAgICAqIG9mIHNlbGVjdG9ycyB0byBlbnVtZXJhdGUuXG4gICAgKi9cbiAgICBsZXQgc2VsZWN0b3JzID0geyBoaXN0b3J5OiBbXSB9O1xuXG4gICAgLyoqXG4gICAgKiBDaGVjayBlYWNoIHJlZ2lzdHJ5IGZyb20gc2VsZWN0b3IgaGlzdG9yeSxcbiAgICAqIHRocm90dGxlZCB0byBpbnRlcnZhbC5cbiAgICAqL1xuICAgIGNvbnN0IGNoZWNrID0gdGhyb3R0bGUoKCkgPT4ge1xuICAgICAgICBzZWxlY3RvcnMuaGlzdG9yeS5mb3JFYWNoKHNlbGVjdG9yID0+IHtcbiAgICAgICAgICAgIHNlbGVjdG9yc1tzZWxlY3Rvcl0uY2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfSwgaW50ZXJ2YWwpO1xuXG4gICAgLyoqXG4gICAgKiBGb3IgZWFjaCB0cmlnZ2VyIGV2ZW50IG9uIHdpbmRvdywgYWRkIGEgbGlzdGVuZXJcbiAgICAqIHdoaWNoIGNoZWNrcyBlYWNoIHJlZ2lzdHJ5LlxuICAgICovXG4gICAgdHJpZ2dlcnMuZm9yRWFjaChldmVudCA9PlxuICAgICAgICBhZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjaGVjaykpO1xuXG4gICAgLyoqXG4gICAgKiBJZiBzdXBwb3J0ZWQsIHVzZSBNdXRhdGlvbk9ic2VydmVyIHRvIHdhdGNoIHRoZVxuICAgICogRE9NIGFuZCBydW4gY2hlY2tzIG9uIG11dGF0aW9uLlxuICAgICovXG4gICAgaWYgKHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBuZXcgTXV0YXRpb25PYnNlcnZlcihjaGVjaylcbiAgICAgICAgICAgICAgICAub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFRoZSBtYWluIGludGVyZmFjZS4gVGFrZSBhIHNlbGVjdG9yIGFuZCByZXRyaWV2ZVxuICAgICogdGhlIGFzc29jaWF0ZWQgcmVnaXN0cnkgb3IgY3JlYXRlIGEgbmV3IG9uZS5cbiAgICAqL1xuICAgIGxldCBjb250cm9sID0gKHNlbGVjdG9yKSA9PiB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHJldHVybjtcblxuICAgICAgICAvLyBHZXQgYW4gdXAtdG8tZGF0ZSBsaXN0IG9mIGVsZW1lbnRzLlxuICAgICAgICBsZXQgZWxlbWVudHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuXG5cbiAgICAgICAgLy8gSWYgdGhlIHJlZ2lzdHJ5IGV4aXN0cywgdXBkYXRlIHRoZSBlbGVtZW50cy5cbiAgICAgICAgaWYgKHNlbGVjdG9ycy5oaXN0b3J5LmluZGV4T2Yoc2VsZWN0b3IpID4gLTEpIHtcbiAgICAgICAgICAgIHNlbGVjdG9yc1tzZWxlY3Rvcl0uZWxlbWVudHMgPSBlbGVtZW50c1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgaXQgZG9lc24ndCBleGlzdCwgY3JlYXRlIGEgbmV3IHJlZ2lzdHJ5LlxuICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgc2VsZWN0b3JzW3NlbGVjdG9yXSA9IFJlZ2lzdHJ5KHtlbGVtZW50cywgc2VsZWN0b3J9KVxuICAgICAgICAgICAgc2VsZWN0b3JzLmhpc3RvcnkucHVzaChzZWxlY3RvcilcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yc1tzZWxlY3Rvcl1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbnRyb2xcblxufTtcblxuLy8gRXhwb3J0IGEgc2luZ2xldG9uLlxuZXhwb3J0IGRlZmF1bHQgSG91ZGluaSgpXG4iLCJpbXBvcnQgSG91ZGluaSBmcm9tICcuL2hvdWRpbmkuanMnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvdWRpbmk7XG4iLCIvKipcbiogLSBSZWdpc3RyeSAtXG4qXG4qIE1haW50YWluIGEgbGlzdCBvZiBlbGVtZW50cywgYSBzdWJzZXQgd2hpY2ggY3VycmVudGx5IHBhc3NcbiogYSBnaXZlbiBjcml0ZXJpYSwgYW5kIGZpcmUgZXZlbnRzIHdoZW4gZWxlbWVudHMgbW92ZSBpbiBvciBvdXQuXG4qL1xuXG5jbGFzcyBIb3VkaW5pUmVnaXN0cnkge1xuXG4gICAgY29uc3RydWN0b3Ioe2VsZW1lbnRzLCBzZWxlY3Rvcn0pIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzXG4gICAgICAgIHRoaXMuaW50ZXJzZWN0aW9ucyA9IFtdXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3Rvci5yZXBsYWNlKCdbJywnJykucmVwbGFjZSgnXScsJycpXG5cbiAgICAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHIgPSBlbC5nZXRBdHRyaWJ1dGUodGhpcy5zZWxlY3RvcilcbiAgICAgICAgICAgIGVsLmludGVyc2VjdGlvbnMgPSB0aGlzLmRlY29kZUhvdWRpbmkoYXR0cilcbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIGRlY29kZUhvdWRpbmkoYXR0cil7XG4gICAgICAgIGxldCBpbnRlcnNlY3Rpb25zID0gW11cblxuICAgICAgICBjb25zdCBsaXN0ID0gYXR0ci5yZXBsYWNlQWxsKCcgJywnJykuc3BsaXQoJywnKVxuICAgICAgICBjb25zb2xlLmxvZyhsaXN0KVxuXG4gICAgICAgIGxpc3QuZm9yRWFjaCgobCk9PntcblxuICAgICAgICAgICAgbGV0IFtzY3JvbGwsIGFjdGlvbl0gPSBsLnNwbGl0KCdbJylcbiAgICAgICAgICAgIGxldCBbZnJvbSwgdG9dID0gc2Nyb2xsLnNwbGl0KCctPicpXG4gICAgICAgICAgICBhY3Rpb249IGFjdGlvbi5yZXBsYWNlKCddJywnJylcblxuICAgICAgICAgICAgbGV0IGludGVyc2VjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB0b3AgICAgIDogcGFyc2VJbnQoZnJvbSkgLyAxMDAuMCxcbiAgICAgICAgICAgICAgICBib3R0b20gIDogcGFyc2VJbnQodG8pICAgLyAxMDAuMCxcbiAgICAgICAgICAgICAgICBkaXN0YW5jZTogKHBhcnNlSW50KHRvKSAtIHBhcnNlSW50KGZyb20pKSAvIDEwMC4wLFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgW2RpbSwgdmFsdWVzXSA9IGFjdGlvbi5zcGxpdCgnPScpXG4gICAgICAgICAgICBsZXQgW3hmcm9tLCB4dG9dID0gdmFsdWVzLnNwbGl0KCctPicpXG5cbiAgICAgICAgICAgIGludGVyc2VjdGlvbltgJHtkaW19c2BdID0gcGFyc2VJbnQoeGZyb20pXG4gICAgICAgICAgICBpbnRlcnNlY3Rpb25bYCR7ZGltfWVgXSA9IHBhcnNlSW50KHh0bylcbiAgICAgICAgICAgIGludGVyc2VjdGlvbltgJHtkaW19ZGBdID0gcGFyc2VJbnQoeHRvKSAtIHBhcnNlSW50KHhmcm9tKVxuXG4gICAgICAgICAgICBpbnRlcnNlY3Rpb25zLnB1c2goaW50ZXJzZWN0aW9uKVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGludGVyc2VjdGlvbnNcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIENoZWNrIGVhY2ggZWxlbWVudCBpbiB0aGUgcmVnaXN0cnksIGlmIGFuIGVsZW1lbnRcbiAgICAqIGNoYW5nZXMgc3RhdGVzLCBmaXJlIGFuIGV2ZW50IGFuZCBvcGVyYXRlIG9uIGN1cnJlbnQuXG4gICAgKi9cbiAgICBjaGVjaygpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblxuICAgICAgICAgICAgbGV0IGNsPSBlbC5jbG9zZXN0KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICBjb25zdCBjbHJlY3Q9IGNsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgY29uc3QgeyB0b3AsIGJvdHRvbSwgd2lkdGgsIGhlaWdodCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNZID0gd2luZG93LnNjcm9sbFlcbiAgICAgICAgICAgIGNvbnN0IHdIID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICBjb25zdCBzSCA9IGNscmVjdC5oZWlnaHRcbiAgICAgICAgICAgIGNvbnN0IHNUID0gY2xyZWN0LnRvcFxuICAgICAgICAgICAgY29uc3Qgb1QgPSBjbC5vZmZzZXRUb3BcbiAgICAgICAgICAgIGNvbnN0IHREID0gd0ggKyBzSFxuXG4gICAgICAgICAgICBjb25zdCBzQyA9IC0ob1Qtd0gtc1kpXG4gICAgICAgICAgICBjb25zdCBjRiA9IE1hdGgubWF4KE1hdGgubWluKHNDIC8gKHdIICsgc0gpLCAxKSwgMClcblxuICAgICAgICAgICAgY29uc3Qgc3dUb3AgPSBzVCArIHdIXG4gICAgICAgICAgICBjb25zdCBpbnRlcnNlY3Rpb25zID0gZWwuaW50ZXJzZWN0aW9uc1xuXG4gICAgICAgICAgICAvLyBpbnRlcnNlY3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgLy8gICAgIHRvcCAgICAgOiAuNDEsXG4gICAgICAgICAgICAvLyAgICAgYm90dG9tICA6IC42MCxcbiAgICAgICAgICAgIC8vICAgICBkaXN0YW5jZTogLjE5LFxuICAgICAgICAgICAgLy8gICAgIHB4cyAgICAgOiAgIDAsXG4gICAgICAgICAgICAvLyAgICAgcHhlICAgICA6ICAyNSxcbiAgICAgICAgICAgIC8vICAgICBweGQgICAgIDogIDI1LFxuICAgICAgICAgICAgLy8gfSlcblxuICAgICAgICAgICAgbGV0IHh2PSAwXG4gICAgICAgICAgICBsZXQgeXY9IDBcbiAgICAgICAgICAgIGxldCBzYz0gMVxuICAgICAgICAgICAgbGV0IHJ0PSAwXG5cbiAgICAgICAgICAgIGludGVyc2VjdGlvbnMuZm9yRWFjaCgoaSk9PntcbiAgICAgICAgICAgICAgICBsZXQgcmVsRiA9IChjRi1pLnRvcCkgLyBpLmRpc3RhbmNlXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbEZhY3Rvcj0gKGNGIC0gaS50b3ApIC8gaS5kaXN0YW5jZVxuXG4gICAgICAgICAgICAgICAgaWYgKGkucHhzICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICB4dj0gaS5weHNcbiAgICAgICAgICAgICAgICAgICAgaWYgKChjRiA+IGkudG9wKSAmJiAoY0YgPCBpLmJvdHRvbSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgeHY9IGkucHhzICsgcmVsRiAqIGkucHhkXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmICggY0YgPiBpLmJvdHRvbSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHh2PSBpLnB4ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpLnB5cyAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgeXY9IGkucHlzXG4gICAgICAgICAgICAgICAgICAgIGlmICgoY0YgPiBpLnRvcCkgJiYgKGNGIDwgaS5ib3R0b20pKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHl2PSBpLnB5cyArIHJlbEYgKiBpLnB5ZFxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoIGNGID4gaS5ib3R0b20gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5dj0gaS5weWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaS5ydHMgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIHJ0PSBpLnJ0c1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGNGID4gaS50b3ApICYmIChjRiA8IGkuYm90dG9tKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBydD0gaS5ydHMgKyByZWxGICogaS5ydGRcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYgKCBjRiA+IGkuYm90dG9tICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcnQ9IGkucnRlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiAoaS5zY3MgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgLy8gICAgIHNjPSBpLnNjc1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoKGNGID4gaS50b3ApICYmIChjRiA8IGkuYm90dG9tKSl7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBzYz0gaS5zY3MgKyByZWxGICogaS5zY2RcbiAgICAgICAgICAgICAgICAvLyAgICAgfWVsc2UgaWYgKCBjRiA+IGkuYm90dG9tICkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgc2M9IGkuc2NlXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGxldCB0ID0gYHJvdGF0ZSgke3J0fWRlZykgdHJhbnNsYXRlKCR7eHZ9dncsJHt5dn12aCkgYFxuICAgICAgICAgICAgZWwuc3R5bGUudHJhbnNmb3JtID0gdDtcblxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IChlbGVtZW50cykgPT4gbmV3IEhvdWRpbmlSZWdpc3RyeShlbGVtZW50cyk7XG4iLCJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xuXHRsZXQgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuXG5cdC8vIGNvbnNvbGUubG9nKCB3aW5kb3cuc2Nyb2xsWSApXG5cblx0aWYgKHdpbmRvdy5zY3JvbGxZKSB7XG5cdFx0Ym9keS5jbGFzc0xpc3QucmVtb3ZlKFwiYXQtdG9wXCIpOyBib2R5LmNsYXNzTGlzdC5hZGQoXCJpcy1zY3JvbGxlZFwiKVxuXHR9IGVsc2Uge1xuXHRcdGJvZHkuY2xhc3NMaXN0LmFkZChcImF0LXRvcFwiKTsgYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtc2Nyb2xsZWRcIilcblx0fVxuXG59KVxuXG4iLCJpbXBvcnQgdGhyb3R0bGUgICAgICAgZnJvbSAnbG9kYXNoL3Rocm90dGxlJztcbmltcG9ydCBSZWdpc3RyeSAgICAgICBmcm9tICcuL3JlZ2lzdHJ5JztcbmltcG9ydCB7IGluVmlld3BvcnQgfSBmcm9tICcuL3ZpZXdwb3J0JztcblxuLyoqXG4qIENyZWF0ZSBhbmQgcmV0dXJuIHRoZSBpblZpZXcgZnVuY3Rpb24uXG4qL1xuY29uc3QgaW5WaWV3ID0gKCkgPT4ge1xuXG4gICAgLyoqXG4gICAgKiBGYWxsYmFjayBpZiB3aW5kb3cgaXMgdW5kZWZpbmVkLlxuICAgICovXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAvKipcbiAgICAqIEhvdyBvZnRlbiBhbmQgb24gd2hhdCBldmVudHMgd2Ugc2hvdWxkIGNoZWNrXG4gICAgKiBlYWNoIHJlZ2lzdHJ5LlxuICAgICovXG4gICAgY29uc3QgaW50ZXJ2YWwgPSAxMDA7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSBbJ3Njcm9sbCcsICdyZXNpemUnLCAnbG9hZCddO1xuXG4gICAgLyoqXG4gICAgKiBNYWludGFpbiBhIGhhc2htYXAgb2YgYWxsIHJlZ2lzdHJpZXMsIGEgaGlzdG9yeVxuICAgICogb2Ygc2VsZWN0b3JzIHRvIGVudW1lcmF0ZSwgYW5kIGFuIG9wdGlvbnMgb2JqZWN0LlxuICAgICovXG4gICAgbGV0IHNlbGVjdG9ycyA9IHsgaGlzdG9yeTogW10gfTtcbiAgICBsZXQgb3B0aW9ucyAgID0geyBvZmZzZXQ6IHt9LCB0aHJlc2hvbGQ6IDAsIHRlc3Q6IGluVmlld3BvcnQgfTtcblxuICAgIC8qKlxuICAgICogQ2hlY2sgZWFjaCByZWdpc3RyeSBmcm9tIHNlbGVjdG9yIGhpc3RvcnksXG4gICAgKiB0aHJvdHRsZWQgdG8gaW50ZXJ2YWwuXG4gICAgKi9cbiAgICBjb25zdCBjaGVjayA9IHRocm90dGxlKCgpID0+IHtcbiAgICAgICAgc2VsZWN0b3JzLmhpc3RvcnkuZm9yRWFjaChzZWxlY3RvciA9PiB7XG4gICAgICAgICAgICBzZWxlY3RvcnNbc2VsZWN0b3JdLmNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH0sIGludGVydmFsKTtcblxuICAgIC8qKlxuICAgICogRm9yIGVhY2ggdHJpZ2dlciBldmVudCBvbiB3aW5kb3csIGFkZCBhIGxpc3RlbmVyXG4gICAgKiB3aGljaCBjaGVja3MgZWFjaCByZWdpc3RyeS5cbiAgICAqL1xuICAgIHRyaWdnZXJzLmZvckVhY2goZXZlbnQgPT5cbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2hlY2spKTtcblxuICAgIC8qKlxuICAgICogSWYgc3VwcG9ydGVkLCB1c2UgTXV0YXRpb25PYnNlcnZlciB0byB3YXRjaCB0aGVcbiAgICAqIERPTSBhbmQgcnVuIGNoZWNrcyBvbiBtdXRhdGlvbi5cbiAgICAqL1xuICAgIGlmICh3aW5kb3cuTXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgICBhZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2hlY2spXG4gICAgICAgICAgICAgICAgLm9ic2VydmUoZG9jdW1lbnQuYm9keSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogVGhlIG1haW4gaW50ZXJmYWNlLiBUYWtlIGEgc2VsZWN0b3IgYW5kIHJldHJpZXZlXG4gICAgKiB0aGUgYXNzb2NpYXRlZCByZWdpc3RyeSBvciBjcmVhdGUgYSBuZXcgb25lLlxuICAgICovXG4gICAgbGV0IGNvbnRyb2wgPSAoc2VsZWN0b3IsIHNldHRpbmdzKSA9PiB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHJldHVybjtcblxuICAgICAgICAvLyBHZXQgYW4gdXAtdG8tZGF0ZSBsaXN0IG9mIGVsZW1lbnRzLlxuICAgICAgICBsZXQgZWxlbWVudHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcblxuICAgICAgICAvLyBJZiB0aGUgcmVnaXN0cnkgZXhpc3RzLCB1cGRhdGUgdGhlIGVsZW1lbnRzLlxuICAgICAgICBpZiAoc2VsZWN0b3JzLmhpc3RvcnkuaW5kZXhPZihzZWxlY3RvcikgPiAtMSkge1xuICAgICAgICAgICAgc2VsZWN0b3JzW3NlbGVjdG9yXS5lbGVtZW50cyA9IGVsZW1lbnRzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgaXQgZG9lc24ndCBleGlzdCwgY3JlYXRlIGEgbmV3IHJlZ2lzdHJ5LlxuICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IGxvY2FsT3B0aW9ucyA9IG9wdGlvbnNcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncyl7XG4gICAgICAgICAgICAgICAgbG9jYWxPcHRpb25zLm9mZnNldC50b3AgICAgPSBzZXR0aW5ncy50b3AgICAgPyBzZXR0aW5ncy50b3AgICAgOiBvcHRpb25zLm9mZnNldC50b3BcbiAgICAgICAgICAgICAgICBsb2NhbE9wdGlvbnMub2Zmc2V0LmJvdHRvbSA9IHNldHRpbmdzLmJvdHRvbSA/IHNldHRpbmdzLmJvdHRvbSA6IG9wdGlvbnMub2Zmc2V0LmJvdHRvbVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxlY3RvcnNbc2VsZWN0b3JdID0gUmVnaXN0cnkoZWxlbWVudHMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgc2VsZWN0b3JzLmhpc3RvcnkucHVzaChzZWxlY3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZWN0b3JzW3NlbGVjdG9yXTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgKiBNdXRhdGUgdGhlIG9mZnNldCBvYmplY3Qgd2l0aCBlaXRoZXIgYW4gb2JqZWN0XG4gICAgKiBvciBhIG51bWJlci5cbiAgICAqL1xuICAgIGNvbnRyb2wub2Zmc2V0ID0gbyA9PiB7XG4gICAgICAgIGlmIChvID09PSB1bmRlZmluZWQpIHJldHVybiBvcHRpb25zLm9mZnNldDtcbiAgICAgICAgY29uc3QgaXNOdW0gPSBuID0+IHR5cGVvZiBuID09PSAnbnVtYmVyJztcbiAgICAgICAgWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXVxuICAgICAgICAgICAgLmZvckVhY2goaXNOdW0obykgP1xuICAgICAgICAgICAgICAgIGRpbSA9PiBvcHRpb25zLm9mZnNldFtkaW1dID0gbyA6XG4gICAgICAgICAgICAgICAgZGltID0+IGlzTnVtKG9bZGltXSkgPyBvcHRpb25zLm9mZnNldFtkaW1dID0gb1tkaW1dIDogbnVsbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMub2Zmc2V0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAqIFNldCB0aGUgdGhyZXNob2xkIHdpdGggYSBudW1iZXIuXG4gICAgKi9cbiAgICBjb250cm9sLnRocmVzaG9sZCA9IG4gPT4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG4gPT09ICdudW1iZXInICYmIG4gPj0gMCAmJiBuIDw9IDFcbiAgICAgICAgICAgID8gb3B0aW9ucy50aHJlc2hvbGQgPSBuXG4gICAgICAgICAgICA6IG9wdGlvbnMudGhyZXNob2xkO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAqIFVzZSBhIGN1c3RvbSB0ZXN0LCBvdmVycmlkaW5nIGluVmlld3BvcnQsIHRvXG4gICAgKiBkZXRlcm1pbmUgZWxlbWVudCB2aXNpYmlsaXR5LlxuICAgICovXG4gICAgY29udHJvbC50ZXN0ID0gZm4gPT4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IG9wdGlvbnMudGVzdCA9IGZuXG4gICAgICAgICAgICA6IG9wdGlvbnMudGVzdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgKiBBZGQgcHJveHkgZm9yIHRlc3QgZnVuY3Rpb24sIHNldCBkZWZhdWx0cyxcbiAgICAqIGFuZCByZXR1cm4gdGhlIGludGVyZmFjZS5cbiAgICAqL1xuICAgIGNvbnRyb2wuaXMgPSBlbCA9PiBvcHRpb25zLnRlc3QoZWwsIG9wdGlvbnMpO1xuXG4gICAgY29udHJvbC5vZmZzZXQoMCk7XG5cbiAgICByZXR1cm4gY29udHJvbDtcblxufTtcblxuLy8gRXhwb3J0IGEgc2luZ2xldG9uLlxuZXhwb3J0IGRlZmF1bHQgaW5WaWV3KCk7XG4iLCJpbXBvcnQgaW5WaWV3IGZyb20gJy4vaW4tdmlldy5qcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gaW5WaWV3O1xuIiwiLyoqXG4qIC0gUmVnaXN0cnkgLVxuKlxuKiBNYWludGFpbiBhIGxpc3Qgb2YgZWxlbWVudHMsIGEgc3Vic2V0IHdoaWNoIGN1cnJlbnRseSBwYXNzXG4qIGEgZ2l2ZW4gY3JpdGVyaWEsIGFuZCBmaXJlIGV2ZW50cyB3aGVuIGVsZW1lbnRzIG1vdmUgaW4gb3Igb3V0LlxuKi9cblxuY2xhc3MgaW5WaWV3UmVnaXN0cnkge1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zICA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBlbGVtZW50cztcbiAgICAgICAgdGhpcy5jdXJyZW50ICA9IFtdO1xuICAgICAgICB0aGlzLmhhbmRsZXJzID0geyBlbnRlcjogW10sIGV4aXQ6IFtdIH07XG4gICAgICAgIHRoaXMuc2luZ2xlcyAgPSB7IGVudGVyOiBbXSwgZXhpdDogW10gfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIENoZWNrIGVhY2ggZWxlbWVudCBpbiB0aGUgcmVnaXN0cnksIGlmIGFuIGVsZW1lbnRcbiAgICAqIGNoYW5nZXMgc3RhdGVzLCBmaXJlIGFuIGV2ZW50IGFuZCBvcGVyYXRlIG9uIGN1cnJlbnQuXG4gICAgKi9cbiAgICBjaGVjaygpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGxldCBwYXNzZXMgID0gdGhpcy5vcHRpb25zLnRlc3QoZWwsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICBsZXQgaW5kZXggICA9IHRoaXMuY3VycmVudC5pbmRleE9mKGVsKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gaW5kZXggPiAtMTtcbiAgICAgICAgICAgIGxldCBlbnRlcmVkID0gcGFzc2VzICYmICFjdXJyZW50O1xuICAgICAgICAgICAgbGV0IGV4aXRlZCAgPSAhcGFzc2VzICYmIGN1cnJlbnQ7XG5cbiAgICAgICAgICAgIGlmIChlbnRlcmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50LnB1c2goZWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnZW50ZXInLCBlbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChleGl0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2V4aXQnLCBlbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUmVnaXN0ZXIgYSBoYW5kbGVyIGZvciBldmVudCwgdG8gYmUgZmlyZWRcbiAgICAqIGZvciBldmVyeSBldmVudC5cbiAgICAqL1xuICAgIG9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlcnNbZXZlbnRdLnB1c2goaGFuZGxlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUmVnaXN0ZXIgYSBoYW5kbGVyIGZvciBldmVudCwgdG8gYmUgZmlyZWRcbiAgICAqIG9uY2UgYW5kIHJlbW92ZWQuXG4gICAgKi9cbiAgICBvbmNlKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuc2luZ2xlc1tldmVudF0udW5zaGlmdChoYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBFbWl0IGV2ZW50IG9uIGdpdmVuIGVsZW1lbnQuIFVzZWQgbW9zdGx5XG4gICAgKiBpbnRlcm5hbGx5LCBidXQgY291bGQgYmUgdXNlZnVsIGZvciB1c2Vycy5cbiAgICAqL1xuICAgIGVtaXQoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICAgICAgd2hpbGUodGhpcy5zaW5nbGVzW2V2ZW50XS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2luZ2xlc1tldmVudF0ucG9wKCkoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMuaGFuZGxlcnNbZXZlbnRdLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKC0tbGVuZ3RoID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNbZXZlbnRdW2xlbmd0aF0oZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IChlbGVtZW50cywgb3B0aW9ucykgPT4gbmV3IGluVmlld1JlZ2lzdHJ5KGVsZW1lbnRzLCBvcHRpb25zKTtcbiIsIi8qKlxuKiBDaGVjayB3aGV0aGVyIGFuIGVsZW1lbnQgaXMgaW4gdGhlIHZpZXdwb3J0IGJ5XG4qIG1vcmUgdGhhbiBvZmZzZXQgcHguXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGluVmlld3BvcnQgKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgIGNvbnN0IHsgdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0LCB3aWR0aCwgaGVpZ2h0IH0gPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgY29uc3QgaW50ZXJzZWN0aW9uID0ge1xuICAgICAgICB0OiBib3R0b20sXG4gICAgICAgIHI6IHdpbmRvdy5pbm5lcldpZHRoIC0gbGVmdCxcbiAgICAgICAgYjogd2luZG93LmlubmVySGVpZ2h0IC0gdG9wLFxuICAgICAgICBsOiByaWdodFxuICAgIH07XG5cbiAgICBjb25zdCB0aHJlc2hvbGQgPSB7XG4gICAgICAgIHg6IG9wdGlvbnMudGhyZXNob2xkICogd2lkdGgsXG4gICAgICAgIHk6IG9wdGlvbnMudGhyZXNob2xkICogaGVpZ2h0XG4gICAgfTtcblxuICAgIHJldHVybiBpbnRlcnNlY3Rpb24udCA+IChvcHRpb25zLm9mZnNldC50b3AgICAgKyB0aHJlc2hvbGQueSlcbiAgICAgICAgJiYgaW50ZXJzZWN0aW9uLnIgPiAob3B0aW9ucy5vZmZzZXQucmlnaHQgICsgdGhyZXNob2xkLngpXG4gICAgICAgICYmIGludGVyc2VjdGlvbi5iID4gKG9wdGlvbnMub2Zmc2V0LmJvdHRvbSArIHRocmVzaG9sZC55KVxuICAgICAgICAmJiBpbnRlcnNlY3Rpb24ubCA+IChvcHRpb25zLm9mZnNldC5sZWZ0ICAgKyB0aHJlc2hvbGQueCk7XG5cbn1cbiJdfQ==
