import React from 'react'
import { useToDoStore } from '../../data/stores/useToDoStore'
import { InputPlus } from '../components/InputPlus'
import { InputTask } from '../components/InputTask'

import styles from './index.module.scss'
import moon from '../components/images/moon.svg'
import sun from '../components/images/sun.svg'

export const App: React.FC = () => {
  const [tasks, createTask, updateTask, removeTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ])

  const [theme, setTheam] = React.useState('dart')

  const shangeTheme = () => {
    setTheam(theme === 'dart' ? 'light' : 'dart')
  }

  React.useEffect(() => {
    const root = document.querySelector(':root') as HTMLElement

    root.style.setProperty('--background-default', `var(--background-${theme})`)
    root.style.setProperty(
      '--background-components-default',
      `var(--background-components-${theme})`,
    )
  }, [theme])

  return (
    <>
      <div className={styles.darck} onClick={shangeTheme}>
        {theme === 'dart' ? (
          <img src={moon} alt="moon" />
        ) : (
          <img src={sun} alt="sun" />
        )}
      </div>

      <h1 className={styles.title}>PERSONAL TASK MANAGER</h1>
      <div className={styles.wrap}>
        <section className={styles.wrapInputPlus}>
          <InputPlus
            onAdd={(title) => {
              if (title) {
                createTask(title)
              }
            }}
          />
        </section>
        <section className={styles.wrapTask}>
          {!tasks.length && <p className={styles.wrapText}>No tasks 🙁</p>}
          {tasks.map((task) => (
            <InputTask
              key={task.id}
              id={task.id}
              title={task.title}
              onDone={removeTask}
              onEdited={updateTask}
              onRemoved={removeTask}
            />
          ))}
        </section>
      </div>
    </>
  )
}
