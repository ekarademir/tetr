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


/**
 * Adds game screen to given DOM element.
 * @param {string} mainSelector DOM selector to insert game screen.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var setup = exports.setup = function setup(mainSelector) {

  var main = document.querySelector(mainSelector);

  mainScreen(main);
};

/**
 * Draw mainscreen
 * @param {DOMElement} mainElement 
 */
var mainScreen = function mainScreen(mainElement) {

  var svg = createSVGElement('svg');
  svg.setAttributeNS(null, 'width', '100%');
  svg.setAttributeNS(null, 'height', '100%');
  svg.setAttributeNS(null, 'preserveAspectRatio', 'xMinYMin');
  svg.setAttributeNS(null, 'viewBox', '400, 300, 400, 300');

  mainElement.appendChild(svg);
};

/**
 * Create an SVG element with proper namespace.
 * @param {string} tag 
 */
var createSVGElement = exports.createSVGElement = function createSVGElement(tag) {
  var svgns = 'http://www.w3.org/2000/svg';
  // let xlinkns = 'http://www.w3.org/1999/xlink';

  return document.createElementNS(svgns, tag);
};

/***/ })
/******/ ]);
//# sourceMappingURL=tetr.dist.js.map