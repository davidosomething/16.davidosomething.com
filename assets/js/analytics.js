/**
 * Analytics tracking
 *
 * @module analytics
 */

/**
 * @namespace
 */
var analytics = {};

/**
 * event
 *
 * @param {String} description
 * @param {Object} data
 * @return {this}
 */
analytics.event = (description, data) => {
  if (!window.ga) {
    return this;
  }

  switch (description) {

    case 'Clicked bio profile link':
      // data = e.target.text
      window.ga('send', {
        hitType:        'event',
        eventCategory:  '.bio__links',
        eventAction:    description,
        eventLabel:     `${data}`,
      });
      break;

    case 'Clicked footer link':
      // data = e.target.text
      window.ga('send', {
        hitType:        'event',
        eventCategory:  '.globalFooter',
        eventAction:    description,
        eventLabel:     `${data}`,
      });
      break;

    case 'Clicked share button':
      // data = IntentProvider.intentName
      window.ga('send', {
        hitType:        'event',
        eventCategory:  '.widget--sharePost',
        eventAction:    description,
        eventLabel:     `${data}`,
      });
      break;

  }

  return this;
};

export default analytics;
