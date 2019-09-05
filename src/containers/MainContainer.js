import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const API = `http://localhost:3000/stocks`

class MainContainer extends Component {
  constructor(){
    super()
    this.state = {
      stocks: [],
      myPortfolio: [],
      selectedSort: ''
    }
    
  }

  componentDidMount(){
    fetch(API)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        stocks: data
      })
    })
  }

  purchaseStock = (stock) => {
    if (!this.state.myPortfolio.includes(stock)){
      this.setState({
        myPortfolio: [...this.state.myPortfolio, stock]
      })
    }
  }

  handleChangeSort = (e) => {
    console.log("filtering")
    this.setState({
      selectedSort: e.target.value
    })

  }

  getSortedStocks = () => {
    let copy = [...this.state.stocks]
    if (this.state.selectedSort === 'Alphabetically'){
      copy.sort((a,b) => b.name > a.name ? -1 : 1)
    } else if (this.state.selectedSort === 'Price'){
      copy.sort((a,b) => b.price > a.price ? -1 : 1)
    }
    return copy 
  }

  

  sellStock = (stock) => {
    let newPortfolio = this.state.myPortfolio.filter(s => s !== stock)
    this.setState({
      myPortfolio: newPortfolio
    })
  }

  render() {
    const {stocks, myPortfolio,selectedSort} = this.state
    return (
      <div>
        <SearchBar handleChangeSort={this.handleChangeSort} selectedSort={selectedSort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer handleClick={this.purchaseStock} stocks={this.getSortedStocks()}/>

            </div>
            <div className="col-4">

              <PortfolioContainer handleClick={this.sellStock} myPortfolio={myPortfolio} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
