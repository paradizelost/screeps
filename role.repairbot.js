var roleRepairbot = {

    /** @param {Creep} creep **/
    run: function(creep) {
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
        var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_CONTAINER|| structure.structureType == STRUCTURE_STORAGE) &&  structure.store[RESOURCE_ENERGY] > 0)  ;
            }});
        if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.say("MTSC");
            creep.moveTo(container);
            }
        } else {
            var myclosestDamagedStructure =  creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            }); 
            var closestDamagedStructure = _.first(_.sortBy(myclosestDamagedStructure, (s)=>s.hits / s.hitsMax));
            var allcontainers = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return ( s.structureType == STRUCTURE_CONTAINER)
                }
            });
            var usedstorage=0
            var mycapacity=0
            for(var i=0; i < allcontainers.length;i++){
                usedstorage+=_.sum(allcontainers[i].store)
                mycapacity+=allcontainers[i].storeCapacity
            }
            var storagepercent = usedstorage/mycapacity
            if(closestDamagedStructure) {
                        if(storagepercent > .1){
                            console.log(creep.name + " repairing. Currently at: " + storagepercent)
                            
                        if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE){ creep.moveTo(closestDamagedStructure)}
                        } else { console.log(creep.name + " waiting for more storage. Currently at: " + storagepercent)}
                    }
        }
    },
    spawn: function(){
        var myrole='repairbot';
        var nummyrole=1;
        var myroles = _.filter(Game.creeps, (creep) => creep.memory.role == myrole);
        if(myroles.length < nummyrole) { 
            
            console.log('Miners: ' + myroles.length + ' Needed: ' + nummyrole);
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: myrole});
            console.log('Spawning new ' + myrole + ': ' + newName);
        }
    }

};

module.exports = roleRepairbot;