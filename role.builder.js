let buildparts=require('bodypartbuilder')
let roleBuilder = {
     run: function(creep) {
        if(creep.memory.originroom === undefined){
            creep.memory.originroom = creep.room.name
        }
       if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('Gathering');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        
	        if(creep.memory.buildsite==undefined|| Game.getObjectById(creep.memory.buildsite.id) == undefined){
	            creep.memory.buildsite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
	        }
	        let target = Game.getObjectById(creep.memory.buildsite.id)
            if(target) {
                
                if(creep.room.memory.containerstoragepercent > creep.room.memory.minbuildpct || creep.room.memory.containerstoragepercent === undefined  ){
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                        if(creep.fatigue<1){
                            creep.say("MTCS");
                        } else { creep.say("Tired")}
                    } 
                }else {
                creep.say(creep.room.memory.containerstoragepercent + ' parking1')
                creep.moveTo(creep.room.memory.builderparkx,creep.room.memory.builderparky,creep.room.roomName)
            }
            } else {
                creep.say('parking2')
                creep.moveTo(creep.room.memory.builderparkx,creep.room.memory.builderparky,creep.room.roomName)
            }
	    }
	    else {
	        let containers =Game.rooms[creep.memory.originroom].find(FIND_STRUCTURES, {
                    filter: (structure) => {return ((structure.structureType == STRUCTURE_CONTAINER||structure.structureType == STRUCTURE_TERMINAL || structure.structureType == STRUCTURE_STORAGE) &&  structure.store[RESOURCE_ENERGY] > 0)  ;}});
            let allcontainers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE )  ;
                   }});
            let droppedenergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: {resourceType: RESOURCE_ENERGY}});
            //find(FIND_DROPPED_RESOURCES, {filter: r => r.resourceType === RESOURCE_ENERGY}) is another option
            if(allcontainers.length==0){
                if(creep.pickup(droppedenergy) == ERR_NOT_IN_RANGE) {
                    creep.say("MTDE");
                     creep.moveTo(droppedenergy);
                }   
            } else {
                if(creep.withdraw(containers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say("MTSC");
                creep.moveTo(containers[0]);
            }
                
            }
	    }
     }
};
module.exports = roleBuilder;