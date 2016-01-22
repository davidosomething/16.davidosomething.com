/**
 * Web intents for sharing. Adapted from twitter's code.
 *
 * @see {@link https://dev.twitter.com/web/intents#follow-intent}
 * @module shareIntent
 */


import analytics from './analytics.js';


/**
 * @constant
 * @type {String}
 */
const windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes';


/**
 * @typedef {Object} IntentProvider
 * @property {RegExp} intentRegex matches an HREF
 * @property {Number} width of pop-up window
 * @property {Number} height of pop-up window
 */

/**
 * Settings for each share pop-up provider
 * @constant
 * @type {Object.<String, IntentProvider>}
 */
export const configs = {
  facebook: {
    intentName: 'Facebook',
    intentRegex: /facebook\.com\/dialog\/share\?(\w+)/,
    width: 600,
    height: 500,
  },
  google: {
    intentName: 'Google+',
    intentRegex: /plus\.google\.com\/share\?(\w+)/,
    width: 500,
    height: 525,
  },
  twitter: {
    intentName: 'Twitter',
    intentRegex: /twitter\.com\/intent\/(\w+)/,
    width: 550,
    height: 420,
  },
};

/**
 * shareIntent opens a popup window to share a ShareIntent
 *
 * @param {IntentProvider} config
 */
export function bindSharePopup(config) {

  /**
   * handleIntent
   *
   * @param {Event} e
   */
  var handleIntent = (e) => {
    e = e || window.event;
    const winHeight = window.screen.height;
    const winWidth = window.screen.width;
    let target = e.target || e.srcElement;
    let m;
    let left;
    let top;

    while (target && target.nodeName.toLowerCase() !== 'a') {
      target = target.parentNode;
    }

    if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
      m = target.href.match(config.intentRegex);
      if (m) {

        analytics.event('Clicked share button', config.intentName);

        left = Math.round((winWidth / 2) - (config.width / 2));
        top = 0;

        if (winHeight > config.height) {
          top = Math.round((winHeight / 2) - (config.height / 2));
        }

        let options = `${windowOptions},width=${config.width},height=${config.height},left=${left},top=${top}`;
        window.open(target.href, 'intent', options);
        e.returnValue = false;
        e.preventDefault && e.preventDefault();
      }
    }
  };

  if (document.addEventListener) {
    document.addEventListener('click', handleIntent, false);
  }
  else if (document.attachEvent) {
    document.attachEvent('onclick', handleIntent);
  }
}

