let mover={
    run: function(creep) {
        //creep.say("Moving Minerals")
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
            let terminaltarget = creep.room.terminal
            if(creep.room.terminal){
                if(terminaltarget.store.getUsedCapacity()<200000){
                    if(this.transferAll(creep,terminaltarget) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminaltarget,{ignoreCreeps:ignorecreeps})
                    } 
                }
            }
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
                let storagetarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return ((s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER ) &&  (s.store.getUsedCapacity() > s.store.getUsedCapacity('energy') || s.store.getUsedCapacity('energy') > 200000))  ;}});
                let droppedenergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: (r) =>{return ( r.resourceType==RESOURCE_ENERGY&& r.amount>10)}});
                let tombstone =  creep.pos.findClosestByRange(FIND_TOMBSTONES, {filter: (r) =>{return ( r.store[RESOURCE_ENERGY]>200)}});
                if((droppedenergy == undefined) && (tombstone==undefined)){
                    try{
                //        console.log(storagetarget.store.getUsedCapacity('energy')/storagetarget.store.getCapacity())
                        if(storagetarget.store.getUsedCapacity('energy')< 1000 && (storagetarget.store.getUsedCapacity('energy')/storagetarget.store.getCapacity() < .5 )){
                                //console.log("too much crap")
                                //console.log(storagetarget.store.getUsedCapacity())
                                //creep.travelTo(storagetarget);
                        }
                    } catch(e) {
                        //console.log("oops" + e)
                    }
                    try{
                        for(mat in storagetarget.store){
                            if(mat=='energy' && storagetarget.store.getUsedCapacity('energy') > 200000){
                                if(creep.withdraw(storagetarget,mat)== ERR_NOT_IN_RANGE) {
                                    creep.say('Getting ' + mat )
                                    creep.travelTo(storagetarget);
                                }
                            } else {
                                if(creep.withdraw(storagetarget,mat)== ERR_NOT_IN_RANGE) {
                                    creep.say('Getting ' + mat )
                                    creep.travelTo(storagetarget);
                                }
                            }
                        }
                    } catch (e){
                        //console.log(e)
                    }
                } 
                if(!storagetarget && (creep.carry > 0)){
                    creep.memory.working=true
                }
            }
        }
        creep.memory.lastpos=creep.pos
    },
    transferAll: function(creep,targetStorage){
        let result = 0;
        for(mat in creep.store)
        {
           let tempResult = creep.transfer(targetStorage,mat);
           if(tempResult !== ERR_INVALID_ARGS) {result = tempResult;}
        }
        return result;
     }
}
module.exports = mover;