import React from "react";
import ImageInputList from "./ImageInputList";
import { useFormikContext } from "formik";
import { View } from "react-native";

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
    <View testID="image-input">
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
    </View>
  );
}

export default ImagePicker;
