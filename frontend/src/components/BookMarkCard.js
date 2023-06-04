import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import placeholder from '../assets/placeholder.png';
import { useNavigate } from 'react-router-dom';

export default function BookMarkCard(props) {
  const { title, description, image, url} = props;
  function displayUrl(url) {
    return url.replace('https://','').split("/")[0]
  }
  const navigate = useNavigate();

  return (
    <Card onClick={()=>navigate(url)} sx={{ maxWidth: 600, borderRadius: 5}} elevation={0}>
        <CardMedia
          component="img"
          height="140"
          image={image ? image : placeholder}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title ? title : "Title"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description && description}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          {url ? displayUrl(url) : ""}
        </Button>
      </CardActions>
    </Card>
  );
}