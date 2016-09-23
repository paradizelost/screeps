var roleUpgrader = {
     run: function(creep) {
         
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
	        if(creep.room.memory.containerstoragepercent>.6){
    	        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	                   creep.say('MTRC')
                       creep.moveTo(creep.room.controller);
                }
	        } else { creep.moveTo(creep.room.memory.upgraderparkx,creep.room.memory.upgraderparky,creep.room.roomName) }
	    } else {
	        
	        var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                 filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER|| structure.structureType == STRUCTURE_STORAGE) &&  structure.store[RESOURCE_ENERGY] > 0)  ;
                 }});
            if(container){
                
                 if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say("MTSC");
                     creep.moveTo(container);
                }
            }else{
	            var droppedenergy = creep.room.find(FIND_DROPPED_ENERGY );
                if(creep.pickup(droppedenergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.say("MTDE");
                    creep.moveTo(droppedenergy[0]);
                }
            }
	    }
     },
     spawn: function(roomname){
        var myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        var myroom = Game.rooms[roomname]
        for(var thisspawn in myspawns){
            var spawn = myspawns[thisspawn]
            var myrole='upgrader';
            var myroles = _.filter(Game.rooms[roomname].find(FIND_MY_CREEPS), (creep) => creep.memory.role == myrole);
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + Game.rooms[roomname].memory['max'+myrole+'s']);
            if(myroles.length < Game.rooms[roomname].memory['max'+myrole+'s']) { 
                var newName = spawn.createCreep([MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY], undefined, {role: myrole});
                console.log('Spawning new ' + myrole + ': ' + newName);
            }
        }
     }
};
module.exports = roleUpgrader;