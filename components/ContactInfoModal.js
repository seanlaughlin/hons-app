import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "./AppButton";
import DropdownList from "./DropdownList";
import colors from "../config/colors";
import AppText from "./AppText";
import HeaderContainer from "./HeaderContainer";
import CloseButton from "./CloseButton";
import contactOptions from "../config/contactOptions";
import AppTextInput from "./AppTextInput";
import capitalise from "../utility/capitalise";

function ContactInfoModal({ isVisible, onClose, onSubmit, values }) {
  const [selectedContactMethod, setSelectedContactMethod] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [contactInfo, setContactInfo] = useState(values);
  const [clearList, setClearList] = useState(false);
  const [detailsInputMode, setDetailsInputMode] = useState("text");

  const getDetailsInputMode = (contactMethod) => {
    switch (contactMethod) {
      case "email":
        return "email";
      case "web":
        return "url";
      case "phone":
        return "numeric";
      default:
        return "";
    }
  };

  useEffect(() => {
    const mode = getDetailsInputMode(selectedContactMethod);
    setDetailsInputMode(mode);
  }, [selectedContactMethod]);

  const handleAddContactDetails = () => {
    if (selectedContactMethod.trim() !== "" && contactDetails.trim() !== "") {
      const details = {
        [selectedContactMethod]: contactDetails,
      };
      setContactInfo([...contactInfo, details]);
      setContactDetails("");
      setSelectedContactMethod("");
      setClearList(!clearList);
    }
  };

  const handleRemoveContactDetails = (indexToRemove) => {
    setContactInfo(contactInfo.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <HeaderContainer
          title="Add Contact Info"
          button={
            <CloseButton color={colors.white} action={onClose} size={30} />
          }
          style={{ padding: 15 }}
        >
          <View style={styles.formContainer}>
            <AppText style={styles.title}>Set Contact Info</AppText>
            <DropdownList
              items={contactOptions.map((option) => ({ name: option }))}
              placeholder="Type (phone, web, email)"
              value={selectedContactMethod}
              updateValue={(value) => setSelectedContactMethod(value)}
              clear={clearList}
            />
            <AppTextInput
              placeholder="Contact info (phone number, web address, etc)"
              value={contactDetails}
              onChangeText={(text) => setContactDetails(text)}
              autoCapitalize="none"
              autoComplete="off"
              inputMode={detailsInputMode}
              editable={selectedContactMethod !== ""}
            />
            <AppButton
              title="Add Contact Info"
              onPress={handleAddContactDetails}
              style={{ marginTop: 5 }}
            />
            <View style={styles.contactInfoList}>
              <AppText style={styles.title}>Contact Info</AppText>
              {contactInfo.length > 0 ? (
                contactInfo.map((contact, index) => (
                  <View key={index} style={styles.row}>
                    {Object.entries(contact).map(([key, value]) => (
                      <React.Fragment key={key}>
                        <AppText>{capitalise(key)}: </AppText>
                        <AppText>{value}</AppText>
                      </React.Fragment>
                    ))}
                    <MaterialCommunityIcons
                      name="close-circle"
                      onPress={() => handleRemoveContactDetails(index)}
                      size={22}
                      color={colors.danger}
                    />
                  </View>
                ))
              ) : (
                <AppText>No contact info to display.</AppText>
              )}
            </View>
            <View style={{ flexDirection: "row", zIndex: -1 }}>
              <AppButton
                title="✅ Confirm"
                onPress={() => onSubmit(contactInfo)}
              />
              <AppButton title="❌ Cancel" onPress={onClose} />
            </View>
          </View>
        </HeaderContainer>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contactInfoList: {
    marginVertical: 20,
    zIndex: -1,
  },
  formContainer: {
    width: "100%",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
    overflow: "visible",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    columnGap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
});

export default ContactInfoModal;
