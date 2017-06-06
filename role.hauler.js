let buildparts=require('bodypartbuilder')
let roleHauler = {
     run: function(creep) {
        let spawntargets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
               return (((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity))  
            }
        });
        let containertargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                   return ((structure.structureType == STRUCTURE_CONTAINER ) &&  _.sum(structure.store) < structure.storeCapacity)  ;
               }
        });
        let storagetargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                   return ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_TERMINAL ) &&  _.sum(structure.store) < structure.storeCapacity)  ;
               }
        });
        if(creep.memory.originroom === undefined){
            creep.memory.originroom = creep.room.name
        }
        if(creep.memory.hauling == undefined){creep.memory.hauling=false}
        if(creep.memory.hauling && _.sum(creep.carry) == 0) {
            creep.memory.destsource=undefined
            creep.memory.hauling = false;
            creep.say('gathering');
	    }
	    if(!creep.memory.hauling && _.sum(creep.carry) == creep.carryCapacity) {
	        creep.memory.hauling = true;
	        creep.say('hauling');
	    }
	   let sources = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: {resourceType: RESOURCE_ENERGY}} || STRUCTURE_TERMINAL );
       if(creep.memory.hauling==false){
           if(Game.getObjectById(creep.memory.destsource.id)==undefined){creep.memory.destsource=undefined}
           let mysource=Game.getObjectById(creep.memory.destsource.id)
           if(creep.pickup(mysource) == ERR_NOT_IN_RANGE && creep.carryCapacity > _.sum(creep.carry)) {
                 creep.moveTo(mysource);
            }
       } else {
        if(sources != undefined ) {
            if(spawntargets) {
                if(creep.transfer(spawntargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawntargets);
                }
            } else if (containertargets) {
                if(creep.transfer(containertargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containertargets);
                }
            } else {
                if(creep.transfer(storagetargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storagetargets);
                } 
            }
        }
        if(creep.carry.RESOURCE_ZYNTHIUM > 0){
            if(creep.transfer(storagetargets, RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE) {
               creep.moveTo(storagetargets);
            }
        }
       }
     }
};
module.exports = roleHauler;