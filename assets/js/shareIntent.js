/**
 * Modified for facebook - limited dependency twitter web intents
 * @see twitter.js
 */

export const configs = {
  facebook: {
    intentRegex: /facebook\.com\/dialog\/share\?(\w+)/,
    width: 600,
    height: 500,
  },
  twitter: {
    intentRegex: /twitter\.com\/intent\/(\w+)/,
    width: 550,
    height: 420,
  },
};

export function shareIntent(config) {
  const windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes';

  var winHeight = screen.height;
  var winWidth = screen.width;

  function handleIntent(e) {
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

        window.open(target.href, 'intent', windowOptions + ',width=' + config.width +
                                           ',height=' + config.height + ',left=' + left + ',top=' + top);
        e.returnValue = false;
        e.preventDefault && e.preventDefault();
      }
    }
  }

  if (document.addEventListener) {
    document.addEventListener('click', handleIntent, false);
  }
  else if (document.attachEvent) {
    document.attachEvent('onclick', handleIntent);
  }
}

