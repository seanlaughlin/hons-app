import React, { useState } from "react";
import { Modal, SafeAreaView, useWindowDimensions } from "react-native";
import AppText from "./AppText";
import { Formik } from "formik";
import { TabView, TabBar } from "react-native-tab-view";
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
import { ScrollView } from "react-native";
import ContentContainer from "./ContentContainer";
import { View } from "react-native";
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
      <SafeAreaView
        style={{
          backgroundColor: colors.light,
          width: "100%",
        }}
      >
        <ScrollView>
          <ContentContainer style={{ paddingHorizontal: 0 }}>
            <Formik
              initialValues={{
                accessibilities: selectedAccessibilities || [],
                categories: selectedCategories || [],
                transportMode: transportMode || "walking",
                travelDuration: selectedTravelDuration || 10,
              }}
              onSubmit={handleSubmit}
            >
              <View>
                <Accordion title="Distance" expanded={true}>
                  <DistanceTab />
                </Accordion>
                <ListItemSeparator />
                <Accordion title="Access" expanded={true}>
                  <AccessTab />
                </Accordion>
                <ListItemSeparator />
                <Accordion title="Categories" expanded={true}>
                  <CategoriesTab />
                </Accordion>
              </View>
            </Formik>
          </ContentContainer>
        </ScrollView>
      </SafeAreaView>
      <AppButton
        style={{
          maxWidth: 180,
          alignSelf: "center",
          marginVertical: 10,
          position: "absolute",
          bottom: 35,
        }}
        title="✅ Apply Filters"
        onPress={handleSubmit}
      />
    </Modal>
  );
}

export default SearchFilterModal;
