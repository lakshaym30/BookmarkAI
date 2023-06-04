import { Card, Grid, Stack, Container, Box } from "@mui/material";
import BookMarkCard from "./BookMarkCard";

export default function BookMarkList() {
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
        <Grid item xs={12} sm={6} md={4}>
            <BookMarkCard/> 
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <BookMarkCard/> 
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <BookMarkCard/> 
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <BookMarkCard/> 
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <BookMarkCard/> 
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <BookMarkCard/> 
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <BookMarkCard/> 
        </Grid>
    </Grid>
  );
};