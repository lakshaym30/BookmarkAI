import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function SearchBar(props) {
  const { height } = props;
  return (
    <Paper
      component="form"
      sx={{display: 'flex', alignItems: 'center', width: 786, height: {height}, border:1, borderColor: "#DFE1E5", borderRadius:20}}
    >
      <IconButton type="button" sx={{ p: '15px', ml:1 }} aria-label="search" disabled>
        <SearchIcon sx={{fontSize:'30px'}}/>
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: 20 }}
        placeholder="Search Your Own Internet"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper>
  );
}