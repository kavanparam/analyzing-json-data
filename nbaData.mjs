import fetch from "node-fetch";

function fetchWarmUpData(){
    const requestUrl = "https://api.sportsdata.io/api/nba/fantasy/json/Players?key=2d5681816c7c4474a99f125654385a8d";
    
    fetch(requestUrl).then((x) => x.json()).then((obj) => {
        // logObject(obj);
        raptorsAvgHeight(obj);
    });
};

function fetchChallengeData(){
    const requestUrl = "https://api.sportsdata.io/api/nba/fantasy/json/PlayerSeasonProjectionStats/2022?key=2d5681816c7c4474a99f125654385a8d";
    
    fetch(requestUrl).then((x) => x.json()).then((obj) => {
        // logObject(obj);
        turnoverProjection(obj);
        threePointProjection(obj);
        topTenPGAssistToTurnover(obj);
        topPER(obj);
    });
}

function logObject(obj){
    console.log(obj);
}

function raptorsAvgHeight(obj){
    //Warmup Challenge
    /* Write a function that finds the average height of all players on the Toronto Raptors */
    const raptorsPlayers = obj.filter((player)=> player.Team === 'TOR');
    const raptorsPlayersHeight = raptorsPlayers.map((player) => player.Height); //creates an array to send as input to reduce

    const avgHeight = raptorsPlayersHeight.reduce((a, b) => a+b, 0) / raptorsPlayersHeight.length;
    console.log(`The average height of all players on the Raptors is ${avgHeight} inches!\n`)
    return avgHeight;
}

function turnoverProjection(obj){
    //Challenge 1
    /* Write a function that returns the player who was projected to have the most turnovers */
    const players = obj;

    const highestTurnover = players.reduce((a, b) =>{
        // console.log(`Testing turnover output: a: ${a.Turnovers}, b:${b.Turnovers}\n`);
        if(typeof a==='object'){
            if(a.Turnovers > b.Turnovers){
                return a;
            } else if (a.Turnovers < b.Turnovers){
                return b;
            }
        }
        return b;
    }, 0);

    console.log(`The player projected to have the highest number of turnovers is ${highestTurnover.Name} with ${highestTurnover.Turnovers} turnovers!\n`);
}

function threePointProjection(obj){
    //Challenge 2
    /* Write a function that returns the player projected to have highest three point field goal percentage given they will play in at least 50 games */
    const fiftyGamesPlayed = obj.filter((i)=>{
        return i.Games>=50;
    });

    const highestThreePoint = fiftyGamesPlayed.reduce((a, b) =>{
        if(typeof a==='object'){
            if(a.ThreePointersPercentage > b.ThreePointersPercentage){
                return a;
            } else if (a.ThreePointersPercentage < b.ThreePointersPercentage){
                return b;
            }
        }
        return b;
    }, 0);

    console.log(`The player projected to have the highest 3PT% with >= 50 games played is ${highestThreePoint.Name} with 3PT FG%: ${highestThreePoint.ThreePointersPercentage}!\n`);
}

function topTenPGAssistToTurnover(obj){
    //Challenge 3
    /* The assist to turnover ratio is a valuable metric for evaluating the efficiency of point guards. 
    Write a function that returns the top 10 point guards by projected assist to turnover ratio. Make sure you account for players projected to have 
    zero turnovers otherwise the ratio will not compute */

    const pointGuardList = obj.filter((i)=>i.Position==='PG');
    //Sort by assists
    pointGuardList.sort((a,b) => {
        if(a.Turnovers && b.Turnovers){
            // console.log(`Assist to turnover ratio: ${b.Assists/b.Turnovers} - ${a.Assists/a.Turnovers}`)
            return b.Assists/b.Turnovers - a.Assists/a.Turnovers;
        }
    });

    const topTenList = pointGuardList.slice(0, 10)

    console.log(`The top ten players with the highest projected assist to turnover ratio are: ${topTenList.map((i)=>` ${i.Name} (ratio: ${(i.Assists/i.Turnovers).toFixed(2)})`)}!`);

}

function topPER(obj){
    //Challenge 4
    /* Player Efficiency Rating (PER) is an advanced metric often used to determine the "best" player by summing up all their positive 
    accomplishments and subtracting their negative accomplishments.

    You can calculate (PER) using the following formula:
    Field Goals Made * 85.910 +
    Steals * 53.897 +
    Three Points Made * 51.757 +
    Free Throws Made * 46.845 +
    Offensive Rebounds * 39.190 +
    Assists * 34.677 +
    Defensive Rebounds * 14.707 -
    Fouls * 17.174 -
    Free Throws Missed * 20.091 -
    Field Goals Missed * 39.190 -
    Turnovers * 53.897 *
    (1 / Minutes Played)

    Write a function that returns the top 10 players projected to have the highest PER. 
    Make sure you only include players projected to play at least one minute */

    

}


fetchWarmUpData();
fetchChallengeData();