var roleHauler = {
 run: function(creep) {
        if(creep.memory.hauling == undefined){creep.memory.hauling=false}
        if(creep.memory.hauling && creep.carry.energy == 0) {
            creep.memory.hauling = false;
            creep.say('gathering');
	    }
	    if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.hauling = true;
	        creep.say('hauling');
	    }
	     var sources = creep.room.find(FIND_DROPPED_ENERGY );
       if(creep.memory.hauling==false){
            if(creep.pickup(sources[0]) == ERR_NOT_IN_RANGE && creep.carryCapacity/2 > creep.carry.energy) {
            creep.moveTo(sources[0]);
        }
       }else {
        if(sources != undefined ) 
        { var spawntargets = creep.room.find(FIND_STRUCTURES, {
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
                creep.say("")
                creep.moveTo(Game.flags.Flag1);
            }
        }else{ 
                creep.say("NS,NT")
                creep.moveTo(Game.flags.Flag1);
        } 
       }
    },
    spawn: function(){
        var myrole='hauler';
        var nummyrole=2;
        var myroles = _.filter(Game.creeps, (creep) => creep.memory.role == myrole);
        if(myroles.length < nummyrole) { 
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + nummyrole);
            var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], undefined, {role: myrole});
            console.log('Spawning new ' + myrole + ': ' + newName);
        }
    }
};
module.exports = roleHauler;