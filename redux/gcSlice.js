import { createSlice } from '@reduxjs/toolkit';
import { getGlobalConf } from './actions/gcAction';


const initialState = {
  loading: false,
  globalConfInfo: {}, 
  error: null,
  success: null, // for monitoring the login process.
}


export const gcSlice = createSlice({
  name: 'globalconfig',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.globalConfInfo = {}
      state.userToken = null
      state.error = null
    },
  },
  extraReducers: {
    [getGlobalConf.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getGlobalConf.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.globalConfInfo = payload
    },
    [getGlobalConf.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { reset } = gcSlice.actions

export default gcSlice.reducer