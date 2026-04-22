import https from 'https';

https.get('https://euro-uvac.onrender.com/', (res) => {
  console.log('STATUS:', res.statusCode);
  console.log('HEADERS:', res.headers);
  res.on('data', () => {});
  res.on('end', () => process.exit(0));
});
