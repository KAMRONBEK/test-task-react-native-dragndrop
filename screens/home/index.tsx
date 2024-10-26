import { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import RN from '../../components/RN';
import { TodoInput, TodoList } from '../../components/Todo';
import { observer } from 'mobx-react-lite';
import { useSQLiteContext } from 'expo-sqlite';
import { todoStore } from '../../store/todo.store';
import { isAndroid } from '../../constants/platform';

const HomeScreen = () => {
  const db = useSQLiteContext();

  useEffect(() => {
    const initialize = async () => {
      try {
        await todoStore.initialize(db);
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    initialize();
  }, [db]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <RN.View style={styles.container}>
        <TodoList />
        <TodoInput />
      </RN.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    ...(isAndroid && {
      paddingTop: 30,
    }),
  },
});

export default observer(HomeScreen);
