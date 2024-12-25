export interface RadioListItem {
  id: string;
  labelText: string;
}

export const radioButtonGenderList: RadioListItem[] = [
  {
    id: 'woman',
    labelText: 'Woman',
  },
  {
    id: 'man',
    labelText: 'Man',
  },
  {
    id: 'nonBinary',
    labelText: 'Non-Binary',
  },
  {
    id: 'agender',
    labelText: 'Agender / I don’t identify with any gender',
  },
  {
    id: 'notListed',
    labelText: 'Gender not listed',
  },
];

export interface CheckboxItems {
  label: string;
}

export const checkboxItems: CheckboxItems[] = [
  { label: 'Option 1' },
  { label: 'Option 2' },
  { label: 'Option 3' },
  { label: 'Option 4' },
  { label: 'Option 5' },
];
