import AppHeader from "../components/AppHeader"
import Tab from "../components/Tab";
import Toolbar from '@mui/material/Toolbar';

export default function() {
    return(
        <>
        <AppHeader/>
        <Toolbar sx={{pt: 0.5}}>
            <Tab></Tab>
        </Toolbar>
        </>
    )
}