import AppHeader from "../components/AppHeader"
import Tab from "../components/Tab";
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from "react-router-dom"

export default function() {
    return(
        <>
        <AppHeader/>
        {/* <Toolbar>
            <Tab></Tab>
        </Toolbar> */}
        <Outlet/>
        </>
    )
}