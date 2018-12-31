import React , {Component} from 'react'
import axios from 'axios'
import '../css/style.css'
import {Grid} from 'react-bootstrap'


class Today extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            btcprice:'',
            ltcprice:'',
            ethprice:''
         };
    }

    componentWillMount(){
        const self= this;
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
        .then(response=>{
            self.setState({
                btcprice: response.data.BTC.USD,
                ltcprice: response.data.LTC.USD,
                ethprice: response.data.ETH.USD
                })

            localStorage.setItem('BTC', response.data.BTC.USD)
            localStorage.setItem('ETH', response.data.ETH.USD)
            localStorage.setItem('LTC', response.data.LTC.USD)
        })
        .catch(err=>{
            console.log(err);
        })
    }

    componentDidMount(){
        if(!navigator.onLine){
            this.setState({
                btcprice: localStorage.getItem('BTC'),
                ltcprice: localStorage.getItem('LTC'),
                ethprice: localStorage.getItem('ETH')
             })
        }
    }

    render() {
        return (
            <div >
                <Grid>
                    <h2>Current price</h2>

                        <div className="current">
                            <p>1 BTC</p>
                            <h4>${this.state.btcprice}</h4>
                        </div>

                        <div className="current">
                            <p>1 ETH</p>
                            <h4>${this.state.ethprice}</h4>
                        </div>


                        <div className="current">
                            <p>1 LTC</p>
                            <h4>${this.state.ltcprice}</h4>
                        </div>
                </Grid>
            </div>
        );
    }
}

export default Today;