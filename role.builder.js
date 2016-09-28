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
	            creep.memory.buildsite = Game.rooms[creep.memory.originroom].find(FIND_CONSTRUCTION_SITES)[0];
	        }
	        let target = Game.getObjectById(creep.memory.buildsite.id)
	        //Check next room as well
            if(target) {
                if(Game.rooms[creep.memory.originroom].memory.containerstoragepercent > -.5 ){
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                        if(creep.fatigue<1){
                            creep.say("MTCS");
                        } else { creep.say("Tired")}
                    } 
                }
            } else {
                creep.say('parking')
                creep.moveTo(Game.rooms[creep.memory.originroom].memory.builderparkx,Game.rooms[creep.memory.originroom].memory.builderparky,creep.memory.originroom)
            }
	    }
	    else {
	        let containers =Game.rooms[creep.memory.originroom].find(FIND_STRUCTURES, {
                    filter: (structure) => {return ((structure.structureType == STRUCTURE_CONTAINER|| structure.structureType == STRUCTURE_STORAGE) &&  structure.store[RESOURCE_ENERGY] > 0)  ;}});
            let allcontainers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return (structure.structureType == STRUCTURE_CONTAINER )  ;
                   }});
            let sources = Game.rooms[creep.memory.originroom].find(FIND_SOURCES);
            let droppedenergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY );
            if(containers==0){
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
     },
     spawn: function(roomname){
        let myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        let myroom = Game.rooms[roomname]
        for(let spawn of myspawns){
            let myrole='builder';
            let myroles = _.filter(Game.creeps, (creep) => { return ((creep.memory.role == myrole) && (creep.memory.originroom == roomname))});
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + Game.rooms[roomname].memory['max'+myrole+'s']);
            if(myroles.length < Game.rooms[roomname].memory['max'+myrole+'s']) { 
                let newName = spawn.createCreep([MOVE,WORK,CARRY], undefined, {role: myrole});
                console.log('Spawning new ' + myrole + ': ' + newName);
            }
        }
     }
};
module.exports = roleBuilder;