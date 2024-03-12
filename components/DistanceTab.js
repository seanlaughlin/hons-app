import { View } from "react-native";
import Slider from "@react-native-community/slider";

import AppText from "./AppText";
import colors from "../config/colors";
import { useState } from "react";
import { useFormikContext } from "formik";
import SelectableIcon from "./SelectableIcon";

const DistanceTab = () => {
  const { setFieldValue, values } = useFormikContext();
  const [sliderValue, setSliderValue] = useState(values.travelDuration);

  const handlePress = (option) => {
    setFieldValue("transportMode", option);
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setFieldValue("travelDuration", value);
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <AppText style={{ fontSize: 18 }}>
        I want to arrive at my destination in (approx.)...
      </AppText>
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}
      >
        <AppText>5 min</AppText>
        <Slider
          style={{ width: 250, height: 50 }}
          minimumValue={5}
          maximumValue={60}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.medium}
          step={5}
          onValueChange={handleSliderChange}
          value={sliderValue}
          tapToSeek={true}
        />
        <AppText>60 min</AppText>
      </View>
      <AppText>{sliderValue} minutes</AppText>
      <View style={{ margin: 25, alignItems: "center" }}>
        <AppText style={{ fontSize: 20, marginBottom: 15 }}>
          ...and my method of travel is...
        </AppText>
        <View style={{ flexDirection: "row", columnGap: 40 }}>
          <SelectableIcon
            iconName="walk"
            title="Walking"
            selected={values["transportMode"] === "walking"}
            onPress={() => handlePress("walking")}
          />
          <SelectableIcon
            iconName="wheelchair-accessibility"
            title="Wheeling"
            selected={values["transportMode"] === "wheeling"}
            onPress={() => handlePress("wheeling")}
          />
        </View>
      </View>
    </View>
  );
};

export default DistanceTab;
