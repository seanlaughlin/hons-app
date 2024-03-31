import React from "react";
import ImageInputList from "./ImageInputList";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";

function ImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
    console.log(values[name]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri != uri)
    );
  };
  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      {/* <ErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </>
  );
}

export default ImagePicker;