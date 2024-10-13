import { Box, Button, Card, CardActions, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { DeleteTodo, DoneTodo, PrioritizationType } from '../Redux/features/Todo/todoSlice';
import { useOutletContext } from 'react-router-dom';
import { useGetUsersQuery, useAddUserMutation } from '../Redux/features/ApiSlice/apiSlice';

export const DisplayPrioritization = (prioritization: PrioritizationType) => {
  const prioritizationBgColorMap: Record<PrioritizationType, string> = {
    Low: 'primary.light',
    Medium: 'warning.light',
    High: 'error.light',
  };

  return (
    <Typography
      bgcolor={prioritizationBgColorMap[prioritization]}
      fontSize={12}
      color={'white'}
      px={1}
      textAlign={'center'}
      borderRadius={1}
    >
      {prioritization}
    </Typography>
  );
};

type OutletContextType = {
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>,
  setPrioritization: React.Dispatch<React.SetStateAction<PrioritizationType>>,
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>,
  setEditId: React.Dispatch<React.SetStateAction<string>>,
}

const ViewTodo = () => {

  const todos = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();
  const { setTodoTitle, setPrioritization, setIsModify, setEditId } = useOutletContext<OutletContextType>();

  const { data, isError, isLoading } = useGetUsersQuery('user');
  const [createUser, {isLoading: createLoading, isError: createErr}] = useAddUserMutation();

  const HandleModify = (id: string) => {
    const getEditData = todos.todos.find(todo => todo.id === id);
    if (!getEditData) return;
    setEditId(id);
    setIsModify(true);
    setTodoTitle(getEditData?.title);
    setPrioritization(getEditData.prioritization);
  }

  const HandleAddUser = async() => {
    const newUser = {
      id: Date.now().toString(),
      name: 'MjMilsotns',
      age: 3
    }

    try {
      const response = await createUser(newUser).unwrap();
      console.log(response);
    } catch (error) {
      console.log("Error: ", error);
    }

  }

  return (
    <>
      <Box display={"flex"} flexWrap={'wrap'} gap={1.5} mt={3}>
        {todos && todos.todos &&
          todos.todos.map((item, index) => (
            <Card key={item.id} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  # {index + 1}
                </Typography>
                <Typography variant="h5" component="div">
                  {item.title}
                </Typography>
                {item.prioritization && DisplayPrioritization(item.prioritization)}
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography fontSize={'12px'} mt={1} sx={{ color: "text.secondary" }}>
                    Date Added: {item.date_added}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'center', gap: '1' }}>
                <Button onClick={() => dispatch(DoneTodo(item.id))} fullWidth variant='contained' size="small" color='success' sx={{ textTransform: 'none' }}>Done</Button>
                <Button onClick={() => dispatch(DeleteTodo(item.id))} fullWidth variant='contained' size="small" color='error' sx={{ textTransform: 'none' }}>Delete</Button>
                <Button onClick={() => HandleModify(item.id)} fullWidth variant='contained' size="small" color='primary' sx={{ textTransform: 'none' }}>Modify</Button>
              </CardActions>
            </Card>
          ))}
      </Box>
      {/* API DATA */}
      <br />
      <hr></hr>
      <Box mt={1} display={"flex"} flexWrap={'wrap'} gap={1.5}>
        <Button onClick={HandleAddUser} fullWidth variant='outlined' size="small" color='primary' sx={{ textTransform: 'none', margin: '10px' }}>
          { createLoading ? 'Loading....' : 'ADD USER' }
        </Button>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{
                color: "text.secondary",
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              #
            </Typography>
            <Typography variant="h5" component="div">
              TITLE
            </Typography>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography fontSize={'12px'} mt={1} sx={{ color: "text.secondary" }}>
                Completed:
              </Typography>
            </Box>
          </CardContent>

        </Card>
      </Box>
    </>
  );
}

export default ViewTodo;