import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Formik } from "formik";

import HeaderContainer from "./HeaderContainer";
import CloseButton from "./CloseButton";
import colors from "../config/colors";
import AppText from "./AppText";
import useApi from "../hooks/useApi";
import categoriesApi from "../api/categories";
import AppTextInput from "./AppTextInput";
import DropdownList from "./DropdownList";
import OpeningHoursModal from "./OpeningHoursModal";
import AppButton from "./AppButton";
import ContactInfoModal from "./ContactInfoModal";
import capitalise from "../utility/capitalise";
import ImagePicker from "./ImagePicker";
import venuesApi from "../api/venues";
import { useVenueContext } from "../context/VenueContext";
import LoadingModal from "./LoadingModal";
import typesApi from "../api/types";

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
    console.log(values);
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
                  contactInfo: [],
                  category: null,
                  coords: coords,
                  type: null,
                  imageUris: [],
                }}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleSubmit, setFieldValue, values }) => (
                  <View style={styles.formContainer}>
                    <AppText>Venue Name (required)</AppText>
                    <AppTextInput
                      placeholder="Venue name (required)"
                      accessibilityLabel="Field for the venue name (required)"
                      value={values.name}
                      onChangeText={(text) => setFieldValue("name", text)}
                    />
                    <AppText>Venue Address (required)</AppText>
                    <AppTextInput
                      placeholder="Venue address (required)"
                      accessibilityLabel="Field for the venue name (required)"
                      value={values.address}
                      onChangeText={(text) => setFieldValue("address", text)}
                    />
                    <AppText>Neighborhood (required)</AppText>
                    <AppTextInput
                      placeholder="Neighbourhood (required)"
                      accessibilityLabel="Field for the venue neighbourhood (required)"
                      value={values.neighbourhood}
                      onChangeText={(text) =>
                        setFieldValue("neighbourhood", text)
                      }
                    />
                    <AppText>Category (required)</AppText>
                    <DropdownList
                      items={categories.data.map((category) => ({
                        name: category.title,
                      }))}
                      fieldName="categories"
                      placeholder={"Select venue category (required)"}
                      value={values.category}
                      updateValue={(category) =>
                        setFieldValue("category", category)
                      }
                      style={{ zIndex: 500 }}
                    />
                    <AppText>Venue Type (required)</AppText>
                    <DropdownList
                      items={types.data.map((type) => ({
                        name: type.title,
                      }))}
                      fieldName="types"
                      placeholder={"Select venue type (required)"}
                      value={values.type}
                      updateValue={(type) => setFieldValue("type", type)}
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
                      />
                    </View>

                    <AppText>Contact Info (optional)</AppText>
                    <View>
                      {values.contactInfo &&
                        values.contactInfo.map((contact) => (
                          <View key={contact.id}>
                            {Object.entries(contact).map(([key, value]) => (
                              <View
                                key={key}
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
                            ))}
                          </View>
                        ))}
                      <AppButton
                        title="📞 Set Contact Info"
                        onPress={() => setIsContactInfoModalVisible(true)}
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
