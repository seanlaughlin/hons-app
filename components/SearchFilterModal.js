// SearchFilterModal.js

import React from "react";
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

function SearchFilterModal({ isModalVisible, setIsModalVisible, ...others }) {
  const {
    selectedAccessibilities,
    setSelectedAccessibilities,
    selectedCategories,
    setSelectedCategories,
  } = useFilterContext();

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "distance", title: "Distance" },
    { key: "access", title: "Access" },
    { key: "categories", title: "Categories" },
  ]);

  const renderScene = ({ route, props }) => {
    switch (route.key) {
      case "access":
        return <AccessTab {...props} />;
      case "distance":
        return <DistanceTab {...props} />;
      case "categories":
        return <CategoriesTab {...props} />;
      default:
        return null;
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    setSelectedAccessibilities(values.accessibilities);
    setSelectedCategories(values.categories);
    handleCloseModal();
  };

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={handleCloseModal}
      animationType="slide"
      {...others}
    >
      <SafeAreaView style={{ flexDirection: "row", justifyContent: "center" }}>
        <CloseButton action={handleCloseModal} />
        <AppText style={{ fontSize: 35, color: colors.primary }}>
          Search Filters
        </AppText>
      </SafeAreaView>
      <Formik
        initialValues={{
          accessibilities: selectedAccessibilities || [],
          categories: selectedCategories || [],
        }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit }) => (
          <>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              style={{ marginTop: 20 }}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: colors.secondary }}
                  style={{ backgroundColor: colors.primary }}
                  labelStyle={{ color: colors.white }}
                />
              )}
            />
            <AppButton
              style={{
                maxWidth: 180,
                alignSelf: "center",
                marginVertical: 10,
                position: "absolute",
                bottom: 20,
              }}
              title="✅ Apply Filters"
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </Modal>
  );
}

export default SearchFilterModal;
