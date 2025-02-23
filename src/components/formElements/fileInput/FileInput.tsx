import { FC } from 'react';
import { FileUploadNameType } from '../../../app/api/apiTypes';
import { ChangeInputType } from '../../../types/types';
import Input from '../Input';
import './_file-input.scss';

interface FileInputProps {
  id: string;
  labelText: string;
  name: FileUploadNameType;
  onChange: (event: ChangeInputType) => void;
  value: string;
}

const FileInput: FC<FileInputProps> = ({
  onChange,
  name,
  id,
  labelText,
  value,
}) => (
  <div className="file-container">
    <Input
      type="file"
      onChange={onChange}
      name={name}
      id={id}
      value={value}
      labelText={labelText}
    />
  </div>
);

export default FileInput;
