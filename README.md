# davidosomething.com for 2016

> Static generated site for [davidosomething.com]

[![Upstream][upstreamBadge]][upstreamLink]
[![David dependency status][davidBadge]][davidLink]
[![Development Dependency Status][davidDevBadge]][davidDevLink]
[![Build Status][travisDevBadge]][travisLink]

[![screenshot][screenshot]][screenshot]

## Stack

Requires node >= 4.2.0 for ES6 (I recommend using [nvm], for which `nvm use`
(or `nvm install`) will read `.nvmrc` and use the version of node specified
there. The package [avn] can auto-switch upon entering directory if installed).

NOTE: g++ version 4.8 or higher is required for node-gyp compilation on node 4.
This particularly applies to the Travis-CI deployment.

## Build

Install dependencies:

```bash
npm install --global gulp jspm
npm install
jspm install
```

And run `gulp` to build.

Note that `gulp` and `jspm` are only installed globally when using for local
dev, whereas the CI-deployment uses `npm run` so the binaries in
`node_modules/.bin/` are in the path. You could technically use
`npm run ci-gulp-build` if you don't want to install gulp globally.

## Deploy

There are npm scripts in `package.json` to build via CI.

Output is generated to `public/` and, if running on `master` from Travis,
the directory is deployed to [surge.sh] and the [GitHub Pages repo].

Deployment from Travis CI is configured in `bin/travis-deploy.sh`.

## TODO

- Deployment workflow:
    - [ ] Open PR with branch, validation services validate
    - [ ] Travis builds PR, marks using GH status API
    - [ ] Merge PR into master, Travis builds, webhook to DeployBot
    - [ ] DeployBot builds and deploys, reports to GH Deployments API
- CSS
    - [ ] lint status to code climate
- JS
    - [ ] codecoverage to codecov.io
    - [ ] can further refactor share link popups
    - [ ] react view for each article and widget
    - [ ] hot module reload
    - [ ] current article should be highlighted if in a widget
- HTML
    - [ ] eventually remove hbs + metalsmith and use react + gatsby
- Content
    - [ ] add images
        - [ ] image hosting? e.g. cloudinary


[davidosomething.com]: https://davidosomething.com
[davidBadge]:    https://david-dm.org/davidosomething/16.davidosomething.com.png?theme=shields.io
[davidLink]:     https://david-dm.org/davidosomething/16.davidosomething.com#info=dependencies
[davidDevBadge]: https://david-dm.org/davidosomething/16.davidosomething.com/dev-status.png?theme=shields.io
[davidDevLink]:  https://david-dm.org/davidosomething/16.davidosomething.com#info=devDependencies
[upstreamBadge]: https://img.shields.io/badge/upstream-GitHub-lightgrey.svg
[upstreamLink]:  https://github.com/davidosomething/16.davidosomething.com
[travisDevBadge]: https://travis-ci.org/davidosomething/16.davidosomething.com.svg?branch=dev
[travisLink]: https://travis-ci.org/davidosomething/16.davidosomething.com
[screenshot]:    https://raw.githubusercontent.com/davidosomething/16.davidosomething.com/dev/meta/screenshot.jpg
[nvm]: https://github.com/creationix/nvm
[avn]: https://github.com/wbyoung/avn
[surge.sh]: https://surge.sh/
[GitHub Pages repo]: https://github.com/davidosomething/davidosomething.github.io

