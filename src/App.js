import React from 'react';
import Scanner from './Scanner';
import Result from './Result';
import Battle from './Battle';
import Ranking from './Ranking';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon'
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const scanBtn = {
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
  margin: '30px auto',
  height:'50px',
  fontSize:'15px'
  };

const menuText = {
  marginLeft:'auto',
  marginRight:'auto',
  };

const modalStyle = {
    position: 'absolute',
    padding: '30px',
    transform: 'translate(0%, 10%)'
  };

const modalText = {
    color:'white',
    marginTop:'20px',
    marginBottom:'20px'
  };

export default class App extends React.Component {
    constructor(){
      super();
      this.state = {
        scanning1: false,
        scanned1:false,
        results1: [],
        results2:[],
        scanning2: false,
        scanned2:false,
        stats1:[],
        stats2:[],
        name1:null,
        name2:null,
        table:false,
        battle:false,
        help:false
      };
      this._scan1=this._scan1.bind(this);
      this._scan2=this._scan2.bind(this);
      this._onDetected1=this._onDetected1.bind(this);
      this._onDetected2=this._onDetected2.bind(this);
      this.registerTotal=this.registerTotal.bind(this);
      this.resetScan=this.resetScan.bind(this);
      this.showTable=this.showTable.bind(this);
      this.showHelp=this.showHelp.bind(this);
      this.closeModal=this.closeModal.bind(this);
    }

    render() {
        return (
          <div>
            <AppBar position="static" color="default">
              <Toolbar>
                <IconButton color="inherit" aria-label="Menu" onClick={this.showTable}>
                  <Icon>bar_chart</Icon>
                </IconButton>
                  <Typography variant="h6" color="inherit" style={menuText}>
                    Barcode Battler
                  </Typography>
                <IconButton color="inherit" aria-label="Menu" onClick={this.showHelp}>
                    <Icon>help</Icon>
                </IconButton>
               </Toolbar>
              </AppBar>
            <div>
              {this.state.table? <Ranking /> : null}
            </div>
            <Grid container spacing={24}>
              <Grid item xs={4}>
              </Grid>
              <Grid item xs={4}>
                <div id="scan-area">
                    <Button variant='extendedFab' color='primary' size='small' onClick={this._scan1} style={scanBtn} fullWidth='true'>{this.state.scanning1 ? 'Stop' : 'PLAYER1'}</Button>
                </div>
              </Grid>
              <Grid item xs={4}>
              </Grid>
              <Grid item xs={12}>
                {this.state.results1.map((result) => (<Result key={result.codeResult.code} player={1} result={result} registerTotal={this.registerTotal}/>))}
                {this.state.scanning1 ? <Scanner onDetected={this._onDetected1} /> : null}
              </Grid>


              <Grid item xs={4}>
              </Grid>
              <Grid item xs={4}>
                <div id="scan-area">
                  <Button variant='extendedFab' color='primary' size='small' onClick={this._scan2} style={scanBtn} fullWidth='true'>{this.state.scanning2 ? 'Stop' : 'PLAYER2'}</Button>
                </div>
              </Grid>
              <Grid item xs={4}>
              </Grid>
              <Grid item xs={12}>
                {this.state.results2.map((result) => (<Result key={result.codeResult.code} player={2} result={result} registerTotal={this.registerTotal}/>))}
                {this.state.scanning2 ? <Scanner onDetected={this._onDetected2} /> : null}
              </Grid>
            </Grid>
            <div>
              {this.state.scanned1&&this.state.scanned2 ? <Battle result1={this.state.results1} result2={this.state.results2} stats1={this.state.stats1} stats2={this.state.stats2} name1={this.state.name1} name2={this.state.name2} resetScan={this.resetScan}/> : null}
            </div>

            <Modal
              aria-labelledby="help-modal-title"
              aria-describedby="help-modal-description"
              open={this.state.help}
              disableAutoFocus={true}
            >
              <div style={modalStyle}>
                <Typography variant="h5" id="help-modal-title" style={modalText}>
                  What is Barcode Battler?
                </Typography>
                <Typography variant="subtitle1" id="help-modal-description" style={modalText} component="p">
                  Barcode Battler is a battle game where players fight with existing products. Be it chewing gums, bicycles or vacuum machines, scan in any product via the camera using the barcodes (items which are not listed in Yahoo Shopping will not be eligible for the battle).
                </Typography>
                <Typography variant="subtitle1" id="help-modal-description" style={modalText} component="p">
                  Join the adventure to find the strongest product in the market!
                </Typography>
                <Button variant='contained' color='default' onClick={this.closeModal} size='small'>Close</Button>
              </div>
            </Modal>
          </div>
        );
    };

    _scan1() {
        this.setState({
          scanning1: !this.state.scanning1,
          results1:[]
        });
      };

      _scan2() {
          this.setState({
            scanning2: !this.state.scanning2,
            results2:[]
          });
        };

    _onDetected1(result) {
        //this.setState({results: this.state.results.concat([result])});
        this.setState({
          results1: [result],
          scanned1:true
        });
    };

    _onDetected2(result) {
        //this.setState({results: this.state.results.concat([result])});
        this.setState({
          results2: [result],
          scanned2: true
        });
    };

    registerTotal(price, hits, janTotal, player, name, image,review) {
        //check if review is null
        if(review==null) review=0;

        if(player==1&&this.state.scanning1!=false){
          this.setState({
            scanning1: false,
            stats1:[price,hits,janTotal,image,review],
            name1:name
          });
        }
        else if(player==2&&this.state.scanning2!=false){
          this.setState({
            scanning2: false,
            stats2:[price,hits,janTotal,image,review],
            name2:name
          });
        }
    };

    resetScan(){
      this.setState({
        results1: [],
        scanned1: false,
        results2: [],
        scanned2: false,
        name1:null,
        name2:null,
        stats1:[],
        stats2:[]
      });
    }

    showTable(){
      this.setState({ table: !this.state.table });
    }

    showHelp(){
      this.setState({ help: !this.state.help });
    }

    closeModal(){
      this.setState({ help: false });
    }
};
