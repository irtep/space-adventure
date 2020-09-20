import React, { Component } from "react";
import { render } from "react-dom";
import UpPanel from './UpPanel.js';
import BottomPanel from './BottomPanel.js';
import MainCanvas from './mainCanvas/MainCanvas.js';
import './mainStyle.css';

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      gameObject: '',
      fromBottomToCenter: '',
      dataToBottom: ''
    }
    this.receiveDataFromCenter = this.receiveDataFromCenter.bind(this);
    this.receiveDataFromBottom = this.receiveDataFromBottom.bind(this);
    this.dataToBottom = this.dataToBottom.bind(this);
  }
  componentDidMount() {
    this.setState({gameObject: this.props.gameObject});
  }
  receiveDataFromCenter(val) {
    // update received gameObject
    this.setState({ gameObject: val});
  }
  receiveDataFromBottom(val) {
    // receiving clicks from bottom panel
    this.setState({fromBottomToCenter: val});
  }
  dataToBottom(data) {
    // bringing info about last clicked button to bottom panel
    this.setState({dataToBottom: data});
  }
  render() {
    /* could be so that 
    uppanel: name, ship, location, reputation, title, wealth
    midpanel (biggest), canvas with current starsystem there
    lowpanel: Map/Navigate	Trade	Cargo	Marines	Missions	Ship */
    return (
      <div id="gridContainer">

        <section id= "upperPage">
          <UpPanel gameObject= {this.state.gameObject} />
        </section>
        
        <section id= "centerPage"> 
          <MainCanvas 
            gameObject= {this.state.gameObject}
            dataSend= {this.receiveDataFromCenter}
            fromBottom= {this.state.fromBottomToCenter}
            toBottom= {this.dataToBottom}
            />  
        </section>
        
        <section id= "bottomPage">
          <BottomPanel 
            dataSend= {this.receiveDataFromBottom} 
            dataFromCenter= {this.state.dataToBottom}/> {/* need to las click from center to here */}
        </section>

      </div>
    );
  }
}
export default MainScreen;