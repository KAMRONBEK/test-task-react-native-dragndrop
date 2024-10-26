import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { todoStore } from '../../store/todo.store';
import RN from '../RN';
import Item from './Item';
import { Task } from '../../@types/todo.types';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback } from 'react';

const TodoList = () => {
  const data = toJS(todoStore.list);
  const db = useSQLiteContext();

  const handleDragEnd = useCallback(
    async ({ data: reorderedData }: { data: Task[] }) => {
      await todoStore.updateTaskPositions(db, reorderedData);
    },
    [db],
  );

  return (
    <RN.View style={styles.container}>
      <DraggableFlatList
        data={data}
        renderItem={({ item, drag, isActive }) => (
          <Item item={item} drag={drag} isActive={isActive} />
        )}
        keyExtractor={({ id, name }) => `${id} - ${name}`}
        onDragEnd={handleDragEnd}
      />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default observer(TodoList);
