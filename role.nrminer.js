let assignMiners=require('sproc')
let rolenrMiner = {
     run: function(creep) {
        if(Game.flags.nrbuild.room == creep.room){
            
            if(creep.memory.destsource==undefined){
                creep.memory.role='miner'
                assignMiners(creep.roomName)
            }
            if(creep.memory.originroom === undefined){
                creep.memory.originroom = creep.room.name
                creep.moveTo(Game.flags.nrbuild)
                creep.memory.role='miner'
            }
            if(Game.getObjectById(creep.memory.destsource.id)==undefined){creep.memory.destsource=undefined}
            let mysource=Game.getObjectById(creep.memory.destsource.id)
            if(creep.harvest(mysource) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(mysource);
            } 
        } else {
             creep.moveTo(Game.flags.nrbuild)
        }
    }
};
module.exports = rolenrMiner;