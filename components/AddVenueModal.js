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

function AddVenueModal({
  coords = null,
  address = null,
  isVisible,
  onClose,
  ...others
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUris, setImageUris] = useState([]);
  const [submissionOutcome, setSubmissionOutcome] = useState(null);
  const [isOpeningHoursModalVisible, setIsOpeningHoursModalVisible] =
    useState(false);

  const categories = useApi(categoriesApi.getCategories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await categories.request();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = () => {};
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
                  neighborhood: address.neighborhood || "",
                  name: "",
                  openingHours: null,
                  contactInfo: null,
                  category: null,
                  coords: coords,
                  type: "",
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
                      placeholder="Neighborhood (required)"
                      accessibilityLabel="Field for the venue neighborhood (required)"
                      value={values.neighborhood}
                      onChangeText={(text) =>
                        setFieldValue("neighborhood", text)
                      }
                    />
                    <AppText>Category (required)</AppText>
                    <DropdownList
                      items={categories.data}
                      fieldName="categories"
                      placeholder={"Select venue category (required)"}
                      value={values.category}
                      updateValue={(category) =>
                        setFieldValue("category", category)
                      }
                    />
                    <AppText>Venue Type (required)</AppText>
                    <AppText style={{ fontSize: 12 }}>
                      Example: 'Pharmacy' or 'Newsagent.
                    </AppText>
                    <AppTextInput
                      placeholder="Venue type (required)"
                      accessibilityLabel="Field for the venue type (required)"
                      value={values.type}
                      onChangeText={(text) => setFieldValue("type", text)}
                    />
                    <AppText>Opening Hours (optional)</AppText>
                    {values.openingHours &&
                      values.openingHours.map((hours) => (
                        <View
                          style={{
                            flexDirection: "row",
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
                    <AppText>Contact Info (optional)</AppText>
                    <AppButton
                      title="📞 Set Contact Info"
                      onPress={() => setIsOpeningHoursModalVisible(true)}
                    />
                    <OpeningHoursModal
                      isVisible={isOpeningHoursModalVisible}
                      onClose={() => setIsOpeningHoursModalVisible(false)}
                      onSubmit={(hours) => {
                        setFieldValue("openingHours", hours);
                        console.log(hours);
                        setIsOpeningHoursModalVisible(false);
                      }}
                    />
                  </View>
                )}
              </Formik>
            )}
          </HeaderContainer>
        </ScrollView>
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
