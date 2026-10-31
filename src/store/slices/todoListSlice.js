import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  options: [
    {
      id: uuidv4(),
      text: 'First',
      isSelected: false
    },
    {
      id: uuidv4(),
      text: 'Second',
      isSelected: false
    }
  ]
}

const todoListSlice = createSlice({
  initialState,
  name: 'todo',
  reducers: {
    deleteOne: (state, { payload }) => {
      state.options = state.options.filter(o => o.id !== payload)
    },
    addOption: (state, { payload }) => {
      state.options.push({
        id: uuidv4(),
        text: payload,
        isSelected: false
      })
    }
  }
})

const { reducer, actions } = todoListSlice

export const { deleteOne, addOption } = actions

export default reducer
