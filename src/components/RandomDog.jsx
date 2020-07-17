import React, { Component } from 'react'
import Konami from 'react-konami-code';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBIcon } from "mdbreact";

export default class RandomDog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                console.log(res.message)
                this.setState({
                    data: res,
                    url: res.message
                })
            })
    }

    easterEgg = () => {
        alert('Hey, you typed the Konami Code!');
    }

    render() {
        return (
            <div>
                <header style={{ marginBottom: '100px' }}>

                </header>
                <main>
                {/* // <Konami action={this.easterEgg}> */}
                    <MDBContainer style={{ marginBottom: '100px' }}>
                        <MDBRow>
                            <MDBCol md='12'>
                                <img src={`${this.state.url}`} className='img-fluid' alt='random dog' />
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                {/* // </Konami> */}
                </main>
            </div>
        )
    }
}
