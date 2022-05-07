import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, MenuItem } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';
import Pagination from '../Pagination/Pagination';
import ChipInput from 'material-ui-chip-input';
import { getFollowers, getFollowings } from '../../actions/users';
import { getCountries } from '../../actions/countries';
import { useSelector } from 'react-redux';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [categorySearch, setCategorySearch] = useState('All');
  const history = useHistory();

  const searchPost = () => {
    if (search.trim() || tags || (categorySearch && categorySearch !== 'All')) {
      dispatch(getPostsBySearch({ search, tags: tags.join(','), category: categorySearch }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}&category=${categorySearch}`);
    } else {
      history.push('#');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  useEffect(() => {
    dispatch(getFollowers());
    dispatch(getFollowings());
    dispatch(getCountries());
  }, []);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Posts"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />

              {/* Search by category */}
              <TextField
                style={{ margin: '10px 0px' }}
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Category"
                fullWidth
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                select
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Historical places">Historical places</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Souvenirs">Souvenirs</MenuItem>
              </TextField>

              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
