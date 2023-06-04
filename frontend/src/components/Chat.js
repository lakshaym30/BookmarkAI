import { Typography, Box, Button, Paper, InputBase, Stack, List, ListItem } from '@mui/material';
import { useState } from 'react'; 

export default function Chat(props) {
    const { query, answer } = props;
    const [chats, setChats] = useState([answer]);

 
 
    function keyPress(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            setChats([...chats, e.target.value]);
        }
    }

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
    

        <Paper
            component="form"
            position="fixed"
            sx={{display: 'flex', position: 'fixed',
            bottom: 50,
            width: 900, 
            alignItems: 'center', 
            height: 70, border:1, borderColor: "#DFE1E5"}}
        >
        <InputBase
            sx={{ ml: 1, flex: 1, fontSize: 20, m: 3}}
            onKeyDown={keyPress}
            placeholder="Send A Message"
            inputProps={{ 'aria-label': 'search google maps' }}
        />
        </Paper>
        </>
    )
}