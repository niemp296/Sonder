import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import "./BoxComponent.css";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';


const useStyles = makeStyles({
    root: {
      "margin-left": "auto",
      "margin-right": "12px",
      outline: 0,
      '&:hover': {
          background: "none",
      }
    },
    list: {
        display: 'flex',
        "flex-direction": "column",
    },
    icon: {
        "margin-left": "auto",
        cursor: "pointer",
    },
    listitemroot: {
        outline: 0,
    }
  });

function BoxComponent(props) {

        const Name = ({title}) => <div className="item"><h1 className="Name">{title.text}</h1></div>;
        const Info = ({title}) => <div className="item"><p>{title.text}</p></div>;
        const classes = useStyles();
        return (
            <div className="SmallResourceBox">
                <img src={props.item.url} className="Image" alt="headShot"/>
                <div className="Info">
                    <Name title={{text: props.item.name}}/>                   
                    <Info title={{text: props.item.type}}/>
                    <Info title={{text: props.item.spending === 0 ? 'Budget: Free' : 'Budget: $' + props.item.spending}}/>
                </div>
                {props.isLoggedIn ? 
                    <IconButton 
                        id={props.item["_id"]["$oid"]} 
                        onClick={props.addToPlan} 
                        edge="end" 
                        value={props.item["spending"]}
                        aria-label="add" classes={{root: classes.root}}>
                            <AddCircleOutlineTwoToneIcon />
                    </IconButton> : ''
                }
                
            </div>
        );
}

export default BoxComponent;