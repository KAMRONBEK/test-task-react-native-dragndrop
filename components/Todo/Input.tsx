import { MaterialIcons } from "@expo/vector-icons";
import RN from "../RN";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addAlpha, COLORS } from "../../constants/colors";

export default () => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.keyboardContainer}>
      <RN.View style={styles.container}>
        <RN.TextInput
          placeholder="Enter the task"
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          placeholderTextColor={COLORS.gray}
        />
        <RN.TouchableOpacity style={styles.sendButton}>
          <MaterialIcons name="send" size={22} color={COLORS.white} />
        </RN.TouchableOpacity>
      </RN.View>
    </KeyboardAwareScrollView>
  );
};

const styles = RN.StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginHorizontal: 15,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: addAlpha(COLORS.gray, 0.1),
    marginRight: 10,
    shadowColor: COLORS.black3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sendButton: {
    backgroundColor: COLORS.orange,
    padding: 12,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    shadowColor: addAlpha(COLORS.orange, 0.3),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});