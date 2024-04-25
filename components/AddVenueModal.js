import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import HeaderContainer from "./HeaderContainer";
import CloseButton from "./CloseButton";
import colors from "../config/colors";
import AppText from "./AppText";
import useApi from "../hooks/useApi";
import categoriesApi from "../api/categories";
import AppTextInput from "./AppTextInput";
import OpeningHoursModal from "./OpeningHoursModal";
import AppButton from "./AppButton";
import ContactInfoModal from "./ContactInfoModal";
import capitalise from "../utility/capitalise";
import ImagePicker from "./ImagePicker";
import venuesApi from "../api/venues";
import { useVenueContext } from "../context/VenueContext";
import LoadingModal from "./LoadingModal";
import typesApi from "../api/types";
import FormField from "./FormField";
import FormDropDown from "./FormDropDown";

function AddVenueModal({
  coords = null,
  address = null,
  isVisible,
  onClose,
  ...others
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [submissionOutcome, setSubmissionOutcome] = useState(null);
  const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false);
  const [isOpeningHoursModalVisible, setIsOpeningHoursModalVisible] =
    useState(false);
  const [isContactInfoModalVisible, setIsContactInfoModalVisible] =
    useState(false);

  const categories = useApi(categoriesApi.getCategories);
  const types = useApi(typesApi.getTypes);

  const { fetchVenues } = useVenueContext();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).max(40).label("Access Criteria"),
    neighbourhood: Yup.string().required().label("Neighbourhood"),
    address: Yup.string().required().label("Address"),
    category: Yup.string().required().label("Category"),
    type: Yup.string().required().label("Venue Type"),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await categories.request();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchTypes = async () => {
      try {
        await types.request();
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };
    fetchCategories();
    fetchTypes();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    setSubmissionOutcome(null);
    setIsLoadingModalVisible(true);
    try {
      const result = await venuesApi.saveVenue(values);
      setIsLoading(true);
      if (result.ok) {
        setSubmissionOutcome("Saved!");
        fetchVenues();
        resetForm();
      } else {
        setSubmissionOutcome("Error");
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={handleCloseModal}
      animationType="slide"
      {...others}
      testID="modal"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{
            paddingHorizontal: 5,
          }}
        >
          <HeaderContainer
            title="Add a New Venue"
            button={
              <CloseButton
                color={colors.white}
                action={handleCloseModal}
                size={30}
                testID="close-button"
              />
            }
            style={{ paddingBottom: 15 }}
          >
            {address && (
              <Formik
                initialValues={{
                  address: address.address || "",
                  neighbourhood: address.neighborhood || "",
                  name: "",
                  openingHours: [],
                  contactInfo: {},
                  category: null,
                  coords: coords,
                  type: null,
                  imageUris: [],
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ handleChange, handleSubmit, setFieldValue, values }) => (
                  <View style={styles.formContainer}>
                    <AppText>Venue Name (required)</AppText>
                    <FormField
                      placeholder="Venue name (required)"
                      accessibilityLabel="Field for the venue name (required)"
                      name="name"
                      testID="venue-name-field"
                    />
                    <AppText>Venue Address (required)</AppText>
                    <AppTextInput
                      placeholder="Venue address (required)"
                      accessibilityLabel="Field for the venue address (required)"
                      value={values.address}
                      onChangeText={(text) => setFieldValue("address", text)}
                    />
                    <AppText>Neighborhood (required)</AppText>
                    <FormField
                      placeholder="Neighbourhood (required)"
                      accessibilityLabel="Field for the venue neighbourhood (required)"
                      name="neighbourhood"
                    />
                    <AppText>Category (required)</AppText>
                    <FormDropDown
                      data={categories.data.map((category) => ({
                        name: category.title,
                      }))}
                      name="category"
                      placeholder={"Select venue category (required)"}
                      style={{ zIndex: 500 }}
                      testID="category-drop-down"
                    />
                    <AppText>Venue Type (required)</AppText>
                    <FormDropDown
                      data={types.data.map((type) => ({
                        name: type.title,
                      }))}
                      name="type"
                      placeholder={"Select venue type (required)"}
                    />
                    <AppText>Opening Hours (optional)</AppText>
                    <View style={{ marginVertical: 5 }}>
                      {values.openingHours &&
                        values.openingHours.map((hours) => (
                          <View
                            style={{
                              flexDirection: "row",
                              alignSelf: "flex-start",
                              margin: 5,
                            }}
                          >
                            <AppText style={{ fontSize: 15 }}>
                              {hours.days}:{" "}
                            </AppText>
                            <AppText style={{ fontSize: 15 }}>
                              {hours.hours}
                            </AppText>
                          </View>
                        ))}
                      <AppButton
                        title="🕒 Set Opening Hours"
                        onPress={() => setIsOpeningHoursModalVisible(true)}
                        testID="opening-hours-button"
                      />
                    </View>

                    <AppText>Contact Info (optional)</AppText>
                    <View>
                      {values.contactInfo &&
                        Object.entries(values.contactInfo).map(
                          ([key, value]) => (
                            <View key={key}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignSelf: "flex-start",
                                  margin: 5,
                                }}
                              >
                                <AppText style={{ fontSize: 15 }}>
                                  {capitalise(key)}:{" "}
                                </AppText>
                                <AppText style={{ fontSize: 15 }}>
                                  {value}
                                </AppText>
                              </View>
                            </View>
                          )
                        )}
                      <AppButton
                        title="📞 Set Contact Info"
                        onPress={() => setIsContactInfoModalVisible(true)}
                        testID="contact-info-button"
                      />
                    </View>

                    <OpeningHoursModal
                      isVisible={isOpeningHoursModalVisible}
                      onClose={() => setIsOpeningHoursModalVisible(false)}
                      onSubmit={(hours) => {
                        setFieldValue("openingHours", hours);
                        setIsOpeningHoursModalVisible(false);
                      }}
                      values={values.openingHours}
                    />
                    <ContactInfoModal
                      isVisible={isContactInfoModalVisible}
                      onClose={() => setIsContactInfoModalVisible(false)}
                      onSubmit={(info) => {
                        setFieldValue("contactInfo", info);
                        setIsContactInfoModalVisible(false);
                      }}
                      values={values.contactInfo}
                    />
                    <AppText>Upload Images (optional)</AppText>
                    <AppText style={{ fontSize: 12 }}>
                      💡 Tap the camera icon to add images.
                    </AppText>
                    <View
                      style={{
                        alignSelf: "center",
                      }}
                    >
                      <ImagePicker name="imageUris" />
                    </View>
                    <AppButton title="✅ Submit" onPress={handleSubmit} />
                  </View>
                )}
              </Formik>
            )}
          </HeaderContainer>
        </ScrollView>
        <LoadingModal
          isLoading={isLoading}
          message={"Saving..."}
          isVisible={isLoadingModalVisible}
          setIsVisible={handleCloseModal}
          outcome={submissionOutcome}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    paddingHorizontal: 20,
    paddingVertical: 10,
    rowGap: 5,
  },
});

export default AddVenueModal;
