/* eslint-disable no-param-reassign */
import { ChangeInputType } from '../../types/types';

type Language = 'dk' | 'uk';

export function formatCurrency(event: ChangeInputType) {
  // Remove all non-digit characters
  let { value } = event.target;
  value = value.replace(/\D/g, '');

  // Define format patterns based on language
  const formats: { [key in Language]: { decimal: string; thousand: string } } =
    {
      dk: { decimal: ',', thousand: '.' },
      uk: { decimal: '.', thousand: ',' },
    };

  const { decimal, thousand } = formats.dk;

  // Add the decimal point/comma before the last two digits
  value = value.replace(/(\d)(\d{2})$/, `$1${decimal}$2`);
  // Add the thousand separator
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, thousand);

  event.target.value = value;
  return event;
}

export const currencyMask = (event: ChangeInputType) => {
  let { value } = event.target;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1.$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ' ');
  event.target.value = value;
  return event;
};

export const phoneMask = (event: ChangeInputType) => {
  let { value } = event.target;
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/g, '($1)$2');
  value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  event.target.value = value;
  return event;
};

export const idMask = (event: ChangeInputType) => {
  event.target.maxLength = 9;
  let { value } = event.target;
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{8})(\d)/, '$1-$2');

  event.target.value = value;
  return event;
};
