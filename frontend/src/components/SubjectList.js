import { Box, Stack, Button} from "@mui/material";
import React, { useState } from 'react';

const lists = [
    { id: 1, title: "Generative AI" },
    { id: 2, title: "Amplitude Analytics" },
    { id: 3, title: "San Francisco" }
  ];
  
// omitted for now
export default function SubjectList(props) {
    const { setGenAI } = props;
    const [selected, setSelected] = useState(0);

    const handleColor = (row) => {
        setSelected(row.id);
        if (row.id == 1) {
            setGenAI(true);
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