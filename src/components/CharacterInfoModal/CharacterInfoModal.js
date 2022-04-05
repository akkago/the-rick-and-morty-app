import * as React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import _ from 'lodash';
import './CharacterInfoModal.css';

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
                let response = await fetch(url);
                let info = await response.json();
                setCharacterInfo(info)
            }
            fetchData();
        }
    }, [characterId])

    let date = new Date(characterInfo.created);
    let options = {
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
                <img src={characterInfo.image} className="character-card__photo" alt="photo" width={200} height={200} />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {characterInfo.name}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    {characterInfo.status} - {characterInfo.species}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    type: {characterInfo.type}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    gender: {characterInfo.gender}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    created: {date.toLocaleString("en-US", options)}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    episode: {_.map(characterInfo.episode, (ep) => <><a key={ep} href={ep}>{ep.replace(/^\D+/g, '')}</a>{' '}</>)}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    location: <a href={characterInfo?.location?.url}>{characterInfo?.location?.name}</a>
                </Typography>
                <Typography  sx={{ mt: 1 }}>
                    origin: <a href={characterInfo?.origin?.url}>{characterInfo?.origin?.name}</a>
                </Typography>
            </Box>
        </Modal>
    )
}