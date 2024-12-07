#!/bin/sh

# Create .npmrc file with auth details
echo "registry=${NPM_REGISTRY}" > .npmrc
echo "${NPM_REGISTRY}:_auth=$(echo -n "${NPM_USER}:${NPM_PASS}" | base64)" >> .npmrc
echo "always-auth=true" >> .npmrc

# Execute npm publish command
npm publish --registry ${NPM_REGISTRY}

# Clean up
rm -f .npmrc