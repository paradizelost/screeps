let buildparts=require('bodypartbuilder')
let roleRepairbot = {
        run: function(creep) {
        if(creep.memory.originroom === undefined){
            creep.memory.originroom = creep.room.name
        }
        if(creep.memory.repairing == undefined){creep.memory.repairing=true}
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('gathering');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.say('repairing');
	    }
       if(creep.memory.repairing==false){
        let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_CONTAINER|| structure.structureType == STRUCTURE_STORAGE) &&  structure.store[RESOURCE_ENERGY] > 0)  ;
            }});
        if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.say("MTSC");
            creep.moveTo(container);
            }
        } else {
            if(Game.rooms[creep.memory.originroom].memory.containerstoragepercent > .7 || !(Game.rooms[creep.memory.originroom].memory.containerstoragepercent)){
            let importantstructures = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                     return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType==STRUCTURE_RAMPART) &&  structure.hits < structure.hitsMax)  ;
                 }});
                importantstructures = _.sortBy(importantstructures, (s)=>s.hits / s.hitsMax)
                if(importantstructures.length > 0){
                    if(Game.rooms[creep.memory.originroom].memory.containerstoragepercent > .5 || !(Game.rooms[creep.memory.originroom].memory.containerstoragepercent)){
                        if(creep.repair(importantstructures[0]) == ERR_NOT_IN_RANGE){ 
                            creep.moveTo(importantstructures[0])
                        }
                    }
                } else {
                    if(Game.rooms[creep.memory.originroom].memory.containerstoragepercent > .7 || !(Game.rooms[creep.memory.originroom].memory.containerstoragepercent)){
                    let damagedstructures = creep.room.find(FIND_STRUCTURES,{filter: (s) => s.hits < s.hitsMax});
                    damagedstructures = _.sortBy(damagedstructures, (s)=>s.hits / s.hitsMax)
                    if(damagedstructures.length>0){
                        if(creep.repair(damagedstructures[0]) == ERR_NOT_IN_RANGE){ 
                            creep.moveTo(damagedstructures[0])
                        }
                    }
                    }
                }
            }
        }
    }
};

module.exports = roleRepairbot;