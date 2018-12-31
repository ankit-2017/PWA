import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import {Grid, Well} from 'react-bootstrap'
import '../css/style.css'

class History extends Component {
    constructor () {
      super();
      this.state = {
          todayprice: {},
          yesterdayprice: {},
          twodaysprice: {},
          threedaysprice: {}
    
      }
      
    }
    
    getETHPrices= (date)=> {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + date);
    }
    
    getBTCPrices= (date)=> {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + date);
    }
    
    getLTCPrices= (date)=> {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + date);
    }


// This function gets the prices for the current date.
getTodayPrice = () => {
    // Get today's date in timestamp
    let time = moment().unix()
   
    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
        .then(axios.spread((eth, btc, ltc) => {
            let data = {
                date: moment.unix(time).format("MMMM Do YYYY"),
                eth: eth.data.ETH.USD,
                btc: btc.data.BTC.USD,
                ltc: ltc.data.LTC.USD
            }
            // Set the state of todayprice to the content of the object f
            this.setState({ todayprice: data });
            localStorage.setItem('todayprice', JSON.stringify(data))
        }))
}
// This function gets the prices for the yesterday.
getYesterdayPrice = () => {
    // Get yesterday's date in timestamp
    let time = moment().subtract(1, 'days').unix();
    
    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
        .then(axios.spread((eth, btc, ltc) => {
            let data = {
                date: moment.unix(time).format("MMMM Do YYYY"),
                eth: eth.data.ETH.USD,
                btc: btc.data.BTC.USD,
                ltc: ltc.data.LTC.USD
            }
            
            this.setState({ yesterdayprice: data });
            localStorage.setItem('yesterdayprice', JSON.stringify(data))
        }))
}
// This function gets the prices for the two days ago.
getTwoDaysPrice = () => {
    // Get the date for two days ago in timestamp
    let time = moment().subtract(2, 'days').unix();
    
    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
        .then(axios.spread((eth, btc, ltc) => {
            let data = {
                date: moment.unix(time).format("MMMM Do YYYY"),
                eth: eth.data.ETH.USD,
                btc: btc.data.BTC.USD,
                ltc: ltc.data.LTC.USD
            }
            
            this.setState({ twodaysprice: data });
            localStorage.setItem('twodaysprice', JSON.stringify(data))
        }))
}
// This function gets the prices for the three days ago.
getThreeDaysPrice = () => {
    // Get the date for three days ago in timestamp
    let time = moment().subtract(3, 'days').unix();
    
    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
        .then(axios.spread((eth, btc, ltc) => {
            let data = {
                date: moment.unix(time).format("MMMM Do YYYY"),
                eth: eth.data.ETH.USD,
                btc: btc.data.BTC.USD,
                ltc: ltc.data.LTC.USD
            }
            
            this.setState({ threedaysprice: data });
            localStorage.setItem('threedaysprice', JSON.stringify(data))
        }))
}

componentWillMount () {
    this.getTodayPrice();
    this.getYesterdayPrice();
    this.getTwoDaysPrice();
    this.getThreeDaysPrice();
}

componentDidMount(){
    if(!navigator.onLine){
        const today = JSON.parse(localStorage.getItem('todayprice')) 
        const yesterday = JSON.parse(localStorage.getItem('yesterdayprice'))
        const twodays = JSON.parse(localStorage.getItem('twodaysprice'))
        const threedays = JSON.parse(localStorage.getItem('threedaysprice'))
        this.setState({
                todayprice: today,
                yesterdayprice: yesterday,
                twodaysprice: twodays,
                threedaysprice: threedays
              })
    }
}

render(){
    return(
        <div>
          <Grid>
                <h3>List of price of currencies since 4 days</h3> 
                <Well>
                    <p>{this.state.todayprice.date}</p>
                    <p>
                        1 ETH = ${this.state.todayprice.eth}
                    </p>
                    <p>1 BTC = ${this.state.todayprice.btc}</p>
                    <p>1 LTC = ${this.state.todayprice.ltc}</p>
                </Well>

                <Well>
                    <p>{this.state.yesterdayprice.date}</p>
                    <p>
                        1 ETH = ${this.state.yesterdayprice.eth}
                    </p>
                    <p>1 BTC = ${this.state.yesterdayprice.btc}</p>
                    <p>1 LTC = ${this.state.yesterdayprice.ltc}</p>
                </Well>

                <Well>
                    <p>{this.state.twodaysprice.date}</p>
                    <p>
                        1 ETH = ${this.state.twodaysprice.eth}
                    </p>
                    <p>1 BTC = ${this.state.twodaysprice.btc}</p>
                    <p>1 LTC = ${this.state.twodaysprice.ltc}</p>
                </Well>

                <Well>
                    <p>{this.state.threedaysprice.date}</p>
                    <p>
                        1 ETH = ${this.state.threedaysprice.eth}
                    </p>
                    <p>1 BTC = ${this.state.threedaysprice.btc}</p>
                    <p>1 LTC = ${this.state.threedaysprice.ltc}</p>
                </Well>
             </Grid>
        </div>
    )
}

  }

  export default History
