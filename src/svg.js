'use strict';


/**
 * Create a rectangle.
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 */
export let rect = (x, y, w, h) => {

};


/**
 * Create an SVG element with proper namespace.
 * @param {string} tag 
 * @param {Object} attributes
 */
export let createSVGElement = (tag, attributes) => {
  let svgns = 'http://www.w3.org/2000/svg';
  // let xlinkns = 'http://www.w3.org/1999/xlink';

  let elem = document.createElementNS(svgns, tag);

  if (typeof attributes !== 'undefined') {
    for (const [key, value] of Object.entries(attributes)) {
      elem.setAttributeNS(null, key, value);    
    }
  }

  return elem;
};