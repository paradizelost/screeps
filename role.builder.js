var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep,mysource) {
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
            
        var ttl = creep.ticksToLive
        if(ttl < 300) {
            console.log(creep.name + ': ' + ttl + ' - ' + creep.memory.role )
        }
        if(ttl < 20) {
            roleBuilder.spawn("true")
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
	        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target != undefined) {
                        if(storagepercent > .4){
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    if(creep.fatigue<1){
                    creep.say("MTCS");
                    } else { creep.say("Tired")}
                }
            } else {
                
                creep.say("MTF")
                creep.moveTo(Game.flags.Flag2);
            }
            }
	    }
	    else {
	        var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return (structure.structureType == STRUCTURE_CONTAINER &&  structure.store[RESOURCE_ENERGY] > 0)  ;
                   }});
                   var allcontainers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return (structure.structureType == STRUCTURE_CONTAINER )  ;
                   }});
            var sources = creep.room.find(FIND_SOURCES);
            var droppedenergy = creep.room.find(FIND_DROPPED_ENERGY );
            
            
            if(allcontainers.length<1){
                if(creep.pickup(droppedenergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.say("MTDE");
              creep.moveTo(droppedenergy[0]);
            }
            } else{
            if(creep.withdraw(containers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say("MTSC");
                creep.moveTo(containers[0]);
            }
            }
	    }
	},
    spawn: function(dyingcreep="false"){
        
        var myrole='builder';
        var nummyrole=4;
        var myroles = _.filter(Game.creeps, (creep) => creep.memory.role == myrole);
        if(myroles.length < nummyrole || dyingcreep=="true" ) { 
            if(dyingcreep=="true"){console.log(myrole + " dying. preventative spawn")}
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + nummyrole);
            var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY], undefined, {role: myrole});
            console.log('Spawning new ' + myrole + ': ' + newName);
        }
    }
};

module.exports = roleBuilder;