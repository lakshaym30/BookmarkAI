import { Box, Grid, Paper, Typography,Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import logo from '../assets/bookmark_logo.png';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HomeHeader from '../components/HomeHeader';

export default function BrowseScreen(props) {
    const navigate = useNavigate();
    return(
        <>
        <Typography>Browse</Typography>
        </>
    )
}