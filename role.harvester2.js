var roleHarvester2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
        else {
            var spawntargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&structure.energy < structure.energyCapacity)  
                   }

            });
            var containertargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return (structure.structureType == STRUCTURE_CONTAINER &&  structure.store[RESOURCE_ENERGY] < structure.storeCapacity)  ;
                   }

            });
            if(spawntargets.length > 0) {
                if(creep.transfer(spawntargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawntargets[0]);
                }
            } else if (containertargets.length > 0) {
                if(creep.transfer(containertargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containertargets[0]);
                }
            }else {
                creep.moveTo(Game.flags.Flag1);
            }
        }
	},
    spawn: function(){
        var myrole='harvester2';
        var nummyrole=0;
        var myroles = _.filter(Game.creeps, (creep) => creep.memory.role == myrole);
        if(myroles.length < nummyrole) { 
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + nummyrole);
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: myrole});
            console.log('Spawning new ' + myrole + ': ' + newName);
        }
    }
};

module.exports = roleHarvester2;