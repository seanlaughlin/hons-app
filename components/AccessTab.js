import { View } from "react-native";

import SelectableList from "./SelectableList";
import accessCriteriaApi from "../api/accessCriteria";
import { useEffect } from "react";
import accessibilityIconMapping from "../config/accessibilityIconMapping";
import AppText from "./AppText";

const AccessTab = () => {
  const accessCriteria = useApi(accessCriteriaApi.getAccessCriteria);

  useEffect(() => {
    accessCriteria.request();
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
