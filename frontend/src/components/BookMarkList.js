import { Card, Grid, Stack, Container, Box } from "@mui/material";
import BookMarkCard from "./BookMarkCard";
import { generative_ai, sf, lancedb } from "../services-mock/fake_dataset";
import mckinsey from "../assets/images/mckinsey.png"

const demo = {
    title: "What is generative AI?",
    description: "Generative artificial intelligence (AI) describes algorithms (such as ChatGPT) that can be used to create new content, including audio, code, images, text, simulations, and videos.",
    url: "https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-generative-ai",
    image: mckinsey
}

export default function BookMarkList(props) {
    const { genAI, lance } = props;
  return (
    <Grid
    container
    spacing={4}
    justify="center"
    sx={{pt: 5, pr: 20}}
    >

        {!lance && <Grid item xs={12} sm={6} md={4}>
            <BookMarkCard title={demo.title} description={demo.description} image={demo.image} url={demo.url}/> 
        </Grid>}

        {!genAI && !lance && sf.map((doc) => (
            <Grid item xs={12} sm={6} md={4}>
                <BookMarkCard title={doc.title} description={doc.description} image={doc.image} url={doc.url}/> 
            </Grid>
        ))}

        {!lance && generative_ai.map((doc) => (
            <Grid item xs={12} sm={6} md={4}>
                <BookMarkCard title={doc.title} description={doc.description} image={doc.image} url={doc.url}/> 
            </Grid>
        ))}

        {!genAI && lancedb.map((doc) => (
            <Grid item xs={12} sm={6} md={4}>
                <BookMarkCard title={doc.title} description={doc.description} image={doc.image} url={doc.url}/> 
            </Grid>
        ))
        }
    </Grid>
  );
};