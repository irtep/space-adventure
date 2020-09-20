import React, { Component } from "react";
import { render } from "react-dom";

class ProductOfPlanet extends Component {
  constructor(props) {
    super(props);
    this.buyAction = this.buyAction.bind(this);
  }
  buyAction(data){
    const tradeProduct = {action: 'buyAction', name: data.target.value, price: data.target.id, wanted: false, quantity: 1};
    /*this.props.dataReceiver(info.target.value); */
    this.props.dataReceiver(tradeProduct);
  }
  render() {
    //const buttonsValue = 'buy container of ' + this.props.name;
    const thePrice = Math.round(this.props.price);
    return (
      <div id="prodOfPlanet"> 
        buy a container of <input type= "button" id= {thePrice} value= {this.props.name} onClick= {this.buyAction}/>. Price: {thePrice}
      </div>
    );
  }
}

export default ProductOfPlanet;