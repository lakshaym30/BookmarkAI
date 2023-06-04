import { useSearchParams } from 'react-router-dom'
import { Typography, Box, Grid } from '@mui/material';
import SourceList from '../components/SourceList';
import Chat from '../components/Chat';
import { useEffect, useState } from 'react';


export default function SearchResult() {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q')
    const [responseMessages, setResponseMessages] = useState([])

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:8000/chat?q=${q}`);
        eventSource.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            console.log(msg);
            setResponseMessages((messages) => [...messages, msg]);
            if (msg.done) {
                console.log('Done!');
                eventSource.close();
              }
            console.log(responseMessages.map(mes => mes.chat_response).join(''))
          };
          
      
          // Cleanup on component unmount
          return () => {
            eventSource.close();
          };
    }, [searchParams])


    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={2}/>
            <Grid item xs={6} sx={{mt:5}}>
                { q &&
                <Chat query={q} answer={responseMessages.map(mes => mes.chat_response).join('')}/>}

            </Grid>
            {responseMessages.length > 0 &&
                <Grid item xs={4}>
                    <SourceList source={responseMessages} urls={responseMessages[0].documents.map(doc => doc.metadata.url)}/> 
                </Grid>
            }
        </Grid>
        </Box>
        </>
    )
}