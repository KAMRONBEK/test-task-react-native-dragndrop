import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { todoStore } from '../../store/todo.store';
import RN from '../RN';
import Item from './Item';

const TodoList = () => (
  <RN.View style={styles.container}>
    <DraggableFlatList
      data={toJS(todoStore.list)}
      renderItem={({ item, drag, isActive }) => (
        <Item item={item} drag={drag} isActive={isActive} />
      )}
      keyExtractor={(item) => item.id.toString()}
      onDragEnd={() => {}}
    />
  </RN.View>
);
const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default observer(TodoList);
