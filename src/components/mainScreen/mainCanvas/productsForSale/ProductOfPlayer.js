import React, { Component } from "react";
import { render } from "react-dom";
import { systems } from "../../../../data/systemsAndPlanets.js";
import { goods } from "../../../../data/goods.js";

class ProductOfPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceOffered: 0,
      productWanted: false
    }
    this.sellAction = this.sellAction.bind(this);
  }
  sellAction(data){
    const tradeProduct = {action: 'sellAction', name: data.target.id, price: this.state.priceOffered, wanted: false, quantity: 1};
    this.props.dataReceiver(tradeProduct);
  }
  componentDidMount() {
  }
  componentDidUpdate() {
    /*
                this.props.gameObject.player.ship.cargoBay.forEach( produ => {
                  console.log('player has for sale: ', produ.name);
                  const wantedProduct = baseLocation[0].stations.buys.filter( prd => prd[0] === produ.name);
                  console.log('list of base on case: ', baseLocation[0].stations.buys);
                  //const getGood = goods.filter(goodie => goodie.name === produ.name);
                    if (wantedProduct.length > 0) {
                      console.log('is wanted product');
                      produ.wanted = true;
                    } else {
                      console.log('is not wanted product');
                      produ.wanted = false;
                    }
                }); */
    // check that this product is wanted:
    console.log('props is cargo? ', this.props.showDetailsOf);
    if (this.props.planetLocation !== 'space' && this.props.showDetailsOf === 'Cargo') {
      console.log('product on case: ', this.props.product.name);
      let priceHere = null;
      let isWantedProduct = false;
      const systemLocation = 'Sol'; // only one star system atm. in game...
      const getSystem = systems.filter(syst => systemLocation === syst.name);
      const chosenPlanet = getSystem[0].locations.filter(planet => this.props.planetLocation === planet.name);
      console.log('before bug: ', chosenPlanet[0].stations.buys);
      console.log('before bug: ', this.props.product.name);
      const wantedProducts = chosenPlanet[0].stations.buys.filter(prd => prd[0] === this.props.product.name);
      console.log('wantedProducts', wantedProducts);
      if (wantedProducts[0] !== undefined) {
        if (wantedProducts[0].length > 0) {
          console.log('is wanted product');
          //produ.wanted = true;
          isWantedProduct = true;
        } else {
          console.log('is not wanted product');
          //produ.wanted = false;
          isWantedProduct = false;
        }
      } else {
        isWantedProduct = false
        }
      const prodInBase = chosenPlanet[0].stations.buys.filter( prod => prod[0] == this.props.product.name);
      const thisProduct = goods.filter( goodie => goodie.name === this.props.product.name);
      //console.log('prods name: ', this.props.product.name);
      //console.log('list of planet: ', chosenPlanet[0].stations.buys);
      //console.log('prod in goods: ', thisProduct[0]);
      //console.log('cP, pDb, tP ', chosenPlanet, prodInBase, thisProduct);
      if (isWantedProduct) {
        priceHere = Math.round(thisProduct[0].baseValue / 100 * prodInBase[0][1]);
      } else {
        priceHere = 0;
      }
      if (this.state.priceOffered !== priceHere) {
        this.setState({
          priceOffered: priceHere,
          productWanted: isWantedProduct
          });
      }
    } 
  }
  render() {
    let stringie = null;
    if (this.state.productWanted) {
      stringie = `base offers ${this.state.priceOffered} for container of ${this.props.product.name}. You paid ${this.props.product.price}`;
      if (document.getElementById(this.props.product.name) !== null) {
        document.getElementById(this.props.product.name).classList.remove('invis');
      } 
    } else {
      stringie = ` ${this.props.product.quantity}x ${this.props.product.name}`;
      if (document.getElementById(this.props.product.name) !== null && 
      document.getElementById(this.props.product.name).classList.contains('invis') === false) {
        document.getElementById(this.props.product.name).classList.add('invis');
      }
    }
    return (
      <div id="prodOfPlayer"> 
        <br/>{stringie}<br/>
        <input className= "invis" type= "button" value= "sell" id={this.props.product.name} onClick= {this.sellAction}/><br/><br/>
      </div>
    );
  }
}

export default ProductOfPlayer;