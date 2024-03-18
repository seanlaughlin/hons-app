import { View } from "react-native";

import SelectableList from "./SelectableList";
import accessCriteriaApi from "../api/accessCriteria";
import { useEffect } from "react";
import accessibilityIconMapping from "../config/accessibilityIconMapping";
import Accordion from "./Accordion";

const AccessTab = () => {
  const accessCriteria = useApi(accessCriteriaApi.getAccessCriteria);

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

  return (
    <View>
      <SelectableList
        name="accessibilities"
        data={accessCriteria.data}
        iconMapping={accessibilityIconMapping}
        title="accessibilities"
      />
    </View>
  );
};

export default AccessTab;
