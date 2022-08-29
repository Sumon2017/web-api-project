cd ..
cd ./ecommerce
npm install
pm2 start index.js --name ecommerce


cd ..
cd ./seller
npm install
pm2 start index.js --name seller

cd ..
cd ./bank
npm install
pm2 start index.js --name bank

cd ..
cd ./onoff

echo "success"
