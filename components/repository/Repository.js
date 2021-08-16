import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useState } from 'react';
import StarIcon from '@material-ui/icons/Star';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [isFav, setIsFav] = useState(false)
  const { repo } = props;


  const handleFav = () => {
    
    const storedFavRepos = JSON.parse(localStorage.getItem("favRepos"));
    if (storedFavRepos){
      const favRepo = storedFavRepos.find((re)=>{
        return re.id === repo.id
      });
      if (!favRepo){
        storedFavRepos.push(repo)
        localStorage.setItem(
          "favRepos",
          JSON.stringify(storedFavRepos)
        );
        setIsFav(true)
      }else{
        const index = storedFavRepos.findIndex(key => key.name === repo.name);
        storedFavRepos.splice(index,1);
        localStorage.setItem(
          "favRepos",
          JSON.stringify(storedFavRepos)
        );
        setIsFav(false)
      }
    }else{
      localStorage.setItem(
        "favRepos",
        JSON.stringify([repo])
      );
      setIsFav(true)
    }
  }

  useEffect(()=>{
    const storedFavRepos = JSON.parse(localStorage.getItem("favRepos"));
    if (storedFavRepos){
      const favRepo = storedFavRepos.find((re)=>{
        return re.id === repo.id
      });
      setIsFav(!(favRepo === undefined))
    }
  }, [])

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {repo.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {repo.description}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          {repo.languages?.nodes
            ? repo.languages.nodes.map((lang) => (
                <div className={classes.controls} key={lang.name}>
                  <FiberManualRecordIcon style={{ color: lang.color }}/>
                  {lang.name}
                </div>
              ))
            :(repo.language
              &&
                <div className={classes.controls} key={repo.language}>
                  <FiberManualRecordIcon/>
                  {repo.language}
                </div>
            )
          }
          <IconButton aria-label="favorite" onClick={() => handleFav()}>
            {isFav ? <StarIcon/> : <StarBorderIcon/>}
          </IconButton>
        </div>
      </div>
    </Card>
  );
}