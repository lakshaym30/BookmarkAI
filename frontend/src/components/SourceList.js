import { Link, Typography, Stack, Box } from "@mui/material";

export default function SourceList(props){
    const { source, urls} = props;
    return(
        <>
        <Box sx={{mt: 8, pl: 5}}>
        <Stack spacing={2}>
        <Typography variant='h4'>
            Sources
        </Typography>
        {urls.map((url, i) => (
                <a target="_blank" rel="noopener" href={url} underline="hover" sx={{fontSize: '20px'}}>
                {`[${i + 1}] ${url}`}
                </a>
            ))}
        </Stack>
        </Box>
        
        </>
    )

}