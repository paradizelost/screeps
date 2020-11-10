let assignMiners = {
     tick: function(roomname) {
        let sources = Game.rooms[roomname].find(FIND_SOURCES );
        for(let source of sources){
                let allminers = Game.rooms[roomname].find(FIND_MY_CREEPS, {filter: (creep) =>{return ( creep.memory.role=='miner'|| creep.memory.role == ("phase" + Game.rooms[roomname].memory.phase + "worker") )}});
                //let allstorage = Game.rooms[name].find(FIND_STRUCTURES, {filter: (s) => {return ( s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE)}})
                let unassignedminers = _.filter(allminers, (creep) => (creep.memory.destsource == undefined ));
                let sourcecount = sources.length
                let persrc = allminers.length / sourcecount
                if(unassignedminers.length > 0){
                    let myminers = _.filter(allminers, (creep) => (creep.memory.destsource != undefined && creep.memory.destsource.id==source.id ));
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