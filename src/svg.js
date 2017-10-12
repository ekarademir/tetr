'use strict';


/**
 * Convert from camel notation to kebab notation.
 * @param {string} camel 
 */
let camelToKebab = (camel) => {

  let pattern = /([A-Z]{1})/;

  let replacer = (match, capital, offset, str)=>{
    return `-${capital.toLowerCase(capital)}`;
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
let addAttributes = (elem, attributes) => {
  for (const [key, value] of Object.entries(attributes)) {
    elem.setAttributeNS(null, camelToKebab(key), value);    
  }
};


/**
 * Stroke an element. color and width overrides those specified in strokeProps.
 * @param {SVGElement or Array} elem
 * @param {string} color 
 * @param {number} width 
 * @param {Object} strokeProps 
 */
export let stroke = (elem, color, width, strokeProps) => {
  if (typeof elem === 'undefined') {
    return;
  }

  let elems = [];
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

  elems.forEach((el)=>{
    addAttributes(el, strokeProps);
  });
};


/**
 * Fill an element
 * @param {SVGElement} elem
 * @param {string} color 
 * @param {Object} fillProps 
 */
export let fill = (elem, color, fillProps) => {
  if (typeof elem === 'undefined') {
    return;
  }

  let elems = [];
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

  elems.forEach((el)=>{
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
export let rect = (x, y, w, h) => {
  return createSVGElement('rect', {
    x: x, y:y, width: w, height: h
  });
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

  if (typeof attributes !== 'undefined' &&
      typeof attributes === 'object') {
    for (const [key, value] of Object.entries(attributes)) {
      elem.setAttributeNS(null, key, value);    
    }
  }

  return elem;
};