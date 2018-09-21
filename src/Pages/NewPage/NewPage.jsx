import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NewPage extends React.Component {
   

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.name}!</h1>
               <p>
                   This is NewPage
                
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedNewPage = connect(mapStateToProps)(NewPage);
export { connectedNewPage as NewPage };