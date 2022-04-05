import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import * as React from 'react';
import './CharacterCard.css';

export default function CharacterCard(props) {
    const { item, onClick } = props;

    const handleClick = (e) => {
        onClick(e, item.id);
    }
    return (
        <>
            <ListItem
                id={item.id}
                alignItems="flex-start"
                onClick={handleClick}
                sx={{ cursor: 'pointer' }}
            >
                <ListItemAvatar>
                    <Avatar alt="photo" src={item.image} sx={{ width: 100, height: 100 }} />
                </ListItemAvatar>
                <ListItemText
                    primary={item.name}
                    className='character-card__content'
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {`${item.status} - ${item.species}`}
                            </Typography>
                            <div>
                                {`gender: ${item.gender}`}
                            </div>
                            <div>
                                {`type: ${item.type}`}
                            </div>
                        </>
                    }
                />
            </ListItem>
            <Divider variant="fullWidth" component="div" />
        </>
    );
}