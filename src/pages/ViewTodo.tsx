import { Box } from '@mui/material';
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

const ViewTodo = () => {

    const todos = useSelector((state: RootState) => state.todo)

    return (
        <>
            <Typography variant="h1" color="initial">VIEW PAGE</Typography>
            <Box>
                       
            </Box>
        </>
    )
}

export default ViewTodo;