import { createSlice } from '@reduxjs/toolkit';
import { getDashboard } from './actions/dashboardAction';


const initialState = {
  loading: false,
  corethemesInfo: {}, 
  error: null,
  success: false, // for monitoring the login process.
}


export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.corethemesInfo = {}
      state.userToken = null
      state.error = null
    },
  },
  extraReducers: {
    [getDashboard.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getDashboard.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.corethemesInfo = payload
    },
    [getDashboard.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { reset } = dashboardSlice.actions

export default dashboardSlice.reducer