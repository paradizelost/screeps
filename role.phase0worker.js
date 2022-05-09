//'use strict';
let Phase0Worker = {
     run: function(creep) {
        let ignorecreeps=true
        if(creep.memory.lastpos==undefined || creep.memory.timeatpos==undefined){
            creep.memory.lastpos = creep.pos
            creep.memory.timeatpos = 0
        }
        if(creep.memory.assignedroom==undefined){
            creep.memory.assignedroom=creep.room.name
        }
        let lastpos = _.create(RoomPosition.prototype, creep.memory.lastpos)
        if(creep.pos.isEqualTo(lastpos)){
            
            creep.memory.timeatpos = creep.memory.timeatpos+1
            if(creep.memory.timeatpos>2){
                //console.log(creep.name + " " + creep.memory.timeatpos)
                ignorecreeps=false
            } else { }
        } else { creep.memory.timeatpos=0}
        let filllevel = _.sum(creep.carry)
        //creep.say(creep.room.memory.maphits[creep.pos.x + '-' + creep.pos.y].hits)
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
            let ruins=creep.pos.findClosestByRange(FIND_RUINS, {filter: ruin => ruin.store.getUsedCapacity(RESOURCE_ENERGY) > 0});
            if(droppedenergy == undefined && ruins==undefined){
                if(Game.getObjectById(creep.memory.destsource.id)==undefined){creep.memory.destsource=undefined}
                let mysource=Game.getObjectById(creep.memory.destsource.id)
                //mysource=creep.pos.findClosestByRange( FIND_SOURCES )
                if(creep.harvest(mysource) == ERR_NOT_IN_RANGE){
                    creep.travelTo(mysource);
                }
            } else {
                if(droppedenergy){
                if(creep.pickup(droppedenergy) == ERR_NOT_IN_RANGE) {
                    if(global.verbosity>0){
                        creep.say("MTDE");
                    }
                    creep.travelTo(droppedenergy);
                }   } else {
                    if(creep.withdraw(ruins,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        if(global.verbosity>0){
                            creep.say("MTRU");
                        }
                        creep.moveTo(ruins,{ignoreCreeps:ignorecreeps})           
                    }
                }
            }
        }
     }
};
module.exports = Phase0Worker;