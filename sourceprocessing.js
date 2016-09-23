var runSources = {
     tick: function(roomname) {
        var sources = Game.rooms[roomname].find(FIND_DROPPED_ENERGY );
        for(var source of sources){
            var allhaulers = _.filter(Game.rooms[roomname].find(FIND_MY_CREEPS), (creep) => creep.memory.role=='hauler' );
            var unassignedhaulers = _.filter(Game.rooms[roomname].find(FIND_MY_CREEPS), (creep) => (creep.memory.destsource == undefined && creep.memory.role=='hauler'));
            var assignedhaulers = _.filter(Game.rooms[roomname].find(FIND_MY_CREEPS), (creep) => (creep.memory.destsource != undefined && creep.memory.role=='hauler'));
            var myhaulers = _.filter(Game.rooms[roomname].find(FIND_MY_CREEPS), (creep) => (creep.memory.destsource != undefined && creep.memory.destsource.id==source.id && creep.memory.role=='hauler'));
            var sourcecount = sources.length
            var persrc = allhaulers.length / sourcecount
            if(myhaulers.length >=persrc){break;} else{
                if(unassignedhaulers.length > 0){
                    unassignedhaulers[0].memory.destsource = source
                }
            }
        }
     }
};
module.exports = runSources;