let roleRepairbot = {

    /** @param {Creep} creep **/
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
            let importantstructures = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                     return (structure.structureType == STRUCTURE_CONTAINER &&  structure.hits < structure.hitsMax)  ;
                 }});
                importantstructures = _.sortBy(importantstructures, (s)=>s.hits / s.hitsMax)
                if(importantstructures.length > 0){
                    if(creep.repair(importantstructures[0]) == ERR_NOT_IN_RANGE){ 
                        creep.moveTo(importantstructures[0])
                    }
                } else {
                    let damagedstructures = creep.room.find(FIND_STRUCTURES,{filter: (s) => s.hits < s.hitsMax});
                    damagedstructures = _.sortBy(damagedstructures, (s)=>s.hits / s.hitsMax)
                    if(damagedstructures.length>0){
                        if(creep.repair(damagedstructures[0]) == ERR_NOT_IN_RANGE){ 
                            creep.moveTo(damagedstructures[0])
                        }
                    }
                }
        }
    },
    spawn: function(roomname){
        let myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        let myroom = Game.rooms[roomname]
        for(let spawn of myspawns){
            let myrole='repairbot';
            let myroles = _.filter(Game.creeps, (creep) => creep.memory.role == myrole && creep.memory.originroom == roomname);
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + Game.rooms[roomname].memory['max'+myrole+'s']);
            if(myroles.length < Game.rooms[roomname].memory['max'+myrole+'s']) { 
                let newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: myrole});
                console.log('Spawning new ' + myrole + ': ' + newName);
            }
        }
     }

};

module.exports = roleRepairbot;