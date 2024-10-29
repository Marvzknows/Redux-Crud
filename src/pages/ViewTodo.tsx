import { Box, Button, Card, CardActions, CardContent, Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { DeleteTodo, DoneTodo, PrioritizationType } from '../Redux/features/Todo/todoSlice';
import { useOutletContext } from 'react-router-dom';
import { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } from '../Redux/features/ApiSlice/apiSlice';

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

  const { data: userList, isError, isLoading, refetch } = useGetUsersQuery('user', {
    refetchOnMountOrArgChange: true, // Refetch every-onmount
  });
  const [createUser, {isLoading: createLoading, isError: createErr}] = useAddUserMutation();
  const [deleteUser, {isLoading: isDeleting}] = useDeleteUserMutation()

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
      age: Date.now()
    }

    try {
      const response = await createUser(newUser).unwrap();
      console.log(response);
      refetch();
    } catch (error) {
      console.log("Error: ", error);
    }

  }

  const HandleDeleteUser = async(id: string) => {
    console.log(id)
    try {
      const response = await deleteUser(id).unwrap();
      console.log("Deleted data: ", response)
      refetch();
    } catch (error) {
      console.log("Error: ", error)
    }

    
  }

  return (
    <>
      <Box display={"flex"} flexWrap={"wrap"} gap={1.5} mt={3}>
        {todos &&
          todos.todos &&
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
                {item.prioritization &&
                  DisplayPrioritization(item.prioritization)}
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography
                    fontSize={"12px"}
                    mt={1}
                    sx={{ color: "text.secondary" }}
                  >
                    Date Added: {item.date_added}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions
                sx={{ display: "flex", justifyContent: "center", gap: "1" }}
              >
                <Button
                  onClick={() => dispatch(DoneTodo(item.id))}
                  fullWidth
                  variant="contained"
                  size="small"
                  color="success"
                  sx={{ textTransform: "none" }}
                >
                  Done
                </Button>
                <Button
                  onClick={() => dispatch(DeleteTodo(item.id))}
                  fullWidth
                  variant="contained"
                  size="small"
                  color="error"
                  sx={{ textTransform: "none" }}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => HandleModify(item.id)}
                  fullWidth
                  variant="contained"
                  size="small"
                  color="primary"
                  sx={{ textTransform: "none" }}
                >
                  Modify
                </Button>
              </CardActions>
            </Card>
          ))}
      </Box>
      {/* API DATA */}
      <br />
      <hr></hr>
      <Box mt={1} display={"flex"} flexWrap={"wrap"} gap={1.5}>
        <Button
          onClick={HandleAddUser}
          fullWidth
          variant="outlined"
          size="small"
          color="primary"
          sx={{ textTransform: "none", margin: "10px" }}
        >
          {createLoading ? "Loading...." : "ADD USER"}
        </Button>

        {isLoading ? (
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            width={210}
            height={118}
          />
        ) : userList ? (
          <>
            {userList.map((user, index) => (
              <div onClick={() => HandleDeleteUser(user.id)}>
                <Card key={user.id} sx={{ minWidth: 275, cursor: 'pointer' }}>
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
                      {user.name}
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"}>
                      <Typography
                        fontSize={"12px"}
                        mt={1}
                        sx={{ color: "text.secondary" }}
                      >
                        {user.age}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </div>
            ))}
          </>
        ) : (
          <p>NO DATA</p>
        )}
      </Box>
    </>
  );
}

export default ViewTodo;