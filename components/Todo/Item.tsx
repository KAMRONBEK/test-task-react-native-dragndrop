import React, { useState } from 'react';
import { Task } from '../../@types/todo.types';
import { addAlpha, COLORS } from '../../constants/colors';
import RN from '../RN';

type ItemProps = {
  item: Task;
  drag: () => void;
  isActive: boolean;
};

export default function Item({ drag, isActive, item }: ItemProps) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <RN.TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]} // Change style if active
      onPress={toggleCheckbox}
      onLongPress={drag} // Start dragging on long press
      delayLongPress={100} // Optional: Delay for long press recognition
    >
      <RN.View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
        {isChecked && <RN.Text style={styles.checkmark}>{'✓'}</RN.Text>}
      </RN.View>
      <RN.Text style={[styles.text, isChecked && styles.checkedText]}>
        {item.name} {/* Display task name from item */}
      </RN.Text>
    </RN.TouchableOpacity>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  activeContainer: {
    backgroundColor: addAlpha(COLORS.gray, 0.1), // Change background color when active
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: addAlpha(COLORS.gray, 0.2),
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  checkmark: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: COLORS.gray,
  },
});
