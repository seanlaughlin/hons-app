import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Accordion = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>
      {isExpanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#f1f1f1",
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
});

export default Accordion;
