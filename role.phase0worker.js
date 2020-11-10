//'use strict';
let Phase0Worker = {
     run: function(creep) {
        let filllevel = _.sum(creep.carry)
        if(creep.memory.working && filllevel == 0) {
            creep.memory.working = false;
            creep.say('Gathering');
	    }
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.working = true;
	        creep.say('working');
	    }
        if(creep.memory.working){
             if(creep.room.controller.ticksToDowngrade<3100){
                 if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	                   creep.say('!MTRC!')
                       creep.travelTo(creep.room.controller);
                }
             } else  if(creep.room.energyAvailable < creep.room.energyCapacityAvailable ){
                let spawntarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return (((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity))}});
                if(creep.transfer(spawntarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(spawntarget);
                }
            }  else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	                   creep.say('MTRC')
                       creep.travelTo(creep.room.controller);
                }
            }
        } else {
            let droppedenergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: {resourceType: RESOURCE_ENERGY}});
            if(droppedenergy == undefined){
                if(Game.getObjectById(creep.memory.destsource.id)==undefined){creep.memory.destsource=undefined}
                let mysource=Game.getObjectById(creep.memory.destsource.id)
                //mysource=creep.pos.findClosestByRange( FIND_SOURCES )
                if(creep.harvest(mysource) == ERR_NOT_IN_RANGE){
                    creep.travelTo(mysource);
                }
            } else {
                if(creep.pickup(droppedenergy) == ERR_NOT_IN_RANGE) {
                    if(global.verbosity>0){
                        creep.say("MTDE");
                    }
                    creep.travelTo(droppedenergy);
                }   
            }
        }
     }
};
module.exports = Phase0Worker;