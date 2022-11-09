import React from 'react'
import { useToDoStore } from '../../../data/stores/useToDoStore'

import styles from './index.module.scss'

interface InputPlusProps {
  onAdd: (title: string) => void
}

export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = React.useState('')
  const addTask = React.useCallback(() => {
    onAdd(inputValue)
    setInputValue('')
  }, [inputValue])

  const [tasks] = useToDoStore((state) => [state.tasks])

  return (
    <div className={styles.inputPlus}>
      {tasks.length ? (
        <div className={styles.inputPlusTusks}>{tasks.length} TASKS</div>
      ) : null}
      <input
        type="text"
        className={styles.inputPlusValue}
        value={inputValue}
        onChange={(evt) => {
          setInputValue(evt.target.value)
        }}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') {
            addTask()
          }
        }}
        placeholder="Task description..."
      />
      <button
        onClick={() => {
          addTask()
        }}
        className={styles.inputPlusButton}
      >
        SUBMIT TASK
      </button>
    </div>
  )
}
