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

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
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
          paddingHorizontal: 10,
        }}
      >
        <HeaderContainer
          title="Search Filters"
          button={
            <CloseButton action={handleCloseModal} color={colors.white} />
          }
        ></HeaderContainer>
      </SafeAreaView>
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
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
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
