yarn
yarn build
touch release.tgz
tar -czvf ./release.tgz ./out ./package.json
