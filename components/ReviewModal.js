import React from "react";
import { StyleSheet, Modal } from "react-native";

function ReviewModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      style={styles.container}
      visible={isModalVisible}
      onRequestClose={handleCloseModal}
      animationType="fade"
      {...others}
    ></Modal>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ReviewModal;
