import { useSQLiteContext } from 'expo-sqlite';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import DraggableFlatList, { RenderItem } from 'react-native-draggable-flatlist';
import { Task } from '../../../@types/todo.types';
import { normalizeWidth } from '../../../constants/dimensions';
import { todoStore } from '../../../store/todo.store';
import RN from '../../RN';
import Item from './Item';

const TodoList = () => {
  const db = useSQLiteContext();
  const data = toJS(todoStore.list);

  const handleDragEnd = useCallback(
    async ({ data: reorderedData }: { data: Task[] }) => {
      await todoStore.updateTaskPositions(db, reorderedData);
    },
    [db],
  );

  const renderItem: RenderItem<Task> = useCallback(
    ({ item, drag, isActive }) => (
      <Item item={item} drag={drag} isActive={isActive} />
    ),
    [],
  );

  return (
    <RN.View style={styles.container}>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
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
  button: {
    width: normalizeWidth(70),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default observer(TodoList);
