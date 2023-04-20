import {apiSlice} from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => `/tasks`,
        }),
        getTask: builder.query({
            query: (id) => `/tasks/${id}`,
        }),
        editTask: builder.mutation({
            query: ({id, data}) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted({id, data}, {queryFulfilled, dispatch}) {
                // optimistic cache update
                const pathResult = dispatch(
                    apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                        const taskIndex = draft?.findIndex(task => task.id == id);
                        if (taskIndex > -1) {
                            draft[taskIndex] = data;
                        }
                    })
                )
                // optimistic cache end
                try {
                    await queryFulfilled;
                } catch (err) {
                    pathResult.undo();
                }
            }
        }),
        addTask: builder.mutation({
            query: (data) => ({
                url: `/tasks`,
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    await queryFulfilled;
                    // pessimistic cache update
                    dispatch(apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                        draft.push({...arg, id: draft[draft.length - 1].id + 1})
                    }))
                } catch (err) {
                    console.log('error', err)
                }
            }
        }),
        deleteTask: builder.mutation({
            query: ({id}) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                // optimistic cache update
                const pathResult = dispatch(
                    apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                        const findIndex = draft?.findIndex(task => task.id == arg.id);
                        draft.splice(findIndex, 1);
                    })
                )
                // optimistic cache end
                try {
                    await queryFulfilled;
                } catch (err) {
                    pathResult.undo();
                }
            }
        })
    })
})

export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useEditTaskMutation,
    useDeleteTaskMutation,
    useAddTaskMutation
} = tasksApi;