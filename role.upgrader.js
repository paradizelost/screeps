let buildparts=require('bodypartbuilder')
let roleUpgrader = {
     run: function(creep) {
        if(creep.memory.originroom === undefined){
            creep.memory.originroom = creep.room.name
        }
         if(creep.memory.upgrading==undefined){creep.memory.upgrading=true}
         if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }
	    if(creep.memory.upgrading) {
	        if(creep.room.memory.containerstoragepercent>creep.room.memory.minupgradepct || !(creep.room.memory.containerstoragepercent) ){
    	        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	                   creep.say('MTRC')
                       creep.moveTo(creep.room.controller);
                }
	        } else { creep.moveTo(creep.room.memory.upgraderparkx,creep.room.memory.upgraderparky,creep.room.roomName) }
	    } else {
	        
	        let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                 filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER|| structure.structureType == STRUCTURE_STORAGE) &&  structure.store[RESOURCE_ENERGY] > 0)  ;
                 }});
                 let allcontainers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE )  ;
                   }});
            if(allcontainers.length==0){
                 let droppedenergy = creep.room.find(FIND_DROPPED_RESOURCES, {filter: {resourceType: RESOURCE_ENERGY}});
                if(creep.pickup(droppedenergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.say("MTDE");
                    creep.moveTo(droppedenergy[0]);
                }
            }else{
	           
                 if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say("MTSC");
                     creep.moveTo(container);
                }
            }
	    }
     }
};
module.exports = roleUpgrader;