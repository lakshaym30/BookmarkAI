import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useState, useEffect  } from 'react';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';

export default function SearchBar(props) {
  const { height, refresh } = props;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q'));

  useEffect(()=>{
    console.log(query)
    setQuery('')
  },[refresh])

  function changeQuery(e){
    setQuery(e.target.value);
    // setSearchParams({q: query});
    //     console.log(searchParams.toString())
    
  }

  function keyPress(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            navigate({
                pathname: "search",
                search: createSearchParams({
                    q: query
                }).toString()
              })
        }
    }

  return (
    <Paper
      component="form"
      sx={{display: 'flex', alignItems: 'center', width: 786, height: {height}, border:1, borderColor: "#DFE1E5", borderRadius:20}}
    >
      <IconButton type="button" sx={{ p: '15px', ml:1 }} aria-label="search" disabled>
        <SearchIcon sx={{fontSize:'30px'}}/>
      </IconButton>
      <InputBase
        value={query}
        onChange={changeQuery}
        onKeyDown={keyPress}
        sx={{ ml: 1, flex: 1, fontSize: 20 }}
        placeholder="Search Your Own Internet"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper>
  );
}