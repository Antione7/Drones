var drones = require('./drones.json');
var map = require('./map.json');

var totalWeight = 0;
var usedHub = [];
var hubCurrent

for (var i in drones){
    console.log("Drone " + i + ":");

    var hubList = [];
    var weights = [];
    var hub;
    var weight;
    var hubCurrent = map[drones[i].start];

    if( !usedHub.includes(drones[i].start)){
        hubList.push(drones[i].start);
        usedHub.push(drones[i].start);
    }

    blockHubCurrent: {
        while (hubCurrent.length !== 0) {

            var maxWeight = 11;
            hub = "";
            weight = "";

            for (var j in hubCurrent){

                if (!usedHub.includes(hubCurrent[j].hub)){

                    if (hubCurrent[j].hub === drones[i].end){

                        hub = hubCurrent[j].hub;
                        weight = hubCurrent[j].weight;
                        hubCurrent = [];
                        usedHub.push(hub);
                        hubList.push(hub);
                        weights.push(weight);
                        break blockHubCurrent;

                    } else if (hubCurrent[j].weight < maxWeight){

                        hub = hubCurrent[j].hub;
                        weight = hubCurrent[j].weight;
                        maxWeight = hubCurrent[j].weight;

                    }
                }
            }

            if (hub === ""){
                hub = "ERROR";
                hubCurrent = [];
            } else {
                usedHub.push(hub);
                hubCurrent = map[hub];
                weights.push(weight);
            }

            hubList.push(hub);
        }
    }
    console.log("Hub list: " + hubList.join(', ') + ".");

    totalWeight = weights.reduce(function(acc, number){
        return acc + number;
    }, 0);
    console.log("Total weight: " + totalWeight);
    console.log("=============================");
}
