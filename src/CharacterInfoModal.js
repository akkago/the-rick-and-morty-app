import * as React from 'react';
import { Box, Button, List, Modal, Pagination, TextField, Typography } from '@mui/material';
import _ from 'lodash';

export default function CharacterInfoModal(props) {
    const { handleClose, open, characterId } = props;
    const [characterInfo, setCharacterInfo] = React.useState({});
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    React.useEffect(() => {
        if (characterId) {
            const fetchData = async () => {
                let url = `https://rickandmortyapi.com/api/character/${characterId}`;
                // let url = `https://rickandmortyapi.com/api/character?page=${page}${parseFilters}`;
                let response = await fetch(url);
                let info = await response.json();
                setCharacterInfo(info)
            }
            fetchData();
        }
    }, [characterId])

    var date = new Date(characterInfo.created);
    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={style} >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {characterInfo.name}
                </Typography>
                <img src={characterInfo.image} className="character-card__photo" alt="photo" width={200} height={200} />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {characterInfo.status} - {characterInfo.species}
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    type: {characterInfo.type}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    gender: {characterInfo.gender}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    created: {date.toLocaleString("en-US", options)}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {/* {characterInfo.origin} */}
                    {/* {characterInfo.location} */}
                    episode: {_.map(characterInfo.episode, (ep) => <><a key={ep} href={ep}>{ep.replace(/^\D+/g, '')}</a>{' '}</>)}
                </Typography>
            </Box>
        </Modal>
    )
}