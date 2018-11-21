import React, { Component } from 'react';
import axios from 'axios';
import { map, isEmpty } from 'lodash';
import swal from 'sweetalert2';
import './App.css';
import { EFFICIENT_CHAMP_LIST, EFFICIENT_ITEM_LIST, EFFICIENT_RUNE_LIST, EFFICIENT_SPELL_LIST, LEAGUE_SERVER } from './config';



class App extends Component {
  state = {
    matchInfo: null,
    summonerName: "",
    error: null,
    page: 1
  }



  handleSubmit = (page) => {
    swal({
      title: "Fetching match data, please wait.",
      html: "Taking long? The Heroku server is probably <b><span style='color:red;'>waking up</span>!</b>"
    })
    swal.showLoading();
    axios.get(LEAGUE_SERVER + "?summonerName=" + this.state.summonerName + "&page=" + page, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res=>{
      this.setState({
        matchInfo: res.data,
        error: null
      });
      swal.close();
    }).catch(err=>{
      this.setState({
        error: "There was a problem looking for the matches. Please try again later!"
      })
      swal.close();
    });
  }

  changeNameInput =(e)=>{
    this.setState({
      summonerName: e.target.value
    });
  }


  render() {
    return (
      <div className="App">
      {
        !isEmpty(this.state.error) && (
          <div className="errorMessage">
            <div>
              {this.state.error}
            </div>
          </div>
        ) 
      }
      
        <div style={{paddingTop: "80px"}}>
          <div className="formContainer">
            <input 
              className="summonerNameInput" 
              type="text" 
              placeholder="Enter Summoner Name"
              onChange={this.changeNameInput}
            />
            <br/>
            <button 
              className="summonerNameSubmit" 
              onClick={()=>this.handleSubmit(0)}>
              Find Match Data
            </button>
          </div>

          {
            this.state.matchInfo && this.state.matchInfo.summonerName &&
            (
              <div className="summonerNameDisplay">
                Displaying Matches for <br/> 
                <span className="summonerNameEmbelish" >
                  {this.state.matchInfo.summonerName}
                </span>
              </div>
            )
          }

          <div className="matchesInfo">
          {
            this.state.matchInfo && map(this.state.matchInfo.matches, (value,key)=>{
              let victoryStatus = value.win ? "Victory" : "Loss";
              let matchClass = value.win ? "victoryMatch" : "lossMatch";
              let gameMinutes = (value.gameDuration/60).toFixed(0);
              let gameSeconds = value.gameDuration%60;
              let championName = EFFICIENT_CHAMP_LIST[value.championId].name;
              let championNameImageFormat = championName.replace(/[^A-Z0-9]/ig, '').toLowerCase();
              championNameImageFormat = championNameImageFormat.charAt(0).toUpperCase() + championNameImageFormat.slice(1);
              let championImageLoc = championNameImageFormat + ".png";
              let spell1Name = EFFICIENT_SPELL_LIST[value.spell1Id].name;
              let spell2Name = EFFICIENT_SPELL_LIST[value.spell2Id].name;
              let primaryRuneName = value.primaryRune ? EFFICIENT_RUNE_LIST[value.primaryRune].name : "";
              let secondaryRuneName = value.secondaryRune ? EFFICIENT_RUNE_LIST[value.secondaryRune].name : "";
            
              let items = {
                0: value.item0 ?  EFFICIENT_ITEM_LIST[value.item0] ? EFFICIENT_ITEM_LIST[value.item0].name : "" : "",
                1: value.item1 ?  EFFICIENT_ITEM_LIST[value.item1] ? EFFICIENT_ITEM_LIST[value.item1].name : "" : "",
                2: value.item2 ?  EFFICIENT_ITEM_LIST[value.item2] ? EFFICIENT_ITEM_LIST[value.item2].name : "" : "",
                3: value.item3 ?  EFFICIENT_ITEM_LIST[value.item3] ? EFFICIENT_ITEM_LIST[value.item3].name : "" : "",
                4: value.item4 ?  EFFICIENT_ITEM_LIST[value.item4] ? EFFICIENT_ITEM_LIST[value.item4].name : "" : "",
                5: value.item5 ?  EFFICIENT_ITEM_LIST[value.item5] ? EFFICIENT_ITEM_LIST[value.item5].name : "" : "",
                6: value.item6 ?  EFFICIENT_ITEM_LIST[value.item6] ? EFFICIENT_ITEM_LIST[value.item6].name : "" : "",
              }


              let creepsPerMin = (value.creepScore/(value.gameDuration/60)).toFixed(1);
              return (
                <div key={key} className="matchTable">
                  <div className={matchClass + " matchContainer"} style={{minWidth: "320px", display: "inline-block"}}>
                    <div className="matchState">
                      {victoryStatus +  " - " + gameMinutes + "m " + gameSeconds + "s"} 
                    </div>
                    <div className="champStats">
                      <img alt={championName} className="championImage" src={process.env.PUBLIC_URL + "/img/champion/" + championImageLoc} />
                      <div className="champTextStats">
                        <div className="runesAndSpells">
                          <div style={{padding: "10px"}}>
                            {spell1Name}
                            <br/>
                            {spell2Name}
                          </div>
                          <div style={{color: "rgb(255,140,0)", padding: "10px"}}>
                            {primaryRuneName}
                            <br/>
                            {secondaryRuneName}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kdaStats">
                      <div>

                        <div className="championName">
                          {championName} <span style={{color: "green", fontSize: ".7em"}}>{" - Lvl: " + value.champLevel}</span>  
                        </div>
                        <br />
                        <div>
                          <span 
                            style={{color:"green"}}>
                            {value.kda.kills}
                          </span>
                          <span 
                            style={{color:"black"}}>{"/"}
                          </span>
                          <span
                            style={{color:"red"}}>{value.kda.deaths}
                          </span>
                          <span 
                            style={{color:"black"}}>{"/"}
                          </span>                    
                          <span
                            style={{color:"blue"}}>{value.kda.assists}
                          </span>
                        </div>
                      </div>
                    </div>
                    <br/>
                    <div className="itemList">
                      {
                        map(items, (value,key)=>{
                          return (
                            <div key={key}>{value}</div>
                          )
                        })
                      }
                    </div>
                    <div className="creepStats">
                      Total Creeps: {value.creepScore}
                      <br />
                      Creeps Per Minute: {creepsPerMin}
                    </div>
                  </div>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
