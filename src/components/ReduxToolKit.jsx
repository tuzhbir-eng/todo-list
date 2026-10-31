import { legacy_connect } from 'react-redux'
import styles from './ReduxToolkit.module.sass'
import { deleteOne, addOption } from '../store/slices/todoListSlice'
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'

function TodoItem ({ option, deleteOption }) {
  const [done, setDone] = useState(false)
  return (
    <li className={`${styles.option} ${done ? styles.done : ''}`}>
      <label>
        <input
          type='checkbox'
          name='option1'
          checked={done}
          onChange={() => setDone(prev => !prev)}
        />
        {option.text}
        <button
          type='button'
          onClick={o => {
            o.stopPropagation()
            deleteOption(option.id)
          }}
          className={styles.deleteBtn}
        >
          <FaTrash />
        </button>
      </label>
    </li>
  )
}

function TodoList ({ options, deleteOption, newOption }) {
  const [text, setText] = useState('')

  const handleAdd = e => {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    newOption(value)
    setText('')
  }

  return (
    <div>
      <header>
        <div className={styles.headContainer}>
          <h1>TODO</h1>
        </div>
      </header>
      <main>
        <form className={styles.form} onSubmit={handleAdd}>
          <label className={styles.createInputContainer}>
            <input
              className={styles.createInput}
              type='text'
              name='todo'
              placeholder='Create a new todo...'
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <button
              className={styles.addBtn}
              type='button'
              name='addBtn'
              onClick={handleAdd}
            >
              Add
            </button>
          </label>
          <ul className={styles.listContainer}>
            {options.map(o => (
              <TodoItem key={o.id} option={o} deleteOption={deleteOption} />
            ))}
          </ul>
        </form>
      </main>
      <footer></footer>
    </div>
  )
}

const mapStateToProps = state => {
  return state.todoList
}

const mapDispatchToProps = dispatch => {
  return {
    deleteOption: id => dispatch(deleteOne(id)),
    newOption: text => dispatch(addOption(text))
  }
}

const withAccessToStore = legacy_connect(mapStateToProps, mapDispatchToProps)

export default withAccessToStore(TodoList)
