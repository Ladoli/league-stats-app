import React, { Component } from 'react';
import axios from 'axios';
import { map } from 'lodash';
import './App.css';
import { EFFICIENT_CHAMP_LIST, LEAGUE_SERVER } from './config';

let dummyData = { summonerName: 'C9 Sneaky',
matches:
 [ { gameDuration: 2579,
     participantId: 9,
     championId: 516,
     creepScore: 206,
     champLevel: 18,
     win: false,
     kda: [Object],
     spell1Id: 4,
     spell2Id: 12,
     primaryRune: 8300,
     secondaryRune: 8400,
     item0: 3193,
     item1: 3083,
     item2: 3025,
     item3: 3194,
     item4: 3047,
     item5: 0,
     item6: 3340 },
   { gameDuration: 1872,
     participantId: 4,
     championId: 157,
     creepScore: 155,
     champLevel: 16,
     win: false,
     kda: [Object],
     spell1Id: 4,
     spell2Id: 11,
     primaryRune: 8000,
     secondaryRune: 8100,
     item0: 1412,
     item1: 3072,
     item2: 3046,
     item3: 3006,
     item4: 3031,
     item5: 3143,
     item6: 3340 },
   { gameDuration: 1473,
     participantId: 1,
     championId: 202,
     creepScore: 187,
     champLevel: 13,
     win: true,
     kda: [Object],
     spell1Id: 4,
     spell2Id: 7,
     primaryRune: 8100,
     secondaryRune: 8200,
     item0: 1055,
     item1: 3009,
     item2: 3095,
     item3: 3094,
     item4: 2055,
     item5: 1038,
     item6: 3363 },
   { gameDuration: 1840,
     participantId: 8,
     championId: 11,
     creepScore: 231,
     champLevel: 16,
     win: true,
     kda: [Object],
     spell1Id: 4,
     spell2Id: 3,
     primaryRune: 8000,
     secondaryRune: 8100,
     item0: 3153,
     item1: 3124,
     item2: 3508,
     item3: 1054,
     item4: 3111,
     item5: 2055,
     item6: 3340 },
   { gameDuration: 1403,
     participantId: 2,
     championId: 29,
     creepScore: 164,
     champLevel: 12,
     win: false,
     kda: [Object],
     spell1Id: 4,
     spell2Id: 7,
     primaryRune: 8000,
     secondaryRune: 8200,
     item0: 3153,
     item1: 3085,
     item2: 1055,
     item3: 3047,
     item4: 1037,
     item5: 1038,
     item6: 3363 },
   { gameDuration: 2067,
     participantId: 10,
     championId: 126,
     creepScore: 174,
     champLevel: 17,
     win: false,
     kda: [Object],
     spell1Id: 4,
     spell2Id: 3,
     primaryRune: 8200,
     secondaryRune: 8100,
     item0: 3814,
     item1: 3142,
     item2: 3147,
     item3: 3047,
     item4: 3071,
     item5: 1053,
     item6: 3363 },
   { gameDuration: 1296,
     participantId: 9,
     championId: 81,
     creepScore: 178,
     champLevel: 11,
     win: false,
     kda: [Object],
     spell1Id: 4,
     spell2Id: 12,
     primaryRune: 8300,
     secondaryRune: 8200,
     item0: 1055,
     item1: 3042,
     item2: 3078,
     item3: 0,
     item4: 0,
     item5: 2422,
     item6: 3340 },
   { gameDuration: 1570,
     participantId: 4,
     championId: 238,
     creepScore: 148,
     champLevel: 13,
     win: false,
     kda: [Object],
     spell1Id: 4,
     spell2Id: 14,
     primaryRune: 8100,
     secondaryRune: 8200,
     item0: 3147,
     item1: 3142,
     item2: 3047,
     item3: 3156,
     item4: 2031,
     item5: 2055,
     item6: 3340 },
   { gameDuration: 1361,
     participantId: 4,
     championId: 238,
     creepScore: 148,
     champLevel: 13,
     win: true,
     kda: [Object],
     spell1Id: 4,
     spell2Id: 14,
     primaryRune: 8100,
     secondaryRune: 8200,
     item0: 3147,
     item1: 3814,
     item2: 3142,
     item3: 3047,
     item4: 1036,
     item5: 2055,
     item6: 3340 },
   { gameDuration: 1585,
     participantId: 8,
     championId: 103,
     creepScore: 184,
     champLevel: 15,
     win: true,
     kda: [Object],
     spell1Id: 4,
     spell2Id: 7,
     primaryRune: 8100,
     secondaryRune: 8300,
     item0: 1056,
     item1: 3285,
     item2: 1082,
     item3: 3020,
     item4: 3165,
     item5: 1058,
     item6: 3340 } ],
accountID: 78247 };

class App extends Component {
  state = {
    matchInfo: dummyData,
    summonerName: null
  }

  handleSubmit = () => {
    axios.get(LEAGUE_SERVER + "?summonerName=" + this.state.summonerName, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res=>{
      console.log(res.data)
      this.setState({
        matchInfo: res.data
      })
    }).catch(err=>{
      console.log(err)
    });
  }

  changeNameInput =(e)=>{
    this.setState({
      summonerName: e.target.value
    });
  }


  render() {
    console.log(this.state)
    return (
      <div className="App">
        <div>
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
              onClick={()=>this.handleSubmit()}>
              Find Match Data
            </button>
          </div>

          <div className="matchesInfo">
          {
            this.state.matchInfo && map(this.state.matchInfo.matches, (value,key)=>{
              let victoryStatus = value.win ? "Victory" : "Loss";
              let matchClass = value.win ? "victoryMatch" : "lossMatch";
              let gameMinutes = (value.gameDuration/60).toFixed(0);
              let gameSeconds = value.gameDuration%60;
              let championName = EFFICIENT_CHAMP_LIST[value.championId].name;
              return (
                <div key={key} className={matchClass + " matchTable"}>
                  <div className="matchState">
                    {victoryStatus} 
                    <br />
                    {gameMinutes + "m " + gameSeconds + "s"} 
                  </div>
                  <div>
                    {championName}
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
