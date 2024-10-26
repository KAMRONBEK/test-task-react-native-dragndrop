import { useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import RN from '../../components/RN';
import { TodoInput, TodoList } from '../../components/Todo';
import { observer } from 'mobx-react-lite';
import { useSQLiteContext } from 'expo-sqlite';
import { todoStore } from '../../store/todo.store';

const HomeScreen = () => {
  const db = useSQLiteContext();

  const initialize = useCallback(async () => {
    todoStore.initialize(db);
  }, [db]);

  useEffect(() => {
    initialize();
  }, [initialize]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <RN.View style={styles.container}>
        <TodoList />
        <TodoInput />
      </RN.View>
    </SafeAreaView>
  );
};

const styles = RN.StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
});

export default observer(HomeScreen);
