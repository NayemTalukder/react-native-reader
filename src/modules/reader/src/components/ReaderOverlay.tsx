import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View, Dimensions, StatusBar } from "react-native";

const { width: sw, height: sh } = Dimensions.get('window');

const ReaderOverlay = (props: any) => (
  <View>
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.backPress} >

      {/* Modal Content */}
      <View style={styles.modalView}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  </View>
);

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    height: sh,
    width: sw,
    backgroundColor: "#312E43",
    alignItems: "center",
    justifyContent: 'center',
  },
});

export default ReaderOverlay;