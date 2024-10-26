import { useState } from "react";
import { addAlpha, COLORS } from "../../constants/colors";
import RN from "../RN";

export default () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <RN.TouchableOpacity style={styles.container} onPress={toggleCheckbox}>
      <RN.View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
        {isChecked && <RN.Text style={styles.checkmark}>✓</RN.Text>}
      </RN.View>
      <RN.Text style={[styles.text, isChecked && styles.checkedText]}>
        Item Title
      </RN.Text>
    </RN.TouchableOpacity>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 6,
    marginHorizontal: 15,
    backgroundColor: COLORS.white,
    borderRadius: 25,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: addAlpha(COLORS.gray, 0.2),
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCheckbox: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  checkmark: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
  },
  checkedText: {
    textDecorationLine: "line-through",
    color: COLORS.gray,
  },
});
