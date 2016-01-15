/**
 * @author David O'Trakoun <me@davidosomething.com>
 * @module global
 */

import { configs, shareIntent } from './shareIntent.js';

shareIntent(configs.facebook);
shareIntent(configs.google);
shareIntent(configs.twitter);

