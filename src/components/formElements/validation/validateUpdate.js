import { CONTENT } from '@common/constants/content';
import { VALIDNUM } from './regex';
import { labels } from '@data/labels';

export function validateUpdate(values) {
  const { artist, title, prodYear, numOfRecords, price, released } = values;
  const { errorNumber, required } = CONTENT;

  const valNum = (inputValue) => {
    return !VALIDNUM.test(inputValue) && inputValue !== ' ' && inputValue;
  };

  let errors = {};

  if (!artist) {
    errors.artist = required + labels.artist;
  }
  if (!title) {
    errors.title = required + labels.title;
  }
  if (!prodYear) {
    errors.prodYear = required + labels.prodYear;
  } else if (!VALIDNUM.test(prodYear)) {
    errors.prodYear = errorNumber;
  }

  if (valNum(numOfRecords)) {
    errors.numOfRecords = errorNumber;
  }
  if (valNum(price)) {
    errors.price = errorNumber;
  }
  if (valNum(released)) {
    errors.released = errorNumber;
  }

  return errors;
}
