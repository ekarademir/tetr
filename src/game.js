'use strict';

import * as svg from './svg';

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

  let canvas = svg.createSVGElement('svg', {
    width: '100%',
    height: '100%',
    preserveAspectRatio: 'xMinYMin',
    viewBox: '0, 0, 400, 300'
  });

  let box = svg.rect(10, 10, 100, 100);

  svg.fill(box, '#EE9999');
  svg.stroke(box, 'black', 3);

  canvas.appendChild(box);

  mainElement.appendChild(canvas);

};