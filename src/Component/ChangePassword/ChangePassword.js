import React, { Component } from 'react';

export default class ChangePassword extends Component {

    constructor(props){
        super(props);
        this.state = {};
        
    }

    render() {
        return (
            <div>
                <form>
                <input id="txtPassword" type="password" required />
                <input id="txtConfirmPassword" type="password" required />
                </form>
            </div>
        )
    }
}
