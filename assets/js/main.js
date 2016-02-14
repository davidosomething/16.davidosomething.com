/**
 * @author David O'Trakoun <me@davidosomething.com>
 * @module global
 * @requires module:shareIntent
 */

import analytics from './analytics.js';
import { configs, bindSharePopup } from './shareIntent.js';

bindSharePopup(configs.facebook);
bindSharePopup(configs.google);
bindSharePopup(configs.twitter);

/**
 * clickedBioProfileLink
 *
 * @param {Event} e
 */
const clickedBioProfileLink = (e) => {
  if (!e.target.matches('.bio__links a')) {
    return;
  }

  analytics.event('Clicked bio profile link', e.target.text);
};
document.body.addEventListener('click', clickedBioProfileLink);

/**
 * clickedFooterLink
 *
 * @param {Event} e
 */
const clickedFooterLink = (e) => {
  if (!e.target.matches('.globalFooter a')) {
    return;
  }

  analytics.event('Clicked footer link',  e.target.text);
};
document.body.addEventListener('click', clickedFooterLink);

