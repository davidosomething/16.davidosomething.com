/**
 * @author David O'Trakoun <me@davidosomething.com>
 * @module global
 * @requires module:shareIntent
 */

import { configs, bindSharePopup } from './shareIntent.js';

bindSharePopup(configs.facebook);
bindSharePopup(configs.google);
bindSharePopup(configs.twitter);

