'use strict';

/**
 * Adds game screen to given DOM element.
 * @param {string} mainSelector DOM selector to insert game screen.
 */
export let setup = (mainSelector) => {

  let main = document.querySelector(mainSelector);

  mainScreen(main);

};


/**
 * Draw mainscreen
 * @param {DOMElement} mainElement 
 */
let mainScreen = (mainElement) => {

  let svg = createSVGElement('svg');
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
export let createSVGElement = (tag) => {
  let svgns = 'http://www.w3.org/2000/svg';
  // let xlinkns = 'http://www.w3.org/1999/xlink';

  return document.createElementNS(svgns, tag);
};