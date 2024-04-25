import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";
import ListItemSeparator from "./ListItemSeparator";

const Accordion = ({ title, children, expanded = false, ...others }, style) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  console.log({ ...others });

  const toggleAccordion = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const iconName = isExpanded ? "chevron-down" : "chevron-right";

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleAccordion}
        testID="accordion-header"
        {...others}
      >
        <View style={styles.headerContent}>
          <AppText style={styles.headerText}>{title}</AppText>
        </View>
        <View testID="chevron-icon">
          <MaterialCommunityIcons
            name={iconName}
            color={colors.white}
            size={30}
          />
        </View>
      </TouchableOpacity>
      <ListItemSeparator />
      {isExpanded && (
        <View style={styles.content} testID="accordion-content">
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    overflow: "hidden",
    width: "100%",
  },
  header: {
    backgroundColor: colors.primary,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    color: colors.white,
    textAlign: "center",
  },
  content: {},
});

export default Accordion;
