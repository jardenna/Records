import fs from 'fs';
import Papa from 'papaparse';
import path from 'path';

const csvFilePath = path.join(import.meta.dirname, 'translations.csv');

const csvData = fs.readFileSync(csvFilePath, 'utf8');

const { data: translations } = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
  delimiter: ';',
});

// Convert array to object for easy lookup
const translationMap = {};

translations.forEach((row) => {
  if (row.key) {
    translationMap[row.key] = { en: row.en, da: row.da };
  } else {
    console.error("CSV parsing issue: Row does not have a 'key'", row);
  }
});

// Translation function
export const t = (key, lang = 'en') => {
  if (!translationMap[key]) {
    console.error(`Missing translation key: ${key}`);
    return key; // Return key if missing
  }
  return translationMap[key][lang] || key;
};
