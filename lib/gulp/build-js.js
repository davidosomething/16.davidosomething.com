/*eslint-env node*/

module.exports = (cb) => {

  const exec = require('child_process').exec;

  /**
   * onExecDone
   *
   * @param {ErrorObject} err
   */
  const onExecDone = (err) => {
    return cb(err);
  };

  exec('npm run bundle', onExecDone);

};
