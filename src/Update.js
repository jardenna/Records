import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Form from '@formElements/Form';
import useFormValidation from '@hooks/useFormValidation';

import { CONTENT } from '@common/constants/content';
import endpoints from '@common/endpoints';
import { validateUpdate } from '@common/validation/validateUpdate';
import Context from '@commonReact/context';
import defaultImg from '@images/default.png';

function Update({
  createRecordRequest,
  fetchDetails,
  updateRecordSuccess,
  details,
}) {
  const id = useParams().id;
  React.useEffect(() => {
    if (id) {
      fetchDetails(id);
    }
  }, []);

  let history = useHistory();

  const recordId = {
    artist: details.artist,
    title: details.title,
    prodYear: details.prodYear,
    label: details.label,
    origin: details.origin,
    price: details.price,
    recordNo: details.recordNo,
    numOfRecords: details.numOfRecords,
    released: details.released,
    info: details.info,
  };

  const recordNoId = {
    artist: '',
    title: '',
    prodYear: '',
    label: '',
    origin: '',
    price: '',
    recordNo: '',
    numOfRecords: '',
    released: '',
    info: '',
  };

  const recordObj = id ? recordId : recordNoId;

  const handleUpdateOrCreate = () => {
    if (id) {
      updateRecordSuccess(id, values, imgUpdated, fileName, file);
      history.push('/details/' + id);
    } else {
      createRecordRequest(values, fileName, file);
      history.push('/all');
    }
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    file,
    fileName,
    imgUpdated,
    previewUrl,
  } = useFormValidation(recordObj, handleUpdateOrCreate, validateUpdate, id);

  const {
    artist,
    title,
    prodYear,
    label,
    origin,
    price,
    recordNo,
    numOfRecords,
    released,
    info,
  } = values;
  const { photo } = details;
  const albumPrice = price || (price !== 0 && price);
  const albumNo = numOfRecords || numOfRecords !== 0 ? numOfRecords : '';

  const inputs = [
    {
      type: 'text',
      name: 'artist',
      inputIdentifier: 'artist',
      label: 'Gruppe / Kunstner',
      isRequired: true,
      value: artist,
      error: errors.artist,
    },
    {
      type: 'text',
      name: 'title',
      inputIdentifier: 'title',
      label: 'Titel',
      isRequired: true,
      value: title,
      error: errors.title,
    },
    {
      type: 'text',
      name: 'prodYear',
      inputIdentifier: 'prodYear',
      label: 'Produktions år',
      isRequired: true,
      value: prodYear,
      error: errors.prodYear,
    },
    {
      type: 'text',
      name: 'released',
      inputIdentifier: 'released',
      label: 'Senest udgivet',
      isRequired: false,
      value: released,
      error: errors.released,
    },
    {
      type: 'text',
      name: 'label',
      inputIdentifier: 'label',
      label: 'Plademærke',
      isRequired: false,
      value: label,
    },
    {
      type: 'text',
      name: 'recordNo',
      inputIdentifier: 'recordNo',
      label: 'Pladenummer',
      isRequired: false,
      value: recordNo,
    },
    {
      type: 'text',
      name: 'numOfRecords',
      inputIdentifier: 'numOfRecords',
      label: 'Antal LP(er)',
      isRequired: false,
      value: albumNo,
      error: errors.numOfRecords,
    },
    {
      type: 'text',
      name: 'price',
      inputIdentifier: 'price',
      label: 'Pris',
      isRequired: false,
      value: albumPrice,
      error: errors.price,
    },

    {
      type: 'textarea',
      name: 'origin',
      inputIdentifier: 'origin',
      label: 'Oprindelse',
      isRequired: false,
      value: origin,
    },
    {
      type: 'textarea',
      name: 'info',
      inputIdentifier: 'info',
      label: 'Værd at vide',
      isRequired: false,
      value: info,
    },
    {
      type: 'file',
      name: 'photo',
      inputIdentifier: 'cover',
      isRequired: false,
      previewClassName: 'image-preview-input',
    },
  ];

  const uploadedPhoto = photo ? `${endpoints.uploads}${photo}` : defaultImg;
  const { imgUpload } = CONTENT;
  const formObj = {
    inputs,
    btnText: 'Gem',
    onSubmit: handleSubmit,
    onChange: handleChange,
    onBlur: handleBlur,
    className: 'flex-wrapper flex-4',
    previewUrl,
    showPreviewImage: true,
    imgUpload,
    uploadedPhoto,
    file,
    altText: `${artist} ${title}`,
  };

  return (
    <Context.Provider value={formObj}>
      <section className="flex-wrapper create-album mobile-margin">
        <Form />
      </section>
    </Context.Provider>
  );
}

export default Update;
