import { SQLiteDatabase } from 'expo-sqlite';
import { makeAutoObservable } from 'mobx';
import { Alert } from 'react-native';
import { Task } from '../@types/todo.types';
import {
  addTask,
  getTasks,
  updateTaskPosition,
  deleteTask as dbDeleteTask,
  toggleTaskStatus,
} from '../db';

class TodoStore {
  list: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Update the task list with a new array
  updateList(newList: Task[]) {
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
      Alert.alert('Oops!', 'Failed to create task. Please try again.');
    }
  };

  // Delete a task
  deleteTask = async (db: SQLiteDatabase, taskId: number) => {
    try {
      await dbDeleteTask(db, taskId); // Delete from database
      // Update the list in the store
      this.updateList(this.list.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('[Error-deleteTask]:', error);
      Alert.alert('Oops!', 'Failed to delete task. Please try again.');
    }
  };

  // Toggle the isDone status of a task
  toggleTask = async (db: SQLiteDatabase, taskId: number) => {
    try {
      await toggleTaskStatus(db, taskId); // Update in the database
      // Update the list in the store
      const updatedList = this.list.map((task) =>
        task.id === taskId ? { ...task, isDone: Number(!task.isDone) } : task,
      );
      this.updateList(updatedList);
    } catch (error) {
      console.error('[Error-toggleTask]:', error);
    }
  };

  // Update task positions in the database after drag-and-drop
  updateTaskPositions = async (db: SQLiteDatabase, newOrder: Task[]) => {
    this.updateList(newOrder); // Update the list in the store with the new order

    try {
      // Use Promise.all with map to update each task position in the database
      await Promise.all(
        newOrder.map((task, index) => updateTaskPosition(db, task.id, index)),
      );
      console.log('Positions updated successfully in the database');
    } catch (error) {
      console.error('[Error-updateTaskPositions]:', error);
      Alert.alert(
        'Oops!',
        'Failed to update task positions. Please try again.',
      );
    }
  };
}

export const todoStore = new TodoStore();
