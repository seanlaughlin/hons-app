import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, SafeAreaView } from "react-native";
import { Formik } from "formik";
import HeaderContainer from "./HeaderContainer";
import CloseButton from "./CloseButton";
import colors from "../config/colors";
import { ScrollView } from "react-native";
import AppText from "./AppText";
import AppTextInput from "./AppTextInput";
import DropdownList from "./DropdownList";
import useApi from "../hooks/useApi";
import accessCriteriaApi from "../api/accessCriteria";
import SelectableIcon from "./SelectableIcon";
import ImageInput from "./ImageInput";
import AppButton from "./AppButton";
import reviewsApi from "../api/reviews";

function SubmitReviewModal({
  isModalVisible,
  setIsModalVisible,
  venue,
  ...others
}) {
  const accessCriteria = useApi(accessCriteriaApi.getAccessCriteria);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        await accessCriteria.request();
      } catch (error) {
        console.error("Error fetching accessCriteria:", error);
      }
    };
    fetchCriteria();
  }, []);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const result = await reviewsApi.saveReview(values);
    setIsLoading(true);
    if (result.ok) {
      resetForm();
    }
  };

  const handleSelectImage = (uri) => {
    setImageUri(uri);
    console.log(uri);
  };

  const [imageUri, setImageUri] = useState(null);

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={handleCloseModal}
      animationType="slide"
      {...others}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.light }}>
        <ScrollView
          style={{
            paddingHorizontal: 5,
          }}
        >
          <HeaderContainer
            title="Leave a Review"
            button={
              <CloseButton
                color={colors.white}
                action={handleCloseModal}
                size={30}
              />
            }
            style={{ paddingBottom: 15 }}
          >
            <AppText style={styles.subTitle} numberOfLines={1}>
              Leave an access review for {venue.name}
            </AppText>
            <AppText style={{ fontSize: 14 }}>
              This should be a short review on how the venue met or didn't meet
              a particular access need. Feel free to add an image!
            </AppText>
            <Formik
              initialValues={{
                user: "",
                accessCriteria: "",
                venueId: venue._id,
                comment: "",
                image: null,
                date: new Date(),
                for: true,
              }}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleSubmit, setFieldValue, values }) => (
                <View style={styles.formContainer}>
                  <AppTextInput
                    placeholder="Your name (optional)"
                    accessibilityLabel="Field for your name or alias (optional)"
                    value={values.user}
                    onChangeText={(text) => setFieldValue("user", text)}
                  />
                  <DropdownList
                    items={accessCriteria.data}
                    fieldName="accessCriteria"
                    placeholder={"Select access criteria"}
                  />
                  <View style={{ alignItems: "center" }}>
                    <AppText style={{ fontSize: 15 }}>
                      Did {venue.name} meet this access requirement?
                    </AppText>
                    <View style={styles.selectableIcons}>
                      <SelectableIcon
                        iconName="check-circle-outline"
                        size={50}
                        title="Yes"
                        selected={values.for === true}
                        onPress={() => setFieldValue("for", true)}
                        selectedColor={colors.green}
                      />
                      <SelectableIcon
                        iconName="close-outline"
                        size={50}
                        title="No"
                        selected={values.for === false}
                        onPress={() => setFieldValue("for", false)}
                        selectedColor={colors.danger}
                      />
                    </View>
                  </View>
                  {/* Include the ImageInput component */}
                  <AppText style={{ fontSize: 15, marginTop: 15 }}>
                    Tell us why (optional):
                  </AppText>
                  <View>
                    <AppTextInput
                      multiline
                      numberOfLines={4}
                      placeholder={"Your comments (optional)"}
                      style={{ height: 50, width: "100%" }}
                      value={values.comment}
                      onChangeText={(text) => setFieldValue("comment", text)}
                    />
                  </View>
                  <AppText style={{ fontSize: 15 }}>
                    Add an image (optional)
                  </AppText>
                  <View style={styles.imageInput}>
                    <ImageInput
                      imageUri={imageUri}
                      onChangeImage={(uri) => {
                        handleSelectImage(uri);
                        setFieldValue("image", uri);
                      }}
                    />
                    <AppText style={{ fontSize: 15 }}>
                      dsfdsfsdfdsfdsfdsf
                    </AppText>
                  </View>
                  <AppButton
                    title="✅ Submit Review"
                    style={{ marginVertical: 10 }}
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </HeaderContainer>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {},
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    paddingHorizontal: 20,
    rowGap: 5,
  },
  imageInput: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: "100%",
  },
  selectableIcons: {
    flexDirection: "row",
    columnGap: 30,
  },
  subTitle: {
    margin: 5,
  },
});

export default SubmitReviewModal;
