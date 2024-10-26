import { SQLiteDatabase } from 'expo-sqlite';
import { makeAutoObservable } from 'mobx';
import { Alert } from 'react-native';
import { Task } from '../@types/todo.types';
import { addTask, getTasks } from '../db';

class TodoStore {
  list: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Update the task list with a new array
  private updateList(newList: Task[]) {
    this.list = newList;
  }

  // Initialize the task list from the database
  initialize = async (db: SQLiteDatabase) => {
    try {
      const tasks = await getTasks(db);
      if (tasks) {
        this.updateList(tasks);
      }
    } catch (error) {
      console.error('[Error-initialize]:', error);
    }
  };

  // Create a new task
  create = async (
    { db, newTask }: { db: SQLiteDatabase; newTask: string },
    callback?: () => void,
  ) => {
    if (!newTask.trim()) {
      Alert.alert('Oops!', 'Please enter a valid task!');
      return;
    }

    try {
      await addTask(db, newTask);
      await this.initialize(db);
      callback?.(); // Call the optional callback if provided
    } catch (error) {
      console.error('[Error-create]:', error);
      Alert.alert('Opps!', 'Failed to create task. Please try again.');
    }
  };
}

export const todoStore = new TodoStore();
