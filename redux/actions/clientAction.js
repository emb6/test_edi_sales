import { createAsyncThunk } from '@reduxjs/toolkit';
import { getReactRequest } from '../../services/axiosReact';

export const getClients = createAsyncThunk(
    'client-listing',
    async (param, { rejectWithValue }) => {
        try {
            const queryParam = Object.keys(param)
                .map(k => k + '=' + param[k])
                .join('&');
            const url = `/client?${queryParam}`;
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