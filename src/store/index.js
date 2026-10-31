import { configureStore } from '@reduxjs/toolkit'
import todoListReducer from './slices/todoListSlice'

//СТАРИЙ МЕТОД
// //сховище = стан + як змінювати стан (редюсер)
// const store = legacy_createStore(
//   counterReducer,
//   composeWithDevTools(applyMiddleware())
// )

const store = configureStore({
  reducer: {
    todoList: todoListReducer
  }
})

export default store
