let runSources = {
     tick: function(roomname) {
        let sources = Game.rooms[roomname].find(
            FIND_DROPPED_RESOURCES, {
                filter: (mineral) => (mineral.resourceType == RESOURCE_ZYNTHIUM || mineral.resourceType == RESOURCE_OXYGEN || mineral.resourceType == RESOURCE_LEMERGIUM)
            });
        for(let source of sources){
            try{
                console.log(source)
                let allhaulers = _.filter(Game.rooms[roomname].find(FIND_MY_CREEPS), (creep) => creep.memory.role=='hauler3' );
                let unassignedhauler3s = _.filter(allhaulers, (creep) => (creep.memory.destsource == undefined && creep.memory.role=='hauler3'));
                let assignedhauler3s = _.filter(allhaulers, (creep) => (creep.memory.destsource != undefined && creep.memory.role=='hauler3'));
                let myhauler3s = _.filter(allhaulers, (creep) => (creep.memory.destsource != undefined && creep.memory.destsource.id==source.id && creep.memory.role=='hauler3'));
                let sourcecount = sources.length
                let persrc = allhaulers.length / sourcecount
                console.log('My Assigned Hauler3s: ' +myhauler3s.length + ' Max per source:' + persrc + ' Total Hauler3s:' + allhaulers.length + ' Total Sources:' + sourcecount + ' Unassigned Hauler3s:' + unassignedhauler3s.length)
                if(unassignedhauler3s.length > 0){
                    if(myhauler3s.length < persrc){
                        unassignedhauler3s[0].memory.destsource = source
                    } else {}
                }
            } catch(e){console.log(e)}
        }
     }
};
module.exports = runSources;