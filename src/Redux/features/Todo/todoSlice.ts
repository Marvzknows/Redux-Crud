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
    done: todoStatesType[]
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
    todos: [],
    done: []
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        AddTodo: (state, actions: PayloadAction<{todoTtitle: string, prioritization: PrioritizationType}>) => {
            
            if (!actions.payload.todoTtitle.trim() || actions.payload.todoTtitle.trim() === '') {
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

            state.todos.push(newTodo);
            state.error = false;
        },

        DoneTodo: (state, actions: PayloadAction<string>) => {
            const getDoneTodo = state.todos.find(item => item.id === actions.payload);
            if (!getDoneTodo) return;
            const newDoneTodo = {
                ...getDoneTodo,
                date_completed: GetCurrentDate()
            }
            state.done.push(newDoneTodo);
            // Remove the clicked done todo from the todo array
            state.todos = state.todos.filter(data => data.id !== actions.payload);
        },

        DeleteTodo: (state, actions: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== actions.payload);
        },

        EditTodo: (state, actions: PayloadAction<{ id: string, todoTtitle: string, prioritization: PrioritizationType }>) => {
            const { id, todoTtitle, prioritization } = actions.payload;
            state.todos = state.todos.map(todo =>
                todo.id === id ? { ...todo, title: todoTtitle, prioritization } : todo
            );
        }
    }
})

export const { AddTodo, DoneTodo, DeleteTodo, EditTodo } = todoSlice.actions
export default todoSlice.reducer;