npm install
rm -rf ./dist/
cd ../client
npm install
npm run build
mv -f dist ../server
