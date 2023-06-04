import { Typography, Box } from '@mui/material';

export default function Chat(props) {
    const { query, answer } = props;
    return(
        <>
        <Box sx={{width:"100%"}}>
            <Typography variant="h3" gutterBottom>
                {query}
            </Typography>
            <Typography variant="body1" fontSize='20px'>
                {answer}
            </Typography>

        </Box>
        </>
    )
}