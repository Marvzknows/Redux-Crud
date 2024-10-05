import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PrioritizationType = "Low" | "High" | "Medium"

type todoStatesType = {
    id: string
    title: string,
    date_added: string,
    date_completed: string | null,
    prioritization: PrioritizationType,
}

type initialStateType = {
    todos: todoStatesType[],
    error: boolean,
}

const GetCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

const initialState: initialStateType = {
    error: false,
    todos: []
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        AddTodo: (state, actions: PayloadAction<{todoTtitle: string, prioritization: PrioritizationType}>) => {
            
            if (!actions.payload.todoTtitle.trim() || actions.payload.todoTtitle.trim() === '') {
                console.log('FAILED')
                state.error = true;
                return;
            }
            const newTodo = {
                id: Date.now().toString(),
                title: actions.payload.todoTtitle,
                date_added: GetCurrentDate(),
                date_completed: null,
                prioritization: actions.payload.prioritization,
            }

            console.log('SUCCESS')
            state.todos.push(newTodo);
            state.error = false;
        },

        ConsoleLogTodo: (state) => {
            console.log("TODO LISTS: ", JSON.parse(JSON.stringify(state)));
        }
    }
})

export const { AddTodo, ConsoleLogTodo } = todoSlice.actions
export default todoSlice.reducer;