import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as API from '../../api'

const initialState = {
  user: null,
  userFetching: false,
  userError: null
}

export const getUserThunk = createAsyncThunk(
  'user/getUser',
  async (payload, thunkAPI) => {
    try {
      const { data } = await API.getUser()
      return data //action.payload
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message }) //action.payload
    }
  }
)

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getUserThunk.pending, (state, action) => {
      state.userFetching = true
      state.userError = null
    })
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.user = payload.results[0]
      state.userFetching = false
    })
    builder.addCase(getUserThunk.rejected, (state, { payload }) => {
      state.userError = payload
      state.userFetching = false
    })
  }
})

const { reducer, actions } = userSlice

export default reducer
