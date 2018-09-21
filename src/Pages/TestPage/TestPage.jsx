import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class TestPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        // return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                sumittttttttttttttttttttttttttt
                
                <p>
                    amammaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
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

const connectedTestPage = connect(mapStateToProps)(TestPage);
export { connectedTestPage as TestPage };