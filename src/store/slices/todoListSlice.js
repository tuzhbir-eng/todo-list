import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import * as API from '../../api'

const initialState = {
  options: [],
  isFetching: false,
  error: null
}

export const getOptionThunk = createAsyncThunk(
  'options/getOption',
  async (payload, thunkAPI) => {
    try {
      const { data } = await API.getOption()
      return data //action.payload
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message }) //action.payload
    }
  }
)

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
  },

  extraReducers: builder => {
    builder.addCase(getOptionThunk.pending, (state, action) => {
      state.isFetching = true
      state.error = null
    })
    builder.addCase(getOptionThunk.fulfilled, (state, { payload }) => {
      state.options = payload.map(i => ({
        id: i.id,
        text: i.title,
        isDone: i.completed
      }))
      state.isFetching = false
    })
    builder.addCase(getOptionThunk.rejected, (state, { payload }) => {
      state.error = payload
      state.isFetching = false
    })
  }
})

const { reducer, actions } = todoListSlice

export const { deleteOne, addOption } = actions

export default reducer
