var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
	       var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return (structure.structureType == STRUCTURE_CONTAINER &&  structure.store[RESOURCE_ENERGY] > 0)  ;
                   }});
                   var allcontainers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return (structure.structureType == STRUCTURE_CONTAINER)  ;
                   }});
            var droppedenergy = creep.room.find(FIND_DROPPED_ENERGY );
            if(allcontainers.length<0){
                if(creep.pickup(droppedenergy[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(droppedenergy[0]);
            }
            } else{
            if(creep.withdraw(containers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0]);
            }
            }
	    }
	},
    spawn: function(){
        var myrole='upgrader';
        var nummyrole=3;
        var myroles = _.filter(Game.creeps, (creep) => creep.memory.role == myrole);
        if(myroles.length < nummyrole) { 
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + nummyrole);
            var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], undefined, {role: myrole});
            console.log('Spawning new ' + myrole + ': ' + newName);
        }
    }
};

module.exports = roleUpgrader;