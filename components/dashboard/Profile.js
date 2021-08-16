import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const { user } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={user.login}
          image={user.avatarUrl}
          title={user.login}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.name ? user.name : user.login}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.bio}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.location}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}