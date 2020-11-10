let roleMiner = {
     run: function(creep) {
        if(Game.getObjectById(creep.memory.destsource.id)==undefined){creep.memory.destsource=undefined}
        let mysource=Game.getObjectById(creep.memory.destsource.id)
        {
           if(creep.harvest(mysource) == ERR_NOT_IN_RANGE) {
                 creep.travelTo(mysource);
            } 
        } 
     }
};
module.exports = roleMiner;