let assignMiners = {
     tick: function(roomname) {
        let sources = Game.rooms[roomname].find(FIND_SOURCES );
        for(let source of sources){
                let allminers = _.filter(Game.rooms[roomname].find(FIND_MY_CREEPS), (creep) => creep.memory.role=='miner' );
                let unassignedminers = _.filter(allminers, (creep) => (creep.memory.destsource == undefined && creep.memory.role=='miner'));
                let assignedminers = _.filter(allminers, (creep) => (creep.memory.destsource != undefined && creep.memory.role=='miner'));
                let myminers = _.filter(allminers, (creep) => (creep.memory.destsource != undefined && creep.memory.destsource.id==source.id && creep.memory.role=='miner'));
                let sourcecount = sources.length
                let persrc = allminers.length / sourcecount
                if(global.verbosity>0){
                    console.log('My Assigned Miners: ' +myminers.length + ' Max per source:' + persrc + ' Total Miners:' + allminers.length + ' Total Sources:' + sourcecount + ' Unassigned Miners:' + unassignedminers.length)
                }
                if(unassignedminers.length > 0){
                    if(myminers.length >= persrc){
                        //break;
                    } else {
                        unassignedminers[0].memory.destsource = source
                    }
                }
        }
     }
};
module.exports = assignMiners;