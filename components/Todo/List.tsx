import { SQLiteDatabase } from "expo-sqlite";
import RN from "../RN";
import Item from "./Item";
import { FC } from "react";
import { todoStore } from "../../store/todo.store";
import DraggableFlatList from "react-native-draggable-flatlist";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

type Props = {
  db: SQLiteDatabase;
};

const TodoList: FC<Props> = ({ db }) => {
  return (
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
};
const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default observer(TodoList);
