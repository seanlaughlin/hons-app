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

function SearchFilterModal({ isModalVisible, setIsModalVisible, ...others }) {
  const {
    selectedAccessibilities,
    setSelectedAccessibilities,
    selectedCategories,
    setSelectedCategories,
    transportMode,
    setTransportMode,
    selectedTravelDuration,
    setSelectedTravelDuration,
  } = useFilterContext();

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    setSelectedAccessibilities(values.accessibilities);
    setSelectedCategories(values.categories);
    setTransportMode(values.transportMode);
    setSelectedTravelDuration(values.travelDuration);
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
              transportMode: transportMode || "walking",
              travelDuration: selectedTravelDuration || 10,
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
                    />
                  }
                >
                  <ListItemSeparator />
                  <Accordion title="Distance" expanded={true}>
                    <DistanceTab />
                  </Accordion>
                  <Accordion title="Access">
                    <AccessTab />
                  </Accordion>
                  <Accordion title="Categories">
                    <CategoriesTab />
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
