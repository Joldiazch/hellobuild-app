import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Deposits from './Deposits';
import Repository from '../repository/Repository';
import Search from '../search/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListItemText from '@material-ui/core/ListItemText';
import StarsIcon from '@material-ui/icons/Stars';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import { useQuery, gql } from "@apollo/client";
import { useSession } from "next-auth/client";
import { useRouter } from 'next/router'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

//const user = JSON.parse(localStorage.getItem("user"));

export default function Dashboard() {
  const classes = useStyles();
  const router = useRouter()
  const [open, setOpen] = useState(true);
  const [showFav, setShowFav] = useState(false);
  const [repoSelected, setRepoSelected] = useState(undefined);
  //const [favRepositories, setFavRepositories] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {router.push("/")}
  const QUERY = gql`
  query {
    user(login: "${user?.githubusername}"){
      repositories(privacy: PUBLIC ownerAffiliations: [OWNER] first: 50){
        totalCount
        nodes {
          name
          id
          description
          url
          owner {
            login
            url
          }
          languages(first: 5){
            nodes{
              name
              color
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
        edges{
          cursor
          node {
            id
          }
        }
      }
      avatarUrl
      bio
      email
      id
      name
      url
      twitterUsername
      location
      login
    }
  }
`
  const { data, loading, error } = useQuery(QUERY);
  

  if (loading) {
    return <h2><a href="#loading" aria-hidden="true" class="aal_anchor" id="loading"><svg aria-hidden="true" class="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }


  const repos = data.user.repositories;

  const favRepos = localStorage.getItem("favRepos");
  const favRepositories = favRepos ? JSON.parse(favRepos) : [];
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handlerRepoSelected = (repo) => {
    setRepoSelected(repo);
  }

  const handlerClosedSearch = () => {
    setRepoSelected(undefined);
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/")
  }

  /* useEffect(() => {
    const favRepos = localStorage.getItem("favRepos");
    const storedFavRepos = favRepos ? JSON.parse(favRepos) : [];
    setFavRepositories(storedFavRepos);
  }, []) */

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            HellobuildApp
          </Typography>
          <IconButton color="inherit" onClick={() => handleLogout()}>
            <Badge color="secondary">
              <ExitToAppIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem button onClick={() => setShowFav(false)}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Repositories" />
            </ListItem>
            <ListItem button onClick={() => setShowFav(true)}>
              <ListItemIcon>
                <StarsIcon />
              </ListItemIcon>
              <ListItemText primary="Favorite repos" />
            </ListItem>
          </div>
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Avatar */}
            <Grid item xs={12} md={4} lg={3}>
              <Deposits
                user={data.user}
              />
            </Grid>
            {/* Repositories */}
            <Grid item xs={12} md={8} lg={9}>
              {/* Search */}
              {!showFav
                &&
                  <Grid container>
                    <Grid item>
                    <Search
                      handlerRepoSelected={handlerRepoSelected}
                      handlerClosedSearch={handlerClosedSearch}
                    />
                    </Grid>
                    <Grid item>
                    <IconButton onClick={() => handlerClosedSearch()}>
                      <RotateLeftIcon />
                    </IconButton>
                    </Grid>
                  </Grid>
              }
              {repoSelected && !showFav
                ?
                  <Grid container spacing={2}>
                    <Grid item key={repoSelected.id} xs={12} sm={6} md={12}>
                      <Repository repo={repoSelected}/>
                    </Grid>
                  </Grid>
                :
                  <Grid container spacing={2}>
                    {!showFav
                      ? repos?.nodes?.map((repo) => (
                        <Grid item key={repo.id} xs={12} sm={6} md={6}>
                          <Repository repo={repo}/>
                        </Grid>
                        ))
                      : favRepositories.map((repo) => (
                        <Grid item key={repo.id} xs={12} sm={6} md={6}>
                          <Repository repo={repo}/>
                        </Grid>
                        ))
                    }
                  </Grid>
              }
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}