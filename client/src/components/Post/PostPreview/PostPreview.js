import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React from 'react';
import useStyles from '../../PostList/Post/styles';
import { HeaderCard } from './styles';
export default function PostPreview(props) {
    const dataPreview = props.data;
    const classes = useStyles();
    return (
        dataPreview.attchment!=='' ? (
        <Card>
            <HeaderCard action={
                <IconButton onClick={props.delePreview}>
                    <HighlightOffIcon/>
                </IconButton>
            }/>
            <CardContent>
                <Typography variant='h5' color='textPrimary'>{dataPreview.title}</Typography>
            </CardContent>
            <CardMedia image={dataPreview.attchment} title={dataPreview.title} className={classes.media} />
        </Card>
        ) : ('')
)
}