import React from 'react';
import './Header.css'

export default class Header extends React.Component {

    static propTypes = {
        //contains prop variables
    }
    constructor(props) {
        super(props);
        this.state = {
            //contains state variables
        }
    }

    static defaultProps = {
        // contains default props
    }

    editHeader = () => {
        console.log("clicked")
    }

    //TODO: return title(pass by props), date(pass by sidebar), estimated cost(pass by props)
    render() {
        return (
            <div id="planner-header">
                <div id ="header-title">
                    <h1 id="planner-title" className="planner-header">{this.props.title}</h1>
                    <button title="edit" type="button" className="btn btn-outline-dark">
                    <svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                        <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                    </svg>
                    </button>
                </div>
                <h2 id="planner-date" className="planner-header">{this.props.length}</h2>
                <h2 id="planner-total-cost" className="planner-header">${this.props.budget}</h2>
            </div>
        );
    }
}