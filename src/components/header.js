import React, {Component} from 'react'
import {Grid,Row, Col} from 'react-bootstrap'
import '../css/style.css'

class Header extends Component {
    
    render() {
        return (
            <div id="header">
            <Grid>
                    <Row>
                        <Col md={6} sm={6} xs={6}>

                            <div id="price" >
                                <p>Price Mapper</p>
                            </div>
                        
                        </Col>

                        <Col md={6} sm={6} xs={6} >
                            <div id="price">
                                <button onClick={()=>window.location.href="/"} >Refresh</button>
                            </div>
                        </Col>
                    </Row>
            </Grid>
            </div>
        );
    }
}

export default Header;