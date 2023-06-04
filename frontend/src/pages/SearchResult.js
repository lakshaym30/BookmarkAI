import { useSearchParams } from 'react-router-dom'
import { Typography, Box, Grid, Paper, InputBase, Stack } from '@mui/material';
import SourceList from '../components/SourceList';
import { MuiMarkdown } from 'mui-markdown';
import Chat from '../components/Chat';
import { useEffect, useState } from 'react';


export default function SearchResult() {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q')
    const [responseMessages, setResponseMessages] = useState([])

    useEffect(() => {
        setResponseMessages([])
        const eventSource = new EventSource(`http://localhost:8000/chat?q=${q}`);
        eventSource.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            console.log(msg);
            if (msg.done) {
                console.log('Done!');
                eventSource.close();
            } else {
                setResponseMessages((messages) => [...messages, msg]);
            }
            
            console.log(responseMessages.map(mes => mes.chat_response).join(''))
            console.log(responseMessages.flatMap(mes => mes.documents))
          };

          // Cleanup on component unmount
          return () => {
            eventSource.close();
          };
    }, [searchParams])

    function keyPress(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            setResponseMessages([])
            setSearchParams({q:inputValue});
            setInputValue('')
        }
    }
    const [inputValue, setInputValue] = useState('');
    function handleInputChange(e){
        setInputValue(e.target.value);
    }



    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={2}/>
                <Grid item xs={6} sx={{mt:5}}>
                     {/* Chat Messages */}
                    <Paper sx={{height: 700, overflow: 'auto'}} elevation={0}>
                        <Stack sx={{ mr: 6}} height='50px'>
                            <Typography variant="h3" gutterBottom>
                                {q}
                            </Typography>
                            
                            <Box sx={{ pb: 3, mb: 3}}>
                                <Typography variant="body1" fontSize='20px' mr={6}>
                                    <MuiMarkdown>
                                        {responseMessages.map(mes => mes.chat_response).join('')}
                                    </MuiMarkdown>
                                </Typography>   
                            </Box>    
                           
                        </Stack>
                    </Paper>

                    {/* Chat Bar */}
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
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </Paper>

                </Grid>
                
                <Grid item xs={4}>
                    <SourceList 
                        source={responseMessages}
                        urls={[...new Set(responseMessages.flatMap(mes => mes.documents.map(doc => doc.metadata.url)))]}
                    /> 
                </Grid>
            </Grid>
        </Box>


       
        </>
    )
}