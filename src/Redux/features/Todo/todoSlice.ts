import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PrioritizationType = "Low" | "High" | "Medium"

type todoStatesType = {
    id: string
    title: string,
    date_added: string,
    date_completed: string,
    prioritization: PrioritizationType,
}[]

const todoStates: todoStatesType = [];

const GetCurrentDate = () => {
    const date = new Date;
    const day = date.getDay();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return `${day}/${month}/${year}`;
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: todoStates,
    reducers: {
        // Add Todo
        AddTodo: (state, actions: PayloadAction<{todoTtitle: string, prioritization: PrioritizationType}>) => {
            const newTodo = {
                id: Date.now().toString(),
                title: actions.payload.todoTtitle,
                date_added: GetCurrentDate(),
                date_completed: '',
                prioritization: actions.payload.prioritization,
            }

            state.push(newTodo)
        },

        ConsoleLogTodo: (state) => {
            console.log("TODO LISTS: ", JSON.parse(JSON.stringify(state)));
        }
    }
})

export const { AddTodo, ConsoleLogTodo } = todoSlice.actions
export default todoSlice.reducer;