import csv from 'csv-parser';
import fs from 'fs';

// Read CSV file
const results = [];

fs.createReadStream('src/locales/translation.csv')
  .pipe(csv({ separator: ';', headers: ['key', 'en', 'da'] })) // Specify separator and headers
  .on('data', (data) => {
    console.log('Row:', data); // Debugging each row
    results.push(data);
  })
  .on('end', () => {
    try {
      const enJson = {};
      const daJson = {};

      console.log('Parsed Results:', results); // Debug full results

      results.forEach((row) => {
        if (row.key && row.en && row.da) {
          enJson[row.key] = row.en;
          daJson[row.key] = row.da;
        } else {
          console.error('Missing data in row:', row);
        }
      });

      console.log('EN JSON:', enJson);
      console.log('DA JSON:', daJson);

      // Write to en.json
      fs.writeFileSync('en.json', JSON.stringify(enJson, null, 2));
      console.log('en.json file written successfully.');

      // Write to da.json
      fs.writeFileSync('da.json', JSON.stringify(daJson, null, 2));
      console.log('da.json file written successfully.');
    } catch (error) {
      console.error('Error processing CSV:', error);
    }
  })
  .on('error', (error) => {
    console.error('Error reading CSV:', error);
  });
