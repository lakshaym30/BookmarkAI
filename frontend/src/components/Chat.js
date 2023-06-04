import { Typography, Box, Button, Paper, InputBase, Stack, List, ListItem } from '@mui/material';
import { useState } from 'react'; 

export default function Chat(props) {
    const { query, answer } = props;
    const [chats, setChats] = useState([answer]);



    return(
        <>
        
        <Paper sx={{height: 700, overflow: 'auto'}} elevation={0}>
        <Stack sx={{ mr: 6}} height='50px'>
            <Typography variant="h3" gutterBottom>
                {query}
            </Typography>
            {chats.map((c, i) => (
                <Box sx={{borderBottom:1, pb: 3, mb: 3}}>
                <Typography variant="body1" fontSize='20px' mr={6}>
                {c}
                </Typography>   
                </Box>    
            ))}
        </Stack>
        </Paper>

        </>
    )
}