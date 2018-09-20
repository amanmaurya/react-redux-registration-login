import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login'

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };


        this.responseFacebook = this.responseFacebook.bind(this);
    }


    componentClicked(){
        //console.log('clicked')

    }

    responseFacebook(response){
        console.log(response);
        // e.preventDefault();

        // this.setState({ submitted: true });
        // const { username, password } = this.state;
        //const { dispatch } = this.props;
        if (response) {
            this.props.dispatch(userActions.login(response));
        }
        // this.setState({
        //     isLoggedIn: true,
        //     userId: response.userId,
        //     name: response.name,
        //     email: response.email,
        //     picture: response.picture.data.url
        // })
        // return <Redirect  to='/Executive'/>
    }
    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <FacebookLogin
                                    appId="1293605604142275"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    onClick={this.componentClicked}
                                    callback={this.responseFacebook} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 