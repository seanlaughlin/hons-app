import { View } from "react-native";
import Slider from "@react-native-community/slider";

import AppText from "./AppText";
import colors from "../config/colors";

const DistanceTab = () => {
  return (
    <>
      <AppText style={{ fontSize: 20 }}>
        I want to arrive at my destination in...
      </AppText>
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}
      >
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
};

export default DistanceTab;
