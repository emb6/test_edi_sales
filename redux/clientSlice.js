import { createSlice } from '@reduxjs/toolkit';
import { getClients } from './actions/clientAction';


const initialState = {
  loading: false,
  clietnInfo: {}, // for client object
  error: null,
  success: false, // for monitoring the login process.
}


export const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.clietnInfo = {}
      state.userToken = null
      state.error = null
    },
  },
  extraReducers: {
    [getClients.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getClients.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.clietnInfo = payload
    },
    [getClients.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { reset } = clientSlice.actions

export default clientSlice.reducer