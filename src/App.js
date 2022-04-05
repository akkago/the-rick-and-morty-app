import './App.css';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import ControlledRadioButtonsGroup from './RadioButtonsGroup';
import CharacterCard from './CharacterCard';
import { Box, Button, List, Modal, Pagination, TextField, Typography } from '@mui/material';
import CharacterInfoModal from './CharacterInfoModal';

function App() {
  const [cards, setCards] = useState();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState();

  const onClick = (newPage) => {
    const fetchData = async () => {
      const parseFilters = `${_.map(filters, (value, name) => `&${name}=${value}`)}`.replace(new RegExp(',', "g"), '');
      let url = `https://rickandmortyapi.com/api/character?page=${newPage ? newPage : page}${parseFilters}`;
      let response = await fetch(url);
      let commits = await response.json();

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
        <Pagination count={10} size="medium" onChange={onPageChange} sx={{ paddingTop: '8px' }} />
      </div>
      <div className="search-panel">
        <div>
          <Button variant="outlined" onClick={onClick} >поиск</Button>
        </div>

        <ControlledRadioButtonsGroup
          onChange={onFilterChange}
          id='status'
          controlsNames={['alive', 'dead', 'unknown']}
        />

        <ControlledRadioButtonsGroup
          onChange={onFilterChange}
          id='gender'
          controlsNames={['female', 'male', 'genderless', 'unknown']}
        />

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          className='search-form'
          autoComplete="off"
        >
          <TextField id="species" label="species" onChange={handleTextFieldChange} />
          <TextField id="type" label="type" onChange={handleTextFieldChange} />
          <TextField id="name" label="name" onChange={handleTextFieldChange} />
        </Box>
      </div>
    </div>
  );
}

export default App;