import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/home";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDB } from "./db";

export default function App() {
  return (
    <SQLiteProvider databaseName={"app.db"} onInit={initializeDB}>
      <SafeAreaProvider>
        <HomeScreen />
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}
