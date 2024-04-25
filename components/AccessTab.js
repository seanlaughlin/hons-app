import { View, StyleSheet } from "react-native";
import { useEffect } from "react";
import Checkbox from "expo-checkbox";

import SelectableList from "./SelectableList";
import accessCriteriaApi from "../api/accessCriteria";

import accessibilityIconMapping from "../config/accessibilityIconMapping";
import colors from "../config/colors";
import AppText from "./AppText";
import { useFormikContext } from "formik";
import useApi from "../hooks/useApi";

const AccessTab = () => {
  const accessCriteria = useApi(accessCriteriaApi.getAccessCriteria);
  const { setFieldValue, values } = useFormikContext();

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

  const updateCheckBox = (name) => {
    setFieldValue(name, !values[name]);
  };

  return (
    <View>
      <SelectableList
        name="accessibilities"
        data={accessCriteria.data}
        iconMapping={accessibilityIconMapping}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          columnGap: 10,
          margin: 10,
        }}
      >
        <View style={styles.checkbox}>
          <Checkbox
            color={values.showNoReviews ? colors.green : colors.border}
            style={{ width: 25, height: 25, borderRadius: 20 }}
            value={values.showNoReviews}
            onValueChange={() => updateCheckBox("showNoReviews")}
            accessibilityLabel="Checkbox to show no reviews in results"
            testID="checkbox-show-no-reviews"
          />
          <AppText>Show no reviews</AppText>
        </View>
        <View style={styles.checkbox}>
          <Checkbox
            color={values.showMixedReviews ? colors.green : colors.border}
            style={{ width: 25, height: 25, borderRadius: 20 }}
            value={values.showMixedReviews}
            onValueChange={() => updateCheckBox("showMixedReviews")}
            accessibilityLabel="Checkbox to show mixed reviews in results"
            testID="checkbox-show-mixed-reviews"
          />
          <AppText>Show mixed reviews</AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: "row",
    columnGap: 10,
  },
});

export default AccessTab;
