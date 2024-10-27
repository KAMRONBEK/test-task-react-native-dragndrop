import React, { useCallback, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { todoStore } from '../../../store/todo.store';
import { Task } from '../../../@types/todo.types';
import RN from '../../RN';
import { addAlpha, COLORS } from '../../../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import { Alert } from 'react-native';

type ItemProps = {
  item: Task;
  drag: () => void;
  isActive: boolean;
};

export default function Item({ drag, isActive, item }: ItemProps) {
  const db = useSQLiteContext();
  const isChecked = useMemo(() => Boolean(item.isDone), [item]);

  const toggleCheckbox = useCallback(() => {
    todoStore.toggleTask(db, item.id);
  }, [db, item]);

  const handleEdit = useCallback((task: Task) => {
    todoStore.showModal(task);
  }, []);

  const handleDelete = useCallback(
    async (taskId: number) => {
      Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => await todoStore.deleteTask(db, taskId),
        },
      ]);
    },
    [db],
  );

  return (
    <RN.Pressable
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={toggleCheckbox}
      onLongPress={drag}
      delayLongPress={100}
    >
      <RN.View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
        {isChecked && <RN.Text style={styles.checkmark}>{'✓'}</RN.Text>}
      </RN.View>
      <RN.Text style={[styles.text, isChecked && styles.checkedText]}>
        {item.name}
      </RN.Text>

      <RN.View style={styles.buttonGroup}>
        <RN.TouchableOpacity
          style={styles.button}
          onPress={() => handleEdit(item)}
        >
          <FontAwesome name={'edit'} size={24} color={COLORS.gray} />
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          style={styles.button}
          onPress={() => handleDelete(item.id)}
        >
          <FontAwesome name={'trash'} size={24} color={COLORS.orange} />
        </RN.TouchableOpacity>
      </RN.View>
    </RN.Pressable>
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
    backgroundColor: addAlpha(COLORS.gray, 0.1),
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
    flex: 0.86,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: COLORS.gray,
  },
  buttonGroup: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
