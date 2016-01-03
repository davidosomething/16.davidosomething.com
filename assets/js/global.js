import { ga } from './ga.js';
import { configs, shareIntent } from './shareIntent.js';

ga('send', 'pageview');

shareIntent(configs.facebook);
shareIntent(configs.google);
shareIntent(configs.twitter);


