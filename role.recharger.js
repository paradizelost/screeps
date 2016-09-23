 var roleTowerrecharger = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.recharging && creep.carry.energy == 0) {
            creep.memory.recharging = false;
            creep.say('refilling');
	    }
	    if(!creep.memory.recharging && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.recharging = true;
	        creep.say('building');
	    }

	    if(!creep.memory.recharging) {
            var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
               return ((structure.structureType == STRUCTURE_CONTAINER|| structure.structureType == STRUCTURE_STORAGE) &&  structure.store[RESOURCE_ENERGY] > 1000)  ;
            }});
        if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.say("MTSC");
            creep.moveTo(container);
            }
        } else {
            var spawntarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return (structure.structureType == STRUCTURE_TOWER  && structure.energy < structure.energyCapacity)  
                   }
            });
            if(spawntarget != undefined) {
                if(creep.transfer(spawntarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawntarget);
                }
            } 
        }
 },
    spawn: function(roomname){
        var myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        var myroom = Game.rooms[roomname]
        for(var thisspawn in myspawns){
            var spawn = myspawns[thisspawn]
            var myrole='towerrecharger';
            var myroles = _.filter(Game.rooms[roomname].find(FIND_MY_CREEPS), (creep) => creep.memory.role == myrole);
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + Game.rooms[roomname].memory['max'+myrole+'s']);
            if(myroles.length < Game.rooms[roomname].memory['max'+myrole+'s']) { 
                var newName = spawn.createCreep([CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: myrole});
                console.log('Spawning new ' + myrole + ': ' + newName);
            }
        }
     }
 };
 module.exports = roleTowerrecharger;