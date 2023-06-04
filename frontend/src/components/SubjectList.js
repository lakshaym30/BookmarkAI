import { Box, Stack, Button} from "@mui/material";
import React, { useState } from 'react';

const lists = [
    { id: 1, title: "Generative AI" },
    { id: 2, title: "San Francisco" },
    { id: 3, title: "LanceDB" },
    { id: 4, title: "Developer Tools" },
    { id: 5, title: "Startup" },
  ];
  
// omitted for now
export default function SubjectList(props) {
    const { setGenAI, setLancedb } = props;
    const [ selected, setSelected ] = useState(0);

    const handleColor = (row) => {
        if (row.id == selected) {
            setSelected(0);
            setGenAI(false);
            setLancedb(false);
        } else {
            setSelected(row.id);
            if (row.id == 1) {
                setGenAI(true);
                setLancedb(false);
            } else if (row.id == 3) {
                setGenAI(false);
                setLancedb(true);
            } else {
                setGenAI(false);
                setLancedb(false);
            }
        }
      };
    
    
    return (
        <Box sx={{pt: 2}}>
            <Stack direction="row" spacing={2}>

            {lists.map((list) => (
                <Button
                key={list.id}
                onClick={() => handleColor(list)}
                sx={{fontSize: '20px', textTransform: "none", borderRadius: 20}} variant={list.id === selected ? "contained" : "outlined"}
                >
                {list.title}
                </Button>
            ))}
            </Stack>
        </Box>
    )
}