import './App.css';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import ControlledSelect from './components/ControlledSelect/ControlledSelect';
import CharacterCard from './components/CharacterCard/CharacterCard';
import { Box, Button, List, Pagination, TextField } from '@mui/material';
import CharacterInfoModal from './components/CharacterInfoModal/CharacterInfoModal';

function App() {
  const [cards, setCards] = useState();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [filters, setFilters] = useState();

  const onClick = (newPage) => {
    const fetchData = async () => {
      const parseFilters = `${_.map(filters, (value, name) => `&${name}=${value}`)}`.replace(new RegExp(',', "g"), '');
      let url = `https://rickandmortyapi.com/api/character?page=${newPage ? newPage : page}${parseFilters}`;
      let response = await fetch(url);
      let commits = await response.json();

      setPageCount(commits.info.pages);
      setCards(commits.results);
    }
    fetchData();
  };

  const onFilterChange = (id, text) => {
    setFilters({ ...filters, [id]: text });
  };

  const handleTextFieldChange = (e) => {
    setFilters({ ...filters, [e.target.id]: e.target.value });
  }

  const onPageChange = (event, newPage) => {
    setPage(newPage);
    onClick(newPage);
  }

  const [open, setOpen] = useState(false);
  const [characterId, setCharacterId] = useState();

  const handleOpen = (event, id) => {
    setCharacterId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => onClick(1), []);

  return (
    <div className="App">
      <CharacterInfoModal handleClose={handleClose} open={open} characterId={characterId} />
      <div>
        <List className='content-container'>
          {_.map(cards, (item) => <CharacterCard item={item} onClick={handleOpen} characterId={characterId} key={`characterId_${item.id}`} />)}
        </List>
        <Pagination count={pageCount} size="medium" onChange={onPageChange} sx={{ paddingTop: '8px' }} />
      </div>
      <div className="search-panel">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          className='search-form'
          autoComplete="off"
        >
          <ControlledSelect
            onChange={onFilterChange}
            id='status'
            controlsNames={['', 'alive', 'dead', 'unknown']}
          />

          <ControlledSelect
            onChange={onFilterChange}
            id='gender'
            controlsNames={['', 'female', 'male', 'genderless', 'unknown']}
          />
          <TextField id="species" label="species" onChange={handleTextFieldChange} size='small' />
          <TextField id="type" label="type" onChange={handleTextFieldChange} size='small'/>
          <TextField id="name" label="name" onChange={handleTextFieldChange} size='small'/>
          <Button
            variant="outlined"
            onClick={onClick}
            className='Button'
          >
            поиск
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default App;