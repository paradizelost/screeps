let runSources = {
     tick: function(roomname) {
        let sources = Game.rooms[roomname].find(
            FIND_DROPPED_RESOURCES, {
                filter: (mineral) => mineral.resourceType === RESOURCE_ENERGY
            });
        for(let source of sources){
            try{
                let allhaulers = _.filter(Game.rooms[roomname].find(FIND_MY_CREEPS), (creep) => creep.memory.role=='hauler' );
                let unassignedhaulers = _.filter(allhaulers, (creep) => (creep.memory.destsource == undefined && creep.memory.role=='hauler'));
                let assignedhaulers = _.filter(allhaulers, (creep) => (creep.memory.destsource != undefined && creep.memory.role=='hauler'));
                let myhaulers = _.filter(allhaulers, (creep) => (creep.memory.destsource != undefined && creep.memory.destsource.id==source.id && creep.memory.role=='hauler'));
                let sourcecount = sources.length
                let persrc = allhaulers.length / sourcecount
                if(global.verbosity>0){
                    console.log('My Assigned Haulers: ' +myhaulers.length + ' Max per source:' + persrc + ' Total Haulers:' + allhaulers.length + ' Total Sources:' + sourcecount + ' Unassigned Haulers:' + unassignedhaulers.length)
                }
                if(unassignedhaulers.length > 0){
                    if(myhaulers.length < persrc){
                        unassignedhaulers[0].memory.destsource = source
                    } else {}
                }
            } catch(e){}
        }
     }
};
module.exports = runSources;