import { configureStore } from '@reduxjs/toolkit'
import todoListReducer from './slices/todoListSlice'
import userReducer from './slices/randomUserSlice'

//СТАРИЙ МЕТОД
// //сховище = стан + як змінювати стан (редюсер)
// const store = legacy_createStore(
//   counterReducer,
//   composeWithDevTools(applyMiddleware())
// )

const store = configureStore({
  reducer: {
    todoList: todoListReducer,
    user: userReducer
  }
})

export default store
