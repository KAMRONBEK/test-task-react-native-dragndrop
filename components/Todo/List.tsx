import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import DraggableFlatList, { RenderItem } from 'react-native-draggable-flatlist';
import { todoStore } from '../../store/todo.store';
import RN from '../RN';
import Item from './Item';
import { Task } from '../../@types/todo.types';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { normalizeWidth } from '../../constants/dimensions';
import useVisibility from '../../hooks/useVisibility';
import Modal from './Modal';

const TodoList = () => {
  const db = useSQLiteContext();
  const data = toJS(todoStore.list);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const modalVisiblity = useVisibility();

  const handleDragEnd = useCallback(
    async ({ data: reorderedData }: { data: Task[] }) => {
      await todoStore.updateTaskPositions(db, reorderedData);
    },
    [db],
  );

  const handleEdit = useCallback(
    (taskId: number) => {
      setSelectedTaskId(taskId);
      modalVisiblity.show();
    },
    [modalVisiblity],
  );

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

  const renderRightActions = useCallback(
    (taskId: number) => (
      <>
        <RN.TouchableOpacity
          style={styles.button}
          onPress={() => handleEdit(taskId)}
        >
          <FontAwesome name={'edit'} size={24} color={COLORS.gray} />
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          style={styles.button}
          onPress={() => handleDelete(taskId)}
        >
          <FontAwesome name={'trash'} size={24} color={COLORS.orange} />
        </RN.TouchableOpacity>
      </>
    ),
    [handleDelete, handleEdit],
  );

  const renderItem: RenderItem<Task> = useCallback(
    ({ item, drag, isActive }) => (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <Item item={item} drag={drag} isActive={isActive} />
      </Swipeable>
    ),
    [renderRightActions],
  );

  return (
    <RN.View style={styles.container}>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={({ id, name }) => `${id} - ${name}`}
        onDragEnd={handleDragEnd}
      />
      <Modal
        isVisible={modalVisiblity.visible}
        onClose={() => {
          modalVisiblity.hide();
          setSelectedTaskId(null);
        }}
        taskId={selectedTaskId}
      />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: normalizeWidth(70),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default observer(TodoList);
