/*eslint-env node*/

module.exports = (cb) => {

  const exec = require('child_process').exec;

  exec('npm run bundle', (err) => {
    return cb(err);
  });

};
