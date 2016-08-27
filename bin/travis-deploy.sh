#!/usr/bin/env bash

# Run in Travis after_success to deploy to GitHub pages

set -ev

__deploy() {
  echo "--------------------------------------------------------------------------------"
  echo "Deploying $GITHUB_PAGES_COMMIT_MESSAGE"
  echo "--------------------------------------------------------------------------------"
  echo

  # ENV vars in travis
  # shellcheck disable=SC2154
  openssl aes-256-cbc                 \
    -K "$encrypted_157bbe5ff2f8_key"  \
    -iv "$encrypted_157bbe5ff2f8_iv"  \
    -in lib/id_rsa.enc                \
    -out ~/.ssh/id_rsa -d

  chmod u=rw,og= ~/.ssh/id_rsa
  echo "Host github.com"              >> ~/.ssh/config
  echo "  IdentityFile ~/.ssh/id_rsa" >> ~/.ssh/config
  npm run --silent deploy-github

  wait

  echo
  echo "--------------------------------------------------------------------------------"
  echo "Deployed $GITHUB_PAGES_COMMIT_MESSAGE"
  echo "--------------------------------------------------------------------------------"
}

if [ "${TRAVIS_PULL_REQUEST}" = "false" ] && [ "$TRAVIS_BRANCH" = "master" ]; then
  __deploy
fi

