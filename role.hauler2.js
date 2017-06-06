 let buildparts=require('bodypartbuilder')
 let roleHauler2 = {
    run: function(creep) {
       if(creep.memory.originroom === undefined){
            creep.memory.originroom = creep.room.name
        }
        if(creep.memory.hauling == undefined){creep.memory.hauling=false}
        if(creep.memory.hauling && creep.carry.energy == 0) {
            creep.memory.hauling = false;
            creep.say('gathering');
	    }
	    if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.hauling = true;
	        creep.say('hauling');
	    }
       if(creep.memory.hauling==false){
        if(creep.carryCapacity > creep.carry.energy){
        let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
               return ((structure.structureType == STRUCTURE_CONTAINER|| structure.structureType == STRUCTURE_STORAGE) &&  structure.store[RESOURCE_ENERGY] > 0)  ;
            }});
        if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.say("MTSC");
            creep.moveTo(container);
            }
        }
        } else {
            let spawntarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity)  
                   }
            });
            if(spawntarget != undefined) {
                if(creep.transfer(spawntarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('refilling')
                    creep.moveTo(spawntarget);
                }
            } else {
                creep.say('NTD');
                creep.moveTo(creep.room.memory.hauler2parkx,creep.room.memory.hauler2parky,creep.room.roomName)
            }
        }
    }
 };
 module.exports = roleHauler2;