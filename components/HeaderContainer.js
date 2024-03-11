import React from "react";
import { View, StyleSheet } from "react-native";
import ContentContainer from "./ContentContainer";
import AppText from "./AppText";

import colors from "../config/colors";

function HeaderContainer({
  title,
  size = 30,
  button,
  children,
  ...otherProps
}) {
  return (
    <ContentContainer style={styles.container} {...otherProps}>
      <View style={styles.header}>
        {button}
        <View
          style={[styles.titleContainer, button ? { marginRight: 40 } : null]}
        >
          <AppText
            style={styles.title}
            accessibilityRole="header"
            numberOfLines={1}
          >
            {title}
          </AppText>
        </View>
      </View>
      {children}
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  header: {
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 2,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    color: colors.white,
    fontSize: 30,
  },
});

export default HeaderContainer;
