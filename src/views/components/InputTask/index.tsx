import React from 'react'

import styles from './index.module.scss'

import read from '../images/read.svg'
import del from '../images/del.svg'
import gal from '../images/gal.svg'

interface InputTuskProps {
  id: string
  title: string
  onDone: (id: string) => void
  onEdited: (id: string, title: string) => void
  onRemoved: (id: string) => void
}

export const InputTask: React.FC<InputTuskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = React.useState(false)
  const [isEditMode, setIsEditMode] = React.useState(false)
  const [value, setValue] = React.useState(title)
  const editTitleInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus()
    }
  }, [isEditMode])

  return (
    <div className={styles.inputTusk}>
      <label className={styles.inputTuskCheckbox}>
        <input
          type="checkbox"
          checked={checked}
          disabled={isEditMode}
          onChange={(evt) => {
            setChecked(evt.target.checked)
            if (evt.target.checked) {
              setTimeout(() => {
                onDone(id)
              }, 1000)
            }
          }}
        />
        <div className={styles.inputTuskText}></div>
      </label>
      <div className={styles.inputTuskWrap}>
        {isEditMode ? (
          <input
            ref={editTitleInputRef}
            value={value}
            onChange={(evt) => {
              setValue(evt.target.value)
            }}
            className={styles.inputTuskTitleEdit}
            onKeyDown={(evt) => {
              if (evt.key === 'Enter') {
                onEdited(id, value)
                setIsEditMode(false)
              }
            }}
          />
        ) : (
          <h3 className={styles.inputTuskTitle}>{title}</h3>
        )}
        <div className={styles.inputTuskBtn}>
          {isEditMode ? (
            <button
              className={styles.inputTuskEdit}
              onClick={() => {
                onEdited(id, value)
                setIsEditMode(false)
              }}
            >
              <img src={gal} alt="gal" />
            </button>
          ) : (
            <button
              className={styles.inputTuskEdit}
              onClick={() => {
                setIsEditMode(true)
              }}
            >
              <img src={read} alt="read" />
            </button>
          )}

          <button
            className={styles.inputTuskDelite}
            onClick={() => {
              onRemoved(id)
            }}
          >
            <img src={del} alt="read" />
          </button>
        </div>
      </div>
    </div>
  )
}
