import React, { useCallback, useEffect, useState } from 'react';
import RNModal from 'react-native-modal';
import { todoStore } from '../../store/todo.store';
import { useSQLiteContext } from 'expo-sqlite';
import { addAlpha, COLORS } from '../../constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BlurView } from 'expo-blur';
import RN from '../RN';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  taskId: number | null;
}

const EditModal: React.FC<ModalProps> = ({ isVisible, onClose, taskId }) => {
  const [taskValue, setTaskValue] = useState('');
  const db = useSQLiteContext();

  const handleSave = useCallback(async () => {
    if (taskId && taskValue.trim()) {
      await todoStore.editTask(db, taskId, taskValue);
      onClose();
    }
  }, [db, onClose, taskId, taskValue]);

  useEffect(() => {
    if (!taskId) return;

    const task = todoStore.findOneTask(taskId);
    if (!task) return;

    setTaskValue(task.name);
  }, [taskId]);

  return (
    <RNModal
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0.5} // Adjust backdrop opacity for effect
      onBackdropPress={onClose} // Close modal when clicking outside
    >
      <BlurView intensity={15} style={styles.blurContainer}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          style={styles.container}
          extraScrollHeight={20}
          contentContainerStyle={styles.modal}
        >
          <RN.View style={styles.modalContent}>
            <RN.TextInput
              value={taskValue}
              onChangeText={setTaskValue}
              style={styles.input}
              placeholder={'Edit your task'}
            />
            <RN.View style={styles.buttonContainer}>
              <RN.TouchableOpacity style={styles.button} onPress={handleSave}>
                <RN.Text style={styles.buttonText}>{'Save'}</RN.Text>
              </RN.TouchableOpacity>
              <RN.TouchableOpacity style={styles.button} onPress={onClose}>
                <RN.Text style={styles.buttonText}>{'Cancel'}</RN.Text>
              </RN.TouchableOpacity>
            </RN.View>
          </RN.View>
        </KeyboardAwareScrollView>
      </BlurView>
    </RNModal>
  );
};

const styles = RN.StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  container: {
    borderRadius: 20,
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: addAlpha(COLORS.gray, 0.5),
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default EditModal;
