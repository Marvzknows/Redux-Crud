import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { AddTodo, ConsoleLogTodo, PrioritizationType } from "../Redux/features/Todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
// import { useAppSelector, useAppDispatch } from 'app/hooks'

const Home = () => {

  const [todoTitle, setTodoTitle] = useState('');
  const [prioritization, setPrioritization] = useState<PrioritizationType | string>('');

  // const todos = useSelector(state: RootState)
  const todos = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  const OnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // console.table({
    //   todoTitle,
    //   prioritization
    // })

    dispatch(AddTodo({
      todoTtitle: 'MARVZKNOWS',
      prioritization: 'Low'
    }))
  }

  return (
    <>
      <Box sx={{ minHeight: "100vh", bgcolor: "#eceff1", pt: 7 }}>
        <Container
          sx={{
            bgcolor: "whitesmoke",
            minHeight: "93vh",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
            borderRadius: 2,
            py: 2,
          }}
        >
          <Navbar />

          <form onSubmit={OnSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              <TextField
                label="Todo Title"
                defaultValue=""
                placeholder="Enter todo title"
                fullWidth
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Prioritization</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={prioritization}
                  label="Prioritization"
                  onChange={(e) => setPrioritization(e.target.value)}
                >
                  <MenuItem value={'Low'}>Low</MenuItem>
                  <MenuItem value={'Medium'}>Medium</MenuItem>
                  <MenuItem value={'High'}>High</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, fontWeight: 600 }}
            >
              ADD TO DO
            </Button>
          </form>

          <Button
              onClick={() => {
                console.log(todos)
              }}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 2, fontWeight: 600 }}
            >
              VIEW TO DO
            </Button>

          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default Home;
