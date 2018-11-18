import React from 'react';
import PropTypes from 'prop-types';
import Quagga from './quagga/quagga';

export default class Scanner extends React.Component {

    constructor(){
      super();
      this._onDetected = this._onDetected.bind(this);
    }

    propTypes: {
        onDetected: PropTypes.string.isRequired,
    }

    render() {
        return (
            <div id="interactive" className="viewport"/>
        );
    }

    componentDidMount() {
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facing: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 0,
            decoder: {
                readers : [ "ean_reader"]
            },
            locate: true
        }, function(err) {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
        });
        Quagga.onDetected(this._onDetected);
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
        Quagga.stop();
    }

    _onDetected(result) {
        this.props.onDetected(result);
    }
};
