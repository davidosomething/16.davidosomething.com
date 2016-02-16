/**
 * Analytics tracking
 *
 * @module analytics
 */


/**
 * Event name (eventAction) to selector context (eventCategory)
 * @constant
 * @type {Object<String.String>}
 */
const events = {
  'Clicked bio profile link': '.bio__links',
  'Clicked footer link': '.globalFooter',
  'Clicked share button': '.widget--sharePost',
};


/**
 * @namespace
 * @type {Object}
 */
var analytics = {};


/**
 * event
 *
 * @param {String} description
 * @param {Object} label
 * @return {this}
 */
analytics.event = (description, label) => {
  if (window.ga && events.hasOwnProperty(description)) {
    window.ga('send', {
      hitType:        'event',
      eventCategory:  events[description],
      eventAction:    description,
      eventLabel:     label,
    });
  }

  return this;
};


export default analytics;
