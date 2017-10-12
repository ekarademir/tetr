/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(1);

var tetr = _interopRequireWildcard(_game);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

tetr.setup('.main'); /**
                      * TETR - a browser based Tetris clone
                         This program is free software: you can redistribute it and/or modify
                         it under the terms of the GNU General Public License as published by
                         the Free Software Foundation, either version 3 of the License, or
                         (at your option) any later version.
                     
                         This program is distributed in the hope that it will be useful,
                         but WITHOUT ANY WARRANTY; without even the implied warranty of
                         MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                         GNU General Public License for more details.
                     
                         You should have received a copy of the GNU General Public License
                         along with this program.  If not, see <http://www.gnu.org/licenses/>.
                      */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = undefined;

var _svg = __webpack_require__(2);

var svg = _interopRequireWildcard(_svg);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Adds game screen to given DOM element.
 * @param {string} mainSelector DOM selector to insert game screen.
 */
var setup = exports.setup = function setup(mainSelector) {

  var main = document.querySelector(mainSelector);

  mainScreen(main);
};

/**
 * Draw mainscreen
 * @param {DOMElement} mainElement 
 */
var mainScreen = function mainScreen(mainElement) {

  var canvas = svg.createSVGElement('svg', {
    width: '100%',
    height: '100%',
    preserveAspectRatio: 'xMinYMin',
    viewBox: '0, 0, 400, 300'
  });

  var box = svg.rect(10, 10, 100, 100);

  svg.fill(box, '#EE9999');
  svg.stroke(box, 'black', 3);

  canvas.appendChild(box);

  mainElement.appendChild(canvas);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Convert from camel notation to kebab notation.
 * @param {string} camel 
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var camelToKebab = function camelToKebab(camel) {

  var pattern = /([A-Z]{1})/;

  var replacer = function replacer(match, capital, offset, str) {
    return '-' + capital.toLowerCase(capital);
  };

  while (camel.search(pattern) != -1) {
    camel = camel.replace(pattern, replacer);
  }

  return camel;
};

/**
 * Add given attributes to given SVG element.
 * @param {SVGElement} elem 
 * @param {Object} attributes 
 */
var addAttributes = function addAttributes(elem, attributes) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(attributes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      elem.setAttributeNS(null, camelToKebab(key), value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

/**
 * Stroke an element. color and width overrides those specified in strokeProps.
 * @param {SVGElement or Array} elem
 * @param {string} color 
 * @param {number} width 
 * @param {Object} strokeProps 
 */
var stroke = exports.stroke = function stroke(elem, color, width, strokeProps) {
  if (typeof elem === 'undefined') {
    return;
  }

  var elems = [];
  if (!Array.isArray(elem)) {
    elems.push(elem);
  } else {
    elems = elem;
  }

  if (typeof strokeProps === 'undefined') {
    strokeProps = {};
  }

  if (typeof color !== 'undefined') {
    strokeProps.stroke = color;
  }

  if (typeof width !== 'undefined') {
    strokeProps.strokeWidth = width;
  }

  elems.forEach(function (el) {
    addAttributes(el, strokeProps);
  });
};

/**
 * Fill an element
 * @param {SVGElement} elem
 * @param {string} color 
 * @param {Object} fillProps 
 */
var fill = exports.fill = function fill(elem, color, fillProps) {
  if (typeof elem === 'undefined') {
    return;
  }

  var elems = [];
  if (!Array.isArray(elem)) {
    elems.push(elem);
  } else {
    elems = elem;
  }

  if (typeof fillProps === 'undefined') {
    fillProps = {};
  }

  if (typeof color !== 'undefined') {
    fillProps.fill = color;
  }

  elems.forEach(function (el) {
    addAttributes(el, fillProps);
  });
};

/**
 * Create a rectangle.
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 */
var rect = exports.rect = function rect(x, y, w, h) {
  return createSVGElement('rect', {
    x: x, y: y, width: w, height: h
  });
};

/**
 * Create an SVG element with proper namespace.
 * @param {string} tag 
 * @param {Object} attributes
 */
var createSVGElement = exports.createSVGElement = function createSVGElement(tag, attributes) {
  var svgns = 'http://www.w3.org/2000/svg';
  // let xlinkns = 'http://www.w3.org/1999/xlink';

  var elem = document.createElementNS(svgns, tag);

  if (typeof attributes !== 'undefined' && (typeof attributes === 'undefined' ? 'undefined' : _typeof(attributes)) === 'object') {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = Object.entries(attributes)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 2),
            key = _step2$value[0],
            value = _step2$value[1];

        elem.setAttributeNS(null, key, value);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return elem;
};

/***/ })
/******/ ]);
//# sourceMappingURL=tetr.dist.js.map