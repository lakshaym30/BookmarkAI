import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import logo from '../assets/bookmark_logo.png';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HomeHeader from '../components/HomeHeader';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';


// This sign in page displays the SignOut and SignIn components. These components will remotely change the User state regardless
// of weather props are passed, but you need to pass props to access the user state's value.


export default function Homescreen(props) {
    const navigate = useNavigate();
    return (
        <>
            {/* <HomeHeader/> */}
            <Grid container spacing={3} sx={{ border: 0 }}>
                <Grid item xs={12} sx={{ border: 0 }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Box sx={{ mt: 30 }}>
                            {props.user ?
                                <div>
                                    Hello, {props.user.displayName}
                                    <SignOut />
                                </div>
                                :
                                <div>
                                    Please sign in: 
                                    <SignIn />
                                </div>
                            }

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}