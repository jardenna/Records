import csv from 'csv-parser';
import fs from 'fs';

// Read CSV file
const results = [];

fs.createReadStream('src/locales/translation.csv')
  .pipe(csv({ separator: ';', headers: ['key', 'en', 'da'] })) // Specify separator and headers
  .on('data', (data) => {
    results.push(data);
  })
  .on('end', () => {
    try {
      const enJson = {};
      const daJson = {};

      results.forEach((row) => {
        if (row.key && row.en && row.da) {
          enJson[row.key] = row.en;
          daJson[row.key] = row.da;
        } else {
          console.error('Missing data in row:', row);
        }
      });

      // Write to en.json
      fs.writeFileSync('src/locales/en.json', JSON.stringify(enJson, null, 2));

      // Write to da.json
      fs.writeFileSync('src/locales/da.json', JSON.stringify(daJson, null, 2));
    } catch (error) {
      console.error('Error processing CSV:', error);
    }
  })
  .on('error', (error) => {
    console.error('Error reading CSV:', error);
  });
