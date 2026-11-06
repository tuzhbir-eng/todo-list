import { legacy_connect } from 'react-redux'
import { deleteOne, addOption } from '../store/slices/todoListSlice'
import { useState, useEffect } from 'react'
import { getOptionThunk } from '../store/slices/todoListSlice'
import { FaTrash } from 'react-icons/fa'
import styles from './style/ReduxToolkit.module.sass'
import { getUserThunk } from '../store/slices/randomUserSlice'

function TodoItem ({ option, deleteOption }) {
  const [done, setDone] = useState(option.isDone)
  return (
    <li className={`${styles.option} ${done ? styles.done : ''}`}>
      <label>
        <input
          type='checkbox'
          name='option1'
          checked={done}
          onChange={() => setDone(prev => !prev)}
        />
        <span>{option.text}</span>
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

function TodoList ({
  error,
  isFetching,
  options,
  deleteOption,
  newOption,
  getOption,
  getUser,
  user
}) {
  const [text, setText] = useState('')

  const handleAdd = e => {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    newOption(value)
    setText('')
  }
  useEffect(() => {
    getOption()
    getUser()
  }, [])

  return (
    <>
      {isFetching && <div>Please wait, Loading...</div>}
      {error && <div>Error</div>}
      {!isFetching && !error && (
        <div>
          <header>
            <div className={styles.headContainer}>
              <h1>TODO</h1>
              <div>
                {user && (
                  <div className={styles.userContainer}>
                    <img
                      className={styles.userImg}
                      src={user.picture.large}
                      alt='userImg'
                    />
                    <h2 className={styles.userName}>
                      {user.name.first} {user.name.last}
                    </h2>
                    <p className={styles.userEmail}>{user.email}</p>
                  </div>
                )}
              </div>
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
      )}
    </>
  )
}

const mapStateToProps = ({ todoList, user }) => ({
  ...todoList,
  user: user.user
})

const mapDispatchToProps = dispatch => ({
  deleteOption: id => dispatch(deleteOne(id)),
  newOption: text => dispatch(addOption(text)),
  getOption: () => dispatch(getOptionThunk()),
  getUser: () => dispatch(getUserThunk())
})

export default legacy_connect(mapStateToProps, mapDispatchToProps)(TodoList)
