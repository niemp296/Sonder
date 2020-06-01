import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      textTransform: 'capitalize',
    },
    container: {
        width: '100%',
    }
  });

function Main(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
        <ListItem classes={{
            root: classes.root,
            container: classes.container,
        }}>
        <ListItemText 
            primary={props.primary}
            secondary={props.secondary}
        />
        <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <AddCircleOutlineTwoToneIcon />
        </IconButton>
      </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" component="li" />
    </React.Fragment>
    );
  }
  
  export default Main;
  