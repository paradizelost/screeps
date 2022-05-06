let mover={
    run: function(creep) {
        let ignorecreeps=true
        if(creep.memory.lastpos==undefined || creep.memory.timeatpos==undefined){
            creep.memory.lastpos = creep.pos
            creep.memory.timeatpos = 0
        }
        if(creep.memory.working==undefined){
            creep.memory.working=false
        }
        let lastpos = _.create(RoomPosition.prototype, creep.memory.lastpos)
        if(creep.pos.isEqualTo(lastpos)){
            creep.memory.timeatpos = creep.memory.timeatpos+1
            if(creep.memory.timeatpos>2){
                //console.log(creep.name + " " + creep.memory.timeatpos)
                ignorecreeps=false
            } else { }
        } else { creep.memory.timeatpos=0}
        let filllevel = _.sum(creep.carry)
        if(creep.memory.working && filllevel == 0) {
            creep.memory.working = false;
            creep.say('Gathering');
	    }
	    if(!creep.memory.working && filllevel == creep.carryCapacity) {
	        creep.memory.working = true;
	        creep.say('working');
	    }
        if(creep.memory.working){
            //let terminaltarget = creep.room.terminal
            let spawntarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => {return ((([STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER, STRUCTURE_LAB].includes(s.structureType)) && s.energy < s.energyCapacity ))}})
            if(spawntarget){
                creep.say('ref sp')
                if(creep.transfer(spawntarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawntarget,{ignoreCreeps:ignorecreeps})
                }
            } else {
                try{
                    creep.say('finding storage')
                    let mystorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return ((s.structureType == STRUCTURE_STORAGE) &&  s.store.getFreeCapacity()>0 )   ;}});
                    creep.say('got storage')
                    if(creep.transfer(mystorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.say('MvStor')
                        creep.moveTo(mystorage,{ignoreCreeps:ignorecreeps})
                    } else {
                        creep.say("Dumped")
                    }
                } catch(e){
                    console.log(e)
                }
            }
            /*else if(terminaltarget != creep.memory.pulledenergyfrom){
                 if(creep.transfer(terminaltarget,RESOURCE_ENERGY)== ERR_NOT_IN_RANGE ) {
                    creep.say('Putting Energy')
                    creep.travelTo(terminaltarget);
                 }
            }*/
        } else if ((creep.ticksToLive < 300 || creep.ticksToLive <= creep.memory.renewto) && (Game.rooms[creep.room.name].find(FIND_MY_SPAWNS, {filter: (r) =>{return ( r.store[RESOURCE_ENERGY]>200)}}))  ) {
            if(creep.memory.renewto == undefined){
                creep.memory.renewto = 1200
            } else {
                if(creep.ticksToLive >= creep.memory.renewto){
                    delete creep.memory.renewto
                }
            }
            //console.log(creep.name + ": " + creep.ticksToLive + " " + creep.memory.renewto)
            creep.say('renewing')
            let spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
            if(spawn.renewCreep(creep) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(spawn);
            }
        } else {
            if(filllevel < creep.carryCapacity){
                /*
                let nearestcontainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return ((s.structureType == STRUCTURE_CONTAINER ) &&  s.store.getUsedCapacity('energy') >= 10)  ;}});
                if(creep.room.terminal){
                    let terminal = creep.room.terminal
                    let terminalenergy= terminal.store.getUsedCapacity('energy')
                }
                if(creep.room.storage){
                    let storage = creep.room.storage
                    let storageenergy=storage.store.getUsedCapacity('energy')
                }
                //console.log("Storage: " + storage.store.getUsedCapacity('energy'))
                //console.log("Container: " + nearestcontainer.store.getUsedCapacity('energy')
                try{
                    if(nearestcontainer == null){
                        
                    }else {
                        storagetarget = nearestcontainer
                    }
                }catch{
                    if(storageenergy > 0){
                        storagetarget = storage
                    } else if ( terminalenergy > 0) { 
                        storagetarget = terminal
                    } else {
                        console.log("we're out of energy!")
                        storagetarget=storage
                    }
                }*/
                
                let storagetarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return ((s.structureType == STRUCTURE_CONTAINER) &&  s.store.getUsedCapacity('energy') >= 1000)   ;}});
                if(storagetarget===undefined||storagetarget==null){
                    creep.say('finding storage')
                    storagetarget=creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return ((s.structureType == STRUCTURE_STORAGE) &&  s.store.getUsedCapacity('energy') >= 10)   ;}});
                    if((storagetarget==undefined ||storagetarget==null) && creep.room.terminal){
                        storagetarget=creep.room.terminal
                    }
                }
                let droppedenergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: (r) =>{return ( r.resourceType==RESOURCE_ENERGY&& r.amount>10)}});
                let tombstone =  creep.pos.findClosestByRange(FIND_TOMBSTONES, {filter: (r) =>{return ( r.store[RESOURCE_ENERGY]>200)}});
                let ruins=creep.pos.findClosestByRange(FIND_RUINS, {filter: ruin => ruin.store.getUsedCapacity(RESOURCE_ENERGY) > 0});
                if((droppedenergy == undefined) && (tombstone==undefined) && (ruins==undefined)){
                    /*try{
                //        console.log(storagetarget.store.getUsedCapacity('energy')/storagetarget.store.getCapacity())
                        if(storagetarget.store.getUsedCapacity('energy')< 1000 && (storagetarget.store.getUsedCapacity('energy')/storagetarget.store.getCapacity() < .5 )){
                                //console.log("too much crap")
                                //console.log(storagetarget.store.getUsedCapacity())
                                //creep.travelTo(storagetarget);
                        }
                    } catch(e) {
                        console.log("oops" + e)
                    }*/
//                    creep.say('2')
                    //creep.say(storagetarget)
                    if(creep.withdraw(storagetarget,RESOURCE_ENERGY)== ERR_NOT_IN_RANGE) {
                        creep.say('Getting Energy')
                        creep.travelTo(storagetarget);
                    }
                    //creep.memory.pulledenergyfrom=storagetarget
                } else {
                    if(ruins){
                        if(creep.withdraw(ruins,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            if(global.verbosity>0){
                                creep.say("MTRU");
                            }
                            creep.moveTo(ruins,{ignoreCreeps:ignorecreeps})           
                        }
                    }else if(droppedenergy){
                        if(creep.pickup(droppedenergy) == ERR_NOT_IN_RANGE) {
                            if(global.verbosity>0){
                                creep.say("MTDE");
                            }
                            creep.moveTo(droppedenergy,{ignoreCreeps:ignorecreeps})           
                        }
                    } else {
                        if(creep.withdraw(tombstone,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            if(global.verbosity>0){
                                creep.say("MTTS");
                            }
                            creep.moveTo(tombstone.pos,{ignoreCreeps:ignorecreeps})           
                        }
                    }
                }
                if(!storagetarget && (creep.carry > 0)){
                    creep.memory.working=true
                }
            }
        }
        creep.memory.lastpos=creep.pos
    }
}
module.exports = mover;