let roleHauler = {
     run: function(creep) {
        if(creep.memory.originroom === undefined){
            creep.memory.originroom = creep.room.name
        }
        if(creep.memory.hauling == undefined){creep.memory.hauling=false}
        if(creep.memory.hauling && creep.carry.energy == 0) {
            creep.memory.destsource=undefined
            creep.memory.hauling = false;
            creep.say('gathering');
	    }
	    if(!creep.memory.hauling && _.sum(creep.carry) == creep.carryCapacity) {
	        creep.memory.hauling = true;
	        creep.say('hauling');
	    }
       if(creep.memory.hauling==false){
           if(Game.getObjectById(creep.memory.destsource.id)==undefined){creep.memory.destsource=undefined}
           let mysource=Game.getObjectById(creep.memory.destsource.id)
           if(creep.pickup(mysource) == ERR_NOT_IN_RANGE && creep.carryCapacity > _.sum(creep.carry)) {
                 creep.moveTo(mysource);
            } 
       } else {
            let storagetargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {return ((structure.structureType == STRUCTURE_TERMINAL ) &&  _.sum(structure.store) < structure.storeCapacity);}});
            for(let resource in creep.carry){
                    if(creep.transfer(storagetargets, resource) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storagetargets);
                    }
            }
       }
     }
};
module.exports = roleHauler;