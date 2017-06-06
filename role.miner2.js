let roleMiner2 = {
     run: function(creep) {
        if(creep.memory.originroom === undefined){
            creep.memory.originroom = creep.room.name
        }
        if(Game.getObjectById(creep.memory.destsource.id)==undefined){creep.memory.destsource=undefined}
           let mysource=Game.getObjectById(creep.memory.destsource.id)
           if(creep.harvest(mysource) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(mysource);
            } 
     }
};
module.exports = roleMiner2;