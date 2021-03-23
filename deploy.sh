cd client && npm install && npm run build
echo "Created React production build"
cd ../api && npm install && npm start
echo "api started"