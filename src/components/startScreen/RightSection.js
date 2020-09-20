import React, { Component } from "react";
import { render } from "react-dom";
import './startStyle.css';

// this propably will only show legendary captains lists...
class RightSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return( 
    <div>
      Welcome to the early test version of the game. <br/>
      Many many features are missing and there maybe even bugs around, but you can already fly around the solar system and buy and sell products to make money, or you can intercept other space ships and start battles with them. Or maybe you can just enjoy the nice images of the planets done by few artists and incredibly photographs provided by Wikipedia. <span className= "fa fa-star stars smallStars"> </span>
    </div>
    )
  }
}

export default RightSection;