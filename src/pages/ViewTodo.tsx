import { Box, Button, Card, CardActions, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { PrioritizationType } from '../Redux/features/Todo/todoSlice';

const ViewTodo = () => {

    const todos = useSelector((state: RootState) => state.todo);
    
    const DisplayPrioritization = (prioritization: PrioritizationType) => {
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
                    <Typography sx={{ color: "text.secondary" }}>
                      Date Added: {item.date_added}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      Date Completed: {item.date_completed ?? '------'}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent:  'center', gap: '1'}}>
                  <Button fullWidth variant='contained' size="small" color='success' sx={{ textTransform: 'none' }}>Done</Button>
                  <Button fullWidth variant='contained' size="small" color='error' sx={{ textTransform: 'none' }}>Delete</Button>
                  <Button fullWidth variant='contained' size="small" color='primary' sx={{ textTransform: 'none' }}>Modify</Button>
                </CardActions>
              </Card>
            ))}
        </Box>
      </>
    );
}

export default ViewTodo;