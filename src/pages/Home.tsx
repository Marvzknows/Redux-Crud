import { Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Navbar from "../component/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AddTodo, EditTodo, PrioritizationType } from "../Redux/features/Todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { DisplayPrioritization } from "./ViewTodo";

const Home = () => {

  const location = useLocation();
  const [todoTitle, setTodoTitle] = useState('');
  const [prioritization, setPrioritization] = useState<PrioritizationType>('Low');
  const [ErrorMessage, setErrorMessage] = useState('');
  const [isModify, setIsModify] = useState(false);
  const [ediId, setEditId] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const todoState = useSelector((state: RootState) => state.todo);
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

    if(isModify) {
      dispatch(EditTodo({
        id: ediId,
        todoTtitle: todoTitle,
        prioritization: prioritization
      }))

      setIsModify(false);
      setTodoTitle('');
      setErrorMessage('');
      return;
    }

    dispatch(AddTodo({
      todoTtitle: todoTitle,
      prioritization: prioritization
    }))

    setTodoTitle('');
    setErrorMessage('');
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
             display: "flex",
             flexDirection: "column",
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
                 helperText={error || ErrorMessage ? ErrorMessage : ""}
                 label="Todo Title"
                 defaultValue=""
                 placeholder="Enter todo title"
                 fullWidth
                 value={todoTitle}
                 onChange={(e) => {
                   setTodoTitle(e.target.value);
                 }}
               />

               <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">
                   Prioritization
                 </InputLabel>
                 <Select
                   labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   value={prioritization}
                   label="Prioritization"
                   onChange={(e) =>
                     setPrioritization(e.target.value as PrioritizationType)
                   }
                 >
                   <MenuItem value={"Low"}>Low</MenuItem>
                   <MenuItem value={"Medium"}>Medium</MenuItem>
                   <MenuItem value={"High"}>High</MenuItem>
                 </Select>
               </FormControl>
             </Box>

             <Button
               type="submit"
               fullWidth
               variant="contained"
               sx={{ mt: 2, fontWeight: 600 }}
             >
               {isModify ? "SAVE CHANGES" : "ADD TO DO"}
             </Button>

             {isModify && (
               <Button
                 onClick={() => {
                  setIsModify(false);
                  setTodoTitle('');
                  setPrioritization('Low');
                 }}
                 type="button"
                 fullWidth
                 variant="contained"
                 color="inherit"
                 sx={{ mt: 2, fontWeight: 600 }}
               >
                 CANCEL
               </Button>
             )}
           </form>

           {location.pathname === "/" && (
             <Box
               my={4}
               boxShadow={"inherit"}
               sx={{
                 flexGrow: 1,
                 display: "flex",
                 flexDirection: "column",
                 borderRadius: "5px",
               }}
             >
               <Alert severity="success">Done Todo Lists</Alert>

               <TableContainer component={Paper}>
                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
                   <TableHead>
                     <TableRow>
                       <TableCell sx={{ fontWeight: "900" }}>#</TableCell>
                       <TableCell align="center">Todo Name</TableCell>
                       <TableCell align="center">Date Completed</TableCell>
                       <TableCell align="center">Prioritization</TableCell>
                     </TableRow>
                   </TableHead>
                   <TableBody>
                     {todoState.done.map((row, index) => (
                       <TableRow
                         key={row.id}
                         sx={{
                           "&:last-child td, &:last-child th": { border: 0 },
                         }}
                       >
                         <TableCell
                           sx={{ fontWeight: "900" }}
                           component="th"
                           scope="row"
                         >
                           {index + 1}
                         </TableCell>
                         <TableCell align="center">{row.title}</TableCell>
                         <TableCell align="center">
                           {row.date_completed}
                         </TableCell>
                         <TableCell align="center">
                           {DisplayPrioritization(row.prioritization)}
                         </TableCell>
                       </TableRow>
                     ))}
                   </TableBody>
                 </Table>
               </TableContainer>
             </Box>
           )}

           <Outlet context={{ setTodoTitle, setPrioritization, setIsModify, setEditId }} />
         </Container>
       </Box>
     </>
   );
};

export default Home;
