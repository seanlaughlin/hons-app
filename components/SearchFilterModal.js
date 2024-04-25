import React, { useState } from "react";
import { Modal, SafeAreaView, ScrollView, View } from "react-native";
import { Formik } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CloseButton from "./CloseButton";
import colors from "../config/colors";
import AppButton from "./AppButton";
import AccessTab from "./AccessTab";
import DistanceTab from "./DistanceTab";
import CategoriesTab from "./CategoriesTab";
import { useFilterContext } from "../context/FilterContext";
import HeaderContainer from "./HeaderContainer";
import Accordion from "./Accordion";
import ListItemSeparator from "./ListItemSeparator";
import AppText from "./AppText";
import VenueTypesTab from "./VenueTypesTab";

function SearchFilterModal({ isModalVisible, setIsModalVisible, ...others }) {
  const {
    selectedAccessibilities,
    setSelectedAccessibilities,
    selectedCategories,
    setSelectedCategories,
    selectedTypes,
    setSelectedTypes,
    transportMode,
    setTransportMode,
    selectedTravelDuration,
    setSelectedTravelDuration,
    showNoReviews,
    setShowNoReviews,
    showMixedReviews,
    setShowMixedReviews,
  } = useFilterContext();

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    setSelectedAccessibilities(values.accessibilities);
    setSelectedCategories(values.categories);
    setSelectedTypes(values.types);
    setTransportMode(values.transportMode);
    setSelectedTravelDuration(values.travelDuration);
    setShowNoReviews(values.showNoReviews);
    setShowMixedReviews(values.showMixedReviews);
    handleCloseModal();
  };

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
          <Formik
            initialValues={{
              accessibilities: selectedAccessibilities || [],
              categories: selectedCategories || [],
              types: selectedTypes || [],
              transportMode: transportMode || "walking",
              travelDuration: selectedTravelDuration || 10,
              showNoReviews: showNoReviews,
              showMixedReviews: showMixedReviews,
            }}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit }) => (
              <>
                <HeaderContainer
                  title="Search Filters"
                  button={
                    <CloseButton
                      action={handleCloseModal}
                      color={colors.white}
                      style={{ flex: 1 }}
                      testID="close-button"
                      accessibilityRole="button"
                      accessibilityLabel="Close Button"
                    />
                  }
                >
                  <ListItemSeparator />
                  <Accordion
                    title="Distance"
                    expanded={true}
                    accessibilityRole="button"
                    accessibilityLabel="Distance filters button"
                  >
                    <DistanceTab />
                  </Accordion>
                  <Accordion
                    title="Access"
                    accessibilityRole="button"
                    accessibilityLabel="Accessibility filters button"
                  >
                    <AccessTab />
                  </Accordion>
                  <Accordion
                    title="Categories"
                    accessibilityRole="button"
                    accessibilityLabel="Venue category filters button"
                  >
                    <CategoriesTab />
                  </Accordion>
                  <Accordion
                    title="Venue Types"
                    accessibilityRole="button"
                    accessibilityLabel="Venue type filters button"
                  >
                    <VenueTypesTab />
                  </Accordion>
                </HeaderContainer>
                <View
                  style={{
                    maxWidth: 180,
                    alignSelf: "center",
                    marginVertical: 10,
                    position: "absolute",
                    top: 5,
                    right: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Apply button"
                >
                  <MaterialCommunityIcons
                    name="check-circle"
                    color={colors.white}
                    size={30}
                    onPress={handleSubmit}
                  />
                  <AppText style={{ color: colors.white, fontSize: 12 }}>
                    Apply
                  </AppText>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default SearchFilterModal;
