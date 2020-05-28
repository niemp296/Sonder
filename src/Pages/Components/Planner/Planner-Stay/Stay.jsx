import React from 'react';

class Stay extends React.Component {
    render() { 
        return (
            <div id="planner-stay">
                <h2 className="display-4 text-center">To get started:</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> Click on the [+] button to add days to your planner </li>
                    <li className="list-group-item"> Click on the [-] button to remove days from your planner </li>
                    <li className="list-group-item"> Click on any numbered button to start planning</li>
                </ul>  
                <br/><br/>
                <blockquote className="blockquote w-75 mx-auto">
                    <p className="mb-0">Travel is never a matter of money but of courage.</p>
                    <footer className="blockquote-footer">Paolo Coelho</footer>
                </blockquote>
            </div>
        );
    }
}
 
export default Stay;