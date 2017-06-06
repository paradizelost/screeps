 let buildparts=require('bodypartbuilder')
 let roleTowerrecharger = {
    run: function(creep) {
       if(creep.memory.originroom === undefined){
            creep.memory.originroom = creep.room.name
        }
        if(creep.memory.recharging && creep.carry.energy == 0) {
            creep.memory.recharging = false;
            creep.say('refilling');
	    }
	    if(!creep.memory.recharging && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.recharging = true;
	        creep.say('building');
	    }

	    if(!creep.memory.recharging) {
            let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
               return ((structure.structureType == STRUCTURE_CONTAINER|| structure.structureType == STRUCTURE_STORAGE) &&  structure.store[RESOURCE_ENERGY] > 1000)  ;
            }});
        if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.say("MTSC");
            creep.moveTo(container);
            }
        } else {
            let spawntarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return (structure.structureType == STRUCTURE_TOWER  && structure.energy < structure.energyCapacity)  
                   }
            });
            if(spawntarget != undefined) {
                if(creep.transfer(spawntarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawntarget);
                }
            } 
        }
    }
 };
 module.exports = roleTowerrecharger;