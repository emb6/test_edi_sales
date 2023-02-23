import { createAsyncThunk } from '@reduxjs/toolkit';
import { getReactRequest } from '../../services/axiosReact';

export const getGlobalConf = createAsyncThunk(
    'globalconfig',
    async (param, { rejectWithValue }) => {
        try {
            const url = `/globalConfig`;
            const { data } = await getReactRequest(url);
            return { ...data }
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);