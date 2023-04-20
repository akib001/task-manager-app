import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    checkedProjects: [],
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setCheckedProjects: (state, action) => {
            state.checkedProjects = action.payload;
        }
    }
})

export const {setCheckedProjects} = projectsSlice.actions;
export default projectsSlice.reducer;