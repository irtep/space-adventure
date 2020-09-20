import React, { Component } from "react";
import { render } from "react-dom";
import "./mainCanvasStyle.css";
import { systems } from "../../../data/systemsAndPlanets.js";
import { goods } from "../../../data/goods.js";
import ProductOfPlayer from "./productsForSale/ProductOfPlayer.js";
import ProductOfPlanet from "./productsForSale/ProductOfPlanet.js";

// Details box handles also what thing is visible and what is not
class DetailsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updates: true,
      requestFromBottom: "",
      playerSells: 0,
      planetSells: 0,
      playersList: [],
      planetsList: [],
      planetBuys: []
    };
    this.sendToParent = this.sendToParent.bind(this);
    this.getDataFromChild = this.getDataFromChild.bind(this);
  }
  getDataFromChild(data){
    // send received buy action to parent.
    this.props.playerBuys(data);
  }
  sendToParent(info) {
    if (this.state.updates === false) {
      this.setState({ updates: true });
    }
    this.props.dataReceiver(info.target.value);
  }
  componentDidMount() {
    const detailsDiv = document.getElementById("details");
    const spaceDiv = document.getElementById("space");
    const postCombatDiv = document.getElementById("postCombatDiv");
    const preCombatDiv = document.getElementById("preCombatDiv");
    const productsMarket = document.getElementById('productsMarket');
    const playersMarket = document.getElementById('playersMarket');
    const divs = [detailsDiv, spaceDiv, preCombatDiv, postCombatDiv, productsMarket, playersMarket];
    // all invisibile
    divs.forEach(divi => {
      if (divi.classList.contains("invis") === false) {
        divi.classList.add("invis");
      }
    });
  }
  shouldComponentUpdate(props, state) {
    // updates only when needed to avoid "flashing" images
    if (state.updates) {
      return true;
    } else {
      if (props.showDetailsOf === "postCombat" || props.showDetailsOf === 'Cargo') {
        if (props.gameObject.player.planetLocation === 'space' && props.showDetailsOf === 'Cargo') {
          console.log('not updating as space and cargo');
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }
  componentDidUpdate() {
    const detailsDiv = document.getElementById("details");
    const spaceDiv = document.getElementById("space");
    const postCombatDiv = document.getElementById("postCombatDiv");
    const preCombatDiv = document.getElementById("preCombatDiv");
    const productsMarket = document.getElementById('productsMarket');
    const playersMarket = document.getElementById('playersMarket');
    const divs = [detailsDiv, spaceDiv, preCombatDiv, postCombatDiv];
    //console.log('state of details box', this.state);
    // travel button need to be hidden
    if (document.getElementById('travelButton').classList.contains('invis') === false) {
      document.getElementById('travelButton').classList.add('invis');
    }
    // makes planet details
    if (this.props.clickedPlanet !== null && this.props.gameObject !== "") {
      const systemLocation = this.props.gameObject.player.systemLocation;
      const getSystem = systems.filter(syst => systemLocation === syst.name);
      const chosenPlanet = getSystem[0].locations.filter(planet => this.props.clickedPlanet === planet.name);
      // if planet was clicked
      if (chosenPlanet.length > 0) {
        if (productsMarket.classList.contains('invis') === false) {
          productsMarket.classList.add('invis');
        }
        if (playersMarket.classList.contains('invis') === false) {
          playersMarket.classList.add('invis');
        }
        if (document.getElementById('travelButton').classList.contains('invis')) {
          document.getElementById('travelButton').classList.remove('invis');
        }
        document.getElementById("planetsName").innerHTML = `${chosenPlanet[0].name}`;
        document.getElementById("planetsImage").innerHTML = `<img src= "${chosenPlanet[0].image
        }" class= "planetImg" alt= "planetsImage" />`;
        document.getElementById("planetsDesc").innerHTML = `${chosenPlanet[0].desc}`;
        // if buttons from bottom panel were clicked
        if (this.state.planetSells !== 0) {
          this.setState({
            planetSells: 0
          });
        }
      } else {
        const componentsTitle = document.getElementById("planetsName");
        const firstColumnHolder = document.getElementById("planetsImage");
        const secondColumnHolder = document.getElementById("planetsDesc");
        const thirdColumnHolder = document.getElementById("planetsCommands");
        const gOb = this.props.gameObject;
        let columnTitle = null;
        let firstColumn = null;
        let secondColumn = null;
        let thirdColumn = null;

        switch (this.props.showDetailsOf) {
          case "Help Me!":
            // products details invisibles
            if (productsMarket.classList.contains('invis') === false) {
              productsMarket.classList.add('invis');
            }
            if (playersMarket.classList.contains('invis') === false) {
              playersMarket.classList.add('invis');
            }
          firstColumn = 'Welcome to game, Captain!';
            secondColumn = `<span class= "smaller">Where am I?<br/>
            - You are at your spaceship. If you just started, it is in Earth. Your ship is marked with circle in map, saying your ships name with orange text. <br/><br/>
            What to do?<br/>
            - You can travel to other locations by clicking planet, then from there "travel here".<br/>
            - When you are at planets/bases, you can sell or buy containers in those to make money. You can do this at "cargo" place, that you can find by clicking cargo button at down panel at map screen. <br/>
            - If you want to fight, you can click some other ship (those moving circles, if you see any) and then there should be button saying that you can set course to intercept it. Then if you are faster, you will catch him and fight starts. <br/><br/>
            What is the mission or purpose?<br/>
            - Nothing! This game is not finished, you can just now travel or fight, but there is no really any reason to do it, unless you just want to pass time.</span>`;
            if (this.state.playerSells !== 0) {
              this.setState({
                playerSells: 0,
                planetSells: 0,
                playersList: [],
                planetsList: []
              });
            }
          break;
          case "Cargo":
            // empty cargo
            if (gOb.player.ship.cargoBay.length < 1) {
              firstColumn = `Your cargobay is empty. <br/> You have<span className= "goldText"> ${gOb.player.money}
               Sol Dollars </span>in your treasure hold.`;
              if (this.state.playerSells !== 0) {
                this.setState({
                  playerSells: 0,
                  playersList: []
                });
              }
            } else {
              // has cargo
              //console.log('PLAYER HAS CARGO: ', this.props.gameObject.player.ship.cargoBay);
              const myCargo = this.props.gameObject.player.ship.cargoBay;
              firstColumn = `You have ${gOb.player.money} Money.<br/> Your cargo: <br/>`;
              if (this.state.playersList !== myCargo) {
                this.setState({
                  playerSells: myCargo.length,
                  playersList: myCargo
                });
              }
            }
            // if not in any planet
            if (gOb.player.planetLocation === "space") {
              firstColumn = 'Due to security reasons, cargo bay can not be visited while in outer space. Please check when you get any starbase again.'
              secondColumn = `You can't buy nothing from this location. Go to any base/planet if you want to buy or sell something.`;
              if (this.state.playerSells !== 0) {
                this.setState({
                  playerSells: 0,
                  planetSells: 0,
                  playersList: [],
                  planetsList: []
                });
              }
              // if in planet/base
            } else {
              if (document.getElementById('productsMarket').classList.contains('invis')) {
                document.getElementById('productsMarket').classList.remove('invis');
              }
              if (document.getElementById('playersMarket').classList.contains('invis')) {
                document.getElementById('playersMarket').classList.remove('invis');
              }
              const systemLoc = systems.filter(syst => syst.name === gOb.player.systemLocation);
              const baseLocation = systemLoc[0].locations.filter(locx => locx.name === gOb.player.planetLocation);
              console.log('in planet: ', baseLocation[0]);

              secondColumn = `You are in ${baseLocation[0].name} <br/><br/> Things for sale: <br/> `;
              if (baseLocation[0].stations.sells.length > 0) {
                let planetSells = 0;
                const planetsList = [];
                // make what planet has for sale.
                baseLocation[0].stations.sells.forEach(obj => {
                  const getGood = goods.filter(goodie => goodie.name === obj[0]);
                  const marketPrice = (getGood[0].baseValue / 100) * obj[1];
                  const saleObject = { name: obj[0], soldPrice: marketPrice };
                  const makeId = getGood[0] + marketPrice;
                  planetSells++;
                  planetsList.push(saleObject);
                });
                if (this.state.planetSells !== planetSells && this.state.planetsList !== planetsList) {
                  this.setState({
                    planetSells,
                    planetsList,
                    planetBuys: baseLocation[0].stations.buys
                  });
                }
              } else {
                secondColumn += "Nothing for sale here.";
                if (this.state.planetSells !== 0) {
                  this.setState({
                    planetSells: 0,
                    planetsList: []
                  });
                }
              }
            }
            break;
          case "Ship":
            // products details invisibles
            if (productsMarket.classList.contains('invis') === false) {
              productsMarket.classList.add('invis');
            }
            if (playersMarket.classList.contains('invis') === false) {
              playersMarket.classList.add('invis');
            }
            firstColumn = "";
            secondColumn = `${gOb.player.profession} Spaceship ${
              gOb.player.ship.name
            } <br/><br/>
            <span className= "cyanText">Hull: </span> ${
              gOb.player.ship.hull
            } <br/><br/>
            <span className= "cyanText">Motor: </span> ${
              gOb.player.ship.motor
            } <br/><br/>
            <span className= "cyanText">Weapons : </span><br/>front battery: ${
              gOb.player.ship.weapons.front
            }<br/>
                           broadside batteries: ${
                             gOb.player.ship.weapons.star
                           } <br/><br/>`;
            if (gOb.player.ship.modules.length > 0) {
              secondColumn +=
                '<span className= "cyanText">Extra modules: </span><br/>';
              gOb.player.ship.modules.forEach(modu => {
                secondColumn += `${modu}<br/>`;
              });
            }
            break;
          //default: console.log("could not find showDetailsOfDetail in detailsBox");
        }
        componentsTitle.innerHTML = this.props.showDetailsOf;
        firstColumnHolder.innerHTML = firstColumn;
        secondColumnHolder.innerHTML = secondColumn;
      }
    }
    // all invisibile
    divs.forEach(divi => {
      if (divi.classList.contains("invis") === false) {
        divi.classList.add("invis");
      }
    });
    // check what needs to be visible
    switch (this.props.showDetailsOf) {
      case "space":
        spaceDiv.classList.remove("invis");
        if (this.state.updates === false) {
          this.setState({ updates: true });
        }
        break;
      case "preCombat":
        preCombatDiv.classList.remove("invis");
        if (this.state.updates === false) {
          this.setState({ updates: true });
        }
        break;
      case "postCombat":
        console.log('post combat request');
        postCombatDiv.classList.remove("invis");
        if (this.state.updates === false) {
          this.setState({ updates: true });
        }
        break;
      default:
        detailsDiv.classList.remove("invis");
    }
    // if planet was clicked
    if (this.props.showDetailsOf !== "space" && this.props.showDetailsOf !== "postCombat"
    && this.props.showDetailsOf !== "preCombat" && this.state.updates) {
      console.log('setting updates to false');
      this.setState({ updates: false });
    }
  }
  render() {
    return (
      <div id="details">
        <table id="detailTable">
          <tbody>
            <tr>
              <td id="planetsName"></td>
            </tr>
            <tr>
              <td id="leftSideOfComp">
                <div id= "planetsImage"></div>
                <div id= "playersMarket">
                  {this.state.playersList.map((prod, idx) => {
                    return (
                        <ProductOfPlayer
                          product = {prod}
                          key = {prod.name}
                          planetLocation = {this.props.gameObject.player.planetLocation}
                          showDetailsOf = {this.props.showDetailsOf}
                          playersCargo = {this.props.gameObject.player.ship.cargoBay}
                          dataReceiver= {this.getDataFromChild}/>
                    )})}
                </div>
              </td>
              <td id="descOfComponent">
                <div id="planetsDesc">here info about the place</div>
                <div id="productsMarket">
                  {this.state.planetsList.map((prod, idx) => {
                    return (
                        <ProductOfPlanet
                          name = {prod.name}
                          key = {prod.name}
                          price = {prod.soldPrice}
                          dataReceiver= {this.getDataFromChild}/>
                    )})}
                </div>
              </td>
              <td id="planetsCommands">
                <input
                  id="travelButton"
                  type="button"
                  value="travel here"
                  onClick={this.sendToParent}
                />
                <br />
                <input
                  id="backButton"
                  type="button"
                  value="back"
                  onClick={this.sendToParent}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default DetailsBox;
