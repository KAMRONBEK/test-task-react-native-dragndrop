import { SQLiteDatabase } from "expo-sqlite";

export async function initializeDB(db: SQLiteDatabase) {
  try {
    await db.execAsync(`
      PRAGMA journal_mode=WAL;

      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT (datetime('now', 'localtime')),
        isDone BOOLEAN DEFAULT 0,  -- 0 if not done, 1 if done
        position INTEGER,          -- Position for ordering tasks in drag and drop
        UNIQUE (id, position)      -- Unique constraint to ensure unique position index
      );
    `);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

async function addTask(db: SQLiteDatabase, taskName: string): Promise<void> {
  const query = "INSERT INTO tasks (name) VALUES (?);";
  await db.runAsync(query, [taskName]);
}

async function deleteTask(db: SQLiteDatabase, taskId: number): Promise<void> {
  const query = "DELETE FROM tasks WHERE id = ?;";
  await db.runAsync(query, [taskId]);
}

async function editTask(
  db: SQLiteDatabase,
  taskId: number,
  newTaskName: string
): Promise<void> {
  const query = "UPDATE tasks SET name = ? WHERE id = ?;";
  await db.runAsync(query, [newTaskName, taskId]);
}

async function updateTaskPosition(
  db: SQLiteDatabase,
  taskId: number,
  newPosition: number
): Promise<void> {
  const query = "UPDATE tasks SET position = ? WHERE id = ?;";
  await db.runAsync(query, [newPosition, taskId]);
}

async function getTasks(db: SQLiteDatabase): Promise<any> {
  const query = "SELECT * FROM tasks;";
  const result = await db.getAllAsync(query);
  return result;
}
