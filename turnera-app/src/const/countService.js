import React, { Component } from 'react';
import service from './features/contacto/service.png';

class countService extends Component {

    constructor(props) {
        super(props);
        this.state = {show : true};

        this.toggleDiv = this.toggleDiv.bind(this);
    }

    toggleDiv = () => {
        const {show} = this.state;
        this.setState( { show : !show })
    }

    render() {
        return(
            <img id="service" style={{width: 350, height: 250}} src={service} />
        )
    }
    
}






export default countService;