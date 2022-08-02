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
        topPGAssistToTurnover(obj);
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
    return highestTurnover;
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
    return highestThreePoint;
}

function topPGAssistToTurnover(obj){
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

    console.log(`The top ten players with the highest projected assist to turnover ratio are: ${topTenList.map((i)=>
        ` ${i.Name} (ratio: ${(i.Assists/i.Turnovers).toFixed(2)})`)}!\n`);

    return topTenList;

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

    /*  ( (FieldGoalsMade * 85.910) + (Steals * 53.897) + (ThreePointersMade * 51.757) + (FreeThrowsMade * 46.845) + 
        (OffensiveRebounds * 39.190) + (Assists * 34.677) + (DefensiveRebounds * 14.707) - (PersonalFouls * 17.174) - 
        (FreeThrowsAttempted - FreeThrowsMade)*20.091 - (FieldGoalsAttempted - FieldGoalsMade)*39.190 -
        (Turnovers * 53.897) ) * (1 / Minutes); 
    */

    const sortByPER = obj.sort((a, b) => {
        
        if((a.Minutes && b.Minutes)>=1){
            
            return [
                (((b.FieldGoalsMade * 85.910) + (b.Steals * 53.897) + (b.ThreePointersMade * 51.757) + 
                    (b.FreeThrowsMade * 46.845) + (b.OffensiveRebounds * 39.190) + (b.Assists * 34.677) + 
                    (b.DefensiveRebounds * 14.707) - (b.PersonalFouls * 17.174) - 
                    (b.FreeThrowsAttempted - b.FreeThrowsMade)*20.091 - 
                    (b.FieldGoalsAttempted - b.FieldGoalsMade)*39.190 -
                    (b.Turnovers * 53.897)) * (1 / b.Minutes)) 
                    
                -

                (((a.FieldGoalsMade * 85.910) + (a.Steals * 53.897) + (a.ThreePointersMade * 51.757) + 
                    (a.FreeThrowsMade * 46.845) + (a.OffensiveRebounds * 39.190) + (a.Assists * 34.677) + 
                    (a.DefensiveRebounds * 14.707) - (a.PersonalFouls * 17.174) - 
                    (a.FreeThrowsAttempted - a.FreeThrowsMade)*20.091 - 
                    (a.FieldGoalsAttempted - a.FieldGoalsMade)*39.190 -
                    (a.Turnovers * 53.897)) * (1 / a.Minutes))];

        }
    });


    const topTenList = sortByPER.slice(0, 10);

    // console.log(topTenList);
    
    console.log(  `The top 10 players projected to have the highest Player Efficiency Ratings are: ${topTenList.map((i) =>
        ` ${i.Name} (PER: ${ (((i.FieldGoalsMade * 85.910) + (i.Steals * 53.897) + (i.ThreePointersMade * 51.757) + 
                        (i.FreeThrowsMade * 46.845) + (i.OffensiveRebounds * 39.190) + (i.Assists * 34.677) + 
                        (i.DefensiveRebounds * 14.707) - (i.PersonalFouls * 17.174) - 
                        (i.FreeThrowsAttempted - i.FreeThrowsMade)*20.091 - 
                        (i.FieldGoalsAttempted - i.FieldGoalsMade)*39.190 -
                        (i.Turnovers * 53.897)) * (1 / i.Minutes)).toFixed(2)              
                    })` )}!` );

}


fetchWarmUpData();
fetchChallengeData();