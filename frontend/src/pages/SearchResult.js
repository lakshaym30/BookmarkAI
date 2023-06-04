import { useSearchParams } from 'react-router-dom'
import { Typography, Box, Grid } from '@mui/material';
import SourceList from '../components/SourceList';
import Chat from '../components/Chat';

const mock_data = {
    "chat_message": "Amplitude is a digital analytics platform and experimentation tool used to build better products by turning user data into meaningful insights. It is used to analyze visitor behavior data for both web and mobile applications. Businesses use Amplitude to  analyze and extract insights about user behavior from their digital products. Product, marketing, and growth teams use it to collect user data and extract insights that can be  used to improve various aspects of their products.",
    "relevant_pages": ["https://thanooz.medium.com/forwarding-ref-in-react-56796ec9258e"]
}


export default function SearchResult() {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q')

    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={2}/>
            <Grid item xs={6} sx={{mt:5}}>
                { q &&
                <Chat query={q} answer={mock_data.chat_message}/>}

            </Grid>
            <Grid item xs={4}>
                <SourceList source={mock_data.relevant_pages}/> 
            </Grid>
        </Grid>
        </Box>
        </>
    )
}