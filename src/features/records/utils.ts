import { Records } from '../../app/api/apiTypes';

export const createFormData = (
  records: Records,
  file?: File,
  fileName?: string,
): FormData | Records => {
  if (file && fileName) {
    const fd = new FormData();
    fd.append(fileName, file);
    Object.keys(records).forEach((key) => {
      fd.append(key, records[key as keyof Records] as string);
    });
    return fd;
  }
  return records;
};

export const createQueryOptions = (
  url: string,
  method: string,
  body: FormData | Records,
) => ({
  url,
  method,
  body,
});
