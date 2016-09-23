var roleBuilder = {
     run: function(creep) {
       if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('Gathering');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
	        //Check next room as well
	        
            if(target != undefined) {
                      
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    if(creep.fatigue<1){
                    creep.say("MTCS");
                    } else { creep.say("Tired")}
                } 
            
            } else { 
                //console.log(creep.room.memory.builderpark)
                creep.moveTo(creep.room.memory.builderparkx,creep.room.memory.builderparky,creep.room.roomName)
            }
	    }
	    else {
	        var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {return ((structure.structureType == STRUCTURE_CONTAINER|| structure.structureType == STRUCTURE_STORAGE) &&  structure.store[RESOURCE_ENERGY] > 0)  ;}});
            var allcontainers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return (structure.structureType == STRUCTURE_CONTAINER )  ;
                   }});
            var sources = creep.room.find(FIND_SOURCES);
            var droppedenergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY );
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
        var myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        var myroom = Game.rooms[roomname]
        for(var thisspawn in myspawns){
            var spawn = myspawns[thisspawn]
            var myrole='builder';
            var myroles = _.filter(Game.rooms[roomname].find(FIND_MY_CREEPS), (creep) => creep.memory.role == myrole);
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + Game.rooms[roomname].memory['max'+myrole+'s']);
            if(myroles.length < Game.rooms[roomname].memory['max'+myrole+'s']) { 
                var newName = spawn.createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: myrole});
                console.log('Spawning new ' + myrole + ': ' + newName);
            }
        }
     }
};
module.exports = roleBuilder;