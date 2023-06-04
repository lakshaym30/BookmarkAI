import { Card, Grid, Stack, Container, Box } from "@mui/material";
import BookMarkCard from "./BookMarkCard";
import { generative_ai, sf } from "../services-mock/fake_dataset";

export default function BookMarkList(props) {
    const { genAI } = props;
  return (
    <Grid
    container
    spacing={4}
    justify="center"
    sx={{pt: 5, pr: 20}}
    >

       <Grid item xs={12} sm={6} md={4}>
            <BookMarkCard/> 
        </Grid>

        {!genAI && sf.map((doc) => (
            <Grid item xs={12} sm={6} md={4}>
                <BookMarkCard title={doc.title} description={doc.description} image={doc.image} url={doc.url}/> 
            </Grid>
        ))}

        {generative_ai.map((doc) => (
            <Grid item xs={12} sm={6} md={4}>
                <BookMarkCard title={doc.title} description={doc.description} image={doc.image} url={doc.url}/> 
            </Grid>
        ))}
    </Grid>
  );
};