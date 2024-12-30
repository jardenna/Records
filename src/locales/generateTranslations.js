import csv from 'csv-parser';
import fs from 'fs';

// Read CSV file
const results = [];

fs.createReadStream('src/locales/translation.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const enJson = {};
    const daJson = {};

    results.forEach((row) => {
      enJson[row.key] = row.en;
      daJson[row.key] = row.da;
    });

    // Write to en.json
    fs.writeFileSync('en.json', JSON.stringify(enJson, null, 2));

    // Write to da.json
    fs.writeFileSync('da.json', JSON.stringify(daJson, null, 2));

    console.log('JSON files have been generated!');
  });
