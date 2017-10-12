'use strict';

import {createSVGElement} from './svg';

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

  let svg = createSVGElement('svg', {
    width: '100%',
    height: '100%',
    preserveAspectRatio: 'xMinYMin',
    viewBox: '400, 300, 400, 300'
  });

  mainElement.appendChild(svg);

};