/**
 * @module gulp/build-js
 */
'use strict';

module.exports = (cb) => {

  const exec = require('child_process').exec;

  /**
   * onExecDone
   *
   * @param {ErrorObject} err
   */
  const onExecDone = (err) => {
    cb(err);
    return;
  };

  exec('npm run bundle', onExecDone);

};
