import React, { Component } from 'react';
import Picker from "./picker";
import ScanQr from "./scanqr";

import './setup.css';

class Setup extends Component {
    state = {
        joinGame: false,
        ip: "http://192.168.8.100:5000"
    }

    toggleJoin = () => {
        // const joinGame = this.state.joinGame;
        // this.setState({joinGame: !joinGame})
        this.props.onSetUri();
    }

    render() {
        return (
            <div id="setupScreen">
                { !this.state.joinGame && 
                    <div>
                        <label>Enter Game Link:</label>
                        <input value={this.state.ip} onChange={(e) => this.setState({ip: e.target.value})} />
                        <button id="joinerBtn" onClick={() => this.props.onStartClicked(this.state.ip) } className="round-btn">
                            JOIN GAME
                        </button>
                    </div>
                }

                { this.state.joinGame &&
                    <React.Fragment>
                        <ScanQr onSetUri={ (uri) => this.props.onSetUri(uri) } />
                
                        <div className="tabs">
                            <button className="active" onClick={this.toggleJoin}>
                                CANCEL
                            </button>
                        </div>
                    </React.Fragment>
                }

                {/* <div className="actions">
                    {
                        this.state.tab === 0 &&
                        (
                            <Picker/>
                        )
                    }
                    {
                        this.state.tab === 1 &&
                        (
                            <ScanQr onSetUri={ (uri) => this.props.onSetUri(uri) } />
                        )
                    }
                </div>  */}
                {/* <div className="tabs">
                    <button className={this.state.tab === 0 ? 'active' : ''} onClick={ () => this.setState({tab: 0})}>
                        DURATION
                    </button>
                    <span></span>
                    <button className={this.state.tab === 1 ? 'active' : ''} onClick={ () => this.setState({tab: 1})}>
                        CONNECT
                    </button>
                </div> */}
            </div>
        );
    }
}

export default Setup;
