import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import "./BoxComponent.css";
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';


const useStyles = theme => ({
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

class BoxComponent extends Component {

    static propTypes = {
        items: PropTypes.array
    }

    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
            auth: true,
            anchorEl: null,
            anchorOriginVertical: 'bottom',
            anchorOriginHorizontal: 'right',
            transformOriginVertical: 'top',
            transformOriginHorizontal: 'right',
            anchorReference: 'anchorEl',
        }
    }
    componentDidMount() {
        this.setState({
          filtered: this.props.items
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          filtered: nextProps.items
        });
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    addToPlan = (event) => {
        console.log(event.target.value)
        console.log(event.target.parentElement)
        console.log(event.target.parentNode)
        console.log(event.currentTarget)
        console.log(event)
    }

    render() {
        const Name = ({title}) => <div className="item"><h1 className="Name">{title.text}</h1></div>;
        const Info = ({title}) => <div className="item"><p>{title.text}</p></div>;
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className="SmallResourceBox">
                <img src={this.state.filtered.url} className="Image" alt="headShot"/>
                <div className="Info">
                    <Name title={{text: this.state.filtered.name}}/>                   
                    <Info title={{text: this.state.filtered.type}}/>
                    <Info title={{text: this.state.filtered.spending === 0 ? 'Budget: Free' : 'Budget: $' + this.state.filtered.spending}}/>
                </div>
                <IconButton aria-haspopup="true" onClick={this.handleClick} edge="end" aria-label="add" classes={{root: classes.root}}>
                    <AddCircleOutlineTwoToneIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={this.handleClose}
                    classes={{list: classes.list}}
                >
                    <ListItem classes={{root: classes.listitemroot}} onClick={this.addToPlan}>
                        Plan 1
                        <ListItemIcon edge="end">
                            <AddCircleOutlineTwoToneIcon classes={{root: classes.icon}}/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>Plan 2</ListItem>
                    <ListItem>Plan 3</ListItem>
                </Menu>
            </div>
        );
    }
}
export default withStyles(useStyles)(BoxComponent)