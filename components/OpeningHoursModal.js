import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "./AppButton";
import DropdownList from "./DropdownList";
import colors from "../config/colors";
import AppText from "./AppText";
import HeaderContainer from "./HeaderContainer";
import CloseButton from "./CloseButton";
import hourStrings from "../config/hourStrings";

function OpeningHoursModal({ isVisible, onClose, onSubmit, values }) {
  const [selectedStartDay, setSelectedStartDay] = useState("");
  const [selectedEndDay, setSelectedEndDay] = useState("");
  const [opensAt, setOpensAt] = useState("");
  const [closesAt, setClosesAt] = useState("");
  const [openingHours, setOpeningHours] = useState(values);
  const [clearList, setClearList] = useState(false);

  const handleAddOpeningHours = () => {
    if (selectedStartDay && opensAt.trim() !== "") {
      const newOpeningHours = {
        days:
          selectedEndDay && selectedStartDay !== selectedEndDay
            ? selectedStartDay + " - " + selectedEndDay
            : selectedStartDay,
        hours:
          opensAt === "Closed" || closesAt === "Closed"
            ? "Closed"
            : opensAt + " - " + closesAt,
      };
      setOpeningHours([...openingHours, newOpeningHours]);
      setSelectedStartDay("");
      setSelectedEndDay("");
      setOpensAt("");
      setClosesAt("");
      setClearList(!clearList);
    }
  };

  const handleRemoveOpeningHours = (indexToRemove) => {
    setOpeningHours(openingHours.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <HeaderContainer
          title="Add Opening Hours"
          button={
            <CloseButton color={colors.white} action={onClose} size={30} />
          }
          style={{ padding: 15 }}
        >
          <View style={styles.formContainer}>
            <AppText style={styles.title}>Set Opening Hours</AppText>
            <View style={{ flexDirection: "row", columnGap: 5, zIndex: 600 }}>
              <DropdownList
                items={[
                  { name: "Mon" },
                  { name: "Tues" },
                  { name: "Wed" },
                  { name: "Thurs" },
                  { name: "Fri" },
                  { name: "Sat" },
                  { name: "Sun" },
                ]}
                placeholder="Start Day"
                value={selectedStartDay}
                updateValue={(value) => setSelectedStartDay(value)}
                style={{ flex: 2 }}
                clear={clearList}
              />
              <DropdownList
                items={[
                  { name: "Mon" },
                  { name: "Tues" },
                  { name: "Wed" },
                  { name: "Thurs" },
                  { name: "Fri" },
                  { name: "Sat" },
                  { name: "Sun" },
                ]}
                placeholder="End Day (Optional)"
                value={selectedEndDay}
                updateValue={(value) => setSelectedEndDay(value)}
                style={{ flex: 2 }}
                clear={clearList}
              />
            </View>
            <View style={{ flexDirection: "row", columnGap: 5 }}>
              <DropdownList
                placeholder="Opens (24H)"
                value={opensAt}
                updateValue={(text) => setOpensAt(text)}
                items={hourStrings.map((hour) => ({ name: hour }))}
                style={{ flex: 2 }}
                clear={clearList}
              />
              <DropdownList
                placeholder="Closes (24H)"
                value={closesAt}
                updateValue={(text) => setClosesAt(text)}
                items={hourStrings.map((hour) => ({ name: hour }))}
                style={{ flex: 2 }}
                clear={clearList}
              />
            </View>
            <AppButton
              title="Add Opening Hours"
              onPress={handleAddOpeningHours}
              style={{ zIndex: -1 }}
            />
          </View>
          <View style={styles.hoursList}>
            <AppText style={styles.title}>Hours Added</AppText>
            {openingHours.length > 0 ? (
              openingHours.map((hour, index) => (
                <View key={index} style={styles.row}>
                  <AppText>{hour.days}: </AppText>
                  <AppText>{hour.hours}</AppText>
                  <MaterialCommunityIcons
                    name="close-circle"
                    onPress={() => handleRemoveOpeningHours(index)}
                    size={22}
                    color={colors.danger}
                  />
                </View>
              ))
            ) : (
              <AppText>No hours to display.</AppText>
            )}
          </View>
          <View style={{ flexDirection: "row", zIndex: -1 }}>
            <AppButton
              title="✅ Confirm"
              onPress={() => onSubmit(openingHours)}
            />
            <AppButton title="❌ Cancel" onPress={onClose} />
          </View>
        </HeaderContainer>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
    overflow: "visible",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  hoursList: {
    marginBottom: 20,
    zIndex: -1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    columnGap: 5,
  },
  formContainer: {
    width: "100%",
    padding: 15,
  },
  removeButton: {
    marginLeft: 10,
  },
});

export default OpeningHoursModal;
