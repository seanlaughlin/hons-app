import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  SafeAreaView,
  useWindowDimensions,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import AppText from "./AppText";
import { Formik } from "formik";
import SelectableList from "./SelectableList";
import accessibleCategories from "../mockdata/accessibleCategories";
import accessibilityIconMapping from "../config/accessibilityIconMapping";
import categories from "../mockdata/categories";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import CloseButton from "./CloseButton";
import colors from "../config/colors";
import AppButton from "./AppButton";

const AccessTab = () => (
  <View style={{ flex: 1 }}>
    <SelectableList
      name="accessibilities"
      data={accessibleCategories}
      iconMapping={accessibilityIconMapping}
      title="Access"
    />
  </View>
);
const DistanceLocationTab = () => (
  <>
    <AppText style={{ fontSize: 20 }}>
      I want to arrive at my destination in...
    </AppText>
    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}>
      <AppText>&lt; 5 min</AppText>
      <Slider
        style={{ width: 250, height: 50 }}
        minimumValue={0}
        maximumValue={60}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.medium}
      />
      <AppText>Any time</AppText>
    </View>
  </>
);

const CategoryTab = () => (
  <View style={{ flex: 1 }}>
    <SelectableList
      name="accessibilities"
      data={categories}
      title="Venue Categories"
    />
  </View>
);

const renderScene = ({ route, props }) => {
  switch (route.key) {
    case "access":
      return <AccessTab {...props} />;
    case "distance":
      return <DistanceLocationTab {...props} />;
    case "categories":
      return <CategoryTab {...props} />;
    default:
      return null;
  }
};

function SearchFilterModal({ isModalVisible, setIsModalVisible, ...others }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "distance", title: "Distance" },
    { key: "access", title: "Access" },
    { key: "categories", title: "Categories" },
  ]);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    console.log("Filter submit", values);
    handleCloseModal();
  };

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={handleCloseModal}
      animationType="slide"
      {...others}
      style={styles.container}
    >
      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <CloseButton action={handleCloseModal} />
        <AppText style={{ fontSize: 35, color: colors.primary }}>
          Search Filters
        </AppText>
      </SafeAreaView>
      <Formik
        initialValues={{
          accessibilities: [...accessibleCategories],
          categories: [...categories],
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
});

export default SearchFilterModal;
