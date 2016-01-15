/**
 * Web intents for sharing
 * Adapted from twitter's code
 * @see {@link https://dev.twitter.com/web/intents#follow-intent}
 *
 * @module shareIntent
 */

const windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes';

/**
 * @constant
 */
export const configs = {
  facebook: {
    intentRegex: /facebook\.com\/dialog\/share\?(\w+)/,
    width: 600,
    height: 500,
  },
  google: {
    intentRegex: /plus\.google\.com\/share\?(\w+)/,
    width: 500,
    height: 525,
  },
  twitter: {
    intentRegex: /twitter\.com\/intent\/(\w+)/,
    width: 550,
    height: 420,
  },
};

/**
 * shareIntent opens a popup window to share a ShareIntent
 *
 * @param {Object} config
 * @param {RegExp} config.intentRegex
 * @param {Number} config.height
 * @param {Number} config.width
 */
export function shareIntent(config) {
  var winHeight = screen.height;
  var winWidth = screen.width;

  var handleIntent = (e) => {
    e = e || window.event;
    var target = e.target || e.srcElement;
    var m;
    var left;
    var top;

    while (target && target.nodeName.toLowerCase() !== 'a') {
      target = target.parentNode;
    }

    if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
      m = target.href.match(config.intentRegex);
      if (m) {
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

