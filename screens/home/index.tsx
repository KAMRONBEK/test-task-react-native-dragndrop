import { SafeAreaView } from "react-native";
import RN from "../../components/RN";
import { TodoInput, TodoList } from "../../components/Todo";

const HomeScreen = () => {
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
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
  },
});

export default HomeScreen;
