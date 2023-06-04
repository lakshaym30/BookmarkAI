import { Box, Grid, Paper, Typography,Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import logo from '../assets/bookmark_logo.png';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HomeHeader from '../components/HomeHeader';
import SubjectList from '../components/SubjectList';

export default function BrowseScreen(props) {
    const navigate = useNavigate();
    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={2}/>
            <Grid item xs={10}>
                <SubjectList/>
            </Grid>
        </Grid>
        </Box>
        </>
    )
}