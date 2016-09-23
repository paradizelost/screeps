var roleHauler = {
     run: function(creep) {
        if(creep.memory.hauling == undefined){creep.memory.hauling=false}
        if(creep.memory.hauling && creep.carry.energy == 0) {
            creep.memory.destsource=undefined
            creep.memory.hauling = false;
            creep.say('gathering');
	    }
	    if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.hauling = true;
	        creep.say('hauling');
	    }
	   var sources = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY );
       if(creep.memory.hauling==false){
           if(Game.getObjectById(creep.memory.destsource.id)==undefined){creep.memory.destsource=undefined}
           var mysource=Game.getObjectById(creep.memory.destsource.id)
           
           if(creep.pickup(mysource) == ERR_NOT_IN_RANGE && creep.carryCapacity > creep.carry.energy) {
                 creep.moveTo(mysource);
            } 
       }else {
        if(sources != undefined ) 
        { var spawntargets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity)  
                   }
            });
            var containertargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return ((structure.structureType == STRUCTURE_CONTAINER ) &&  _.sum(structure.store) < structure.storeCapacity)  ;
                   }

            });
            var storagetargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return ((structure.structureType == STRUCTURE_STORAGE ) &&  _.sum(structure.store) < structure.storeCapacity)  ;
                   }

            });
            if(spawntargets) {
                if(creep.transfer(spawntargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawntargets);
                }
            } else if (containertargets) {
                if(creep.transfer(containertargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containertargets);
                }
            } else { 
                if(creep.transfer(storagetargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storagetargets);
                }
            }
        }
       }
     },
     spawn: function(roomname){
        var myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        var myroom = Game.rooms[roomname]
        for(var thisspawn in myspawns){
            var spawn = myspawns[thisspawn]
            var myrole='hauler';
            var myroles = _.filter(Game.rooms[roomname].find(FIND_MY_CREEPS), (creep) => creep.memory.role == myrole);
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + Game.rooms[roomname].memory['max'+myrole+'s']);
            if(myroles.length < Game.rooms[roomname].memory['max'+myrole+'s']) { 
                var newName = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: myrole});
                console.log('Spawning new ' + myrole + ': ' + newName);
            }
        }
     }
};
module.exports = roleHauler;