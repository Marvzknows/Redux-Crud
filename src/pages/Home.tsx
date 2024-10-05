import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AddTodo, PrioritizationType } from "../Redux/features/Todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";

const Home = () => {

  const [todoTitle, setTodoTitle] = useState('');
  const [prioritization, setPrioritization] = useState<PrioritizationType>('Low');
  const [ErrorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const todoState = useSelector((state: RootState) => state.todo)
  const { error } = todoState;

  useEffect(() => {
    if (error) {
      setErrorMessage('Invalid Todo Title');
    } else {
      if (todoTitle.trim() !== '') {
        setErrorMessage('');
        setTodoTitle('');
      }
    }
  }, [error]);

  const OnSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    dispatch(AddTodo({
      todoTtitle: todoTitle,
      prioritization: prioritization
    }))
  }

  return (
    <>
      <Box sx={{ minHeight: "100vh", bgcolor: "#eceff1", pt: 7 }}>
        <Container
          sx={{
            bgcolor: "whitesmoke",
            minHeight: "90vh",
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
                error={error || ErrorMessage.length !== 0}
                helperText={error || ErrorMessage ? ErrorMessage : ''}
                label="Todo Title"
                defaultValue=""
                placeholder="Enter todo title"
                fullWidth
                value={todoTitle}
                onChange={(e) => {
                  setTodoTitle(e.target.value)
                }}
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Prioritization</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={prioritization}
                  label="Prioritization"
                  onChange={(e) => setPrioritization(e.target.value as PrioritizationType)}
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
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default Home;
