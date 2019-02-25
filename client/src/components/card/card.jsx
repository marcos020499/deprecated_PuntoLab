// assets
import "./styles.css";

// modules
import React, { Component } from 'react'

export default class card extends Component {
  render() {
    return (
        <div id="main">
            <div className="container">
                <div className="card">
                    <div className="card-wrapper">
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
