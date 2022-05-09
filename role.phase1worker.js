//'use strict';
let Phase1Worker = {
     run: function(creep) {
        let ignorecreeps=true
        if(creep.memory.lastpos==undefined || creep.memory.timeatpos==undefined){
            creep.memory.lastpos = creep.pos
            creep.memory.timeatpos = 0
        }
        if(creep.memory.assignedroom==undefined){
            creep.memory.assignedroom=creep.room.name
        }
        let lastpos = _.create(RoomPosition.prototype, creep.memory.lastpos)
        if(creep.pos.isEqualTo(lastpos)){
            
            creep.memory.timeatpos = creep.memory.timeatpos+1
            if(creep.memory.timeatpos>2){
                //console.log(creep.name + " " + creep.memory.timeatpos)
                ignorecreeps=false
            } else { }
        } else { creep.memory.timeatpos=0}
        
        let road = creep.pos.lookFor(LOOK_STRUCTURES);
        let filllevel = _.sum(creep.carry)
        if(creep.memory.working && filllevel == 0) {
            creep.memory.working = false;
            creep.say('Gathering');
	    }
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.working = true;
	        creep.say('working');
        }
        
        
        if(creep.memory.working){
            let look=creep.pos.lookFor(LOOK_STRUCTURES)
            let storagetargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return ((s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_TERMINAL ) &&  _.sum(s.store) < s.store.getCapacity())  ;}});
             if(creep.room.memory.NeedsRecharge==1){
                 if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	                   creep.say(creep.room.controller.ticksToDowngrade + " of " +  CONTROLLER_DOWNGRADE[creep.room.controller.level] * .2)
                       creep.moveTo(creep.room.controller)
                }
             } else if((creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => {return ((([STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER,STRUCTURE_LINK].includes(s.structureType)) && s.energy < s.energyCapacity))}}))&& (creep.room.memory.movercount<1||creep.room.memory.movercount==undefined)){
                let spawntarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => {return (((s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity))}});
                if(creep.transfer(spawntarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawntarget,{ignoreCreeps:ignorecreeps})
                }
            } else if(creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => {return ((([STRUCTURE_RAMPART].includes(s.structureType)) && s.hits < 20000))}})){
                let ramparttarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => {return (((s.structureType == STRUCTURE_RAMPART) && s.hits < s.hitsMax))}});
                if(creep.repair(ramparttarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(ramparttarget,{ignoreCreeps:ignorecreeps})
                }
            } else if(creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)){
                target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    if (road.length > 0) {creep.repair(road);}
                    creep.moveTo(target,{ignoreCreeps:ignorecreeps})
                }
            } else if(storagetargets && creep.room.storage&& creep.room.controller.level*125000> creep.room.storage.store.getUsedCapacity('energy')){
                 if(creep.transfer(storagetargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                     if (road.length > 0) {creep.repair(road);}
                    creep.moveTo(storagetargets,{ignoreCreeps:ignorecreeps})
                } 
            }else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	                   creep.say('MTRC')
                       if (road.length > 0) {creep.repair(road);}
                       creep.moveTo(Game.rooms[creep.memory.assignedroom].controller,{ignoreCreeps:ignorecreeps})
                }
            }
        } else if (creep.pos.findClosestByRange(FIND_MY_SPAWNS) && (creep.ticksToLive < 300 || creep.ticksToLive <= creep.memory.renewto) && (Game.rooms[creep.room.name].find(FIND_MY_SPAWNS, {filter: (r) =>{return ( r.store[RESOURCE_ENERGY]>200)}}))  ) {
            if(creep.memory.renewto == undefined){
                creep.memory.renewto = 1200
            } else {
                if(creep.ticksToLive >= creep.memory.renewto){
                    delete creep.memory.renewto
                }
            }
            creep.say('renewing')
            console.log(creep.name + ": " + creep.ticksToLive + " " + creep.memory.renewto)
            let spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
            if(spawn != undefined && spawn!= null){
                if(creep.room.memory.NeedsRecharge==1 && creep.carry.energy>0){
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.say(creep.room.controller.ticksToDowngrade + " of " +  (CONTROLLER_DOWNGRADE[creep.room.controller.level] * .2))
                            creep.moveTo(creep.room.controller)
                    }
                } else {
                    
                    if(spawn.renewCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.say('MVSP')
                        creep.moveTo(spawn);
                    }   
                }
            } else {
                creep.memory.renewto=1
            }
        } else {
            let droppedenergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: (r) =>{return ( r.resourceType==RESOURCE_ENERGY&& r.amount>200)}});
            let tombstone =  creep.pos.findClosestByRange(FIND_TOMBSTONES, {filter: (r) =>{return ( r.store[RESOURCE_ENERGY]>200)}});
            //console.log(tombstone)
            if((droppedenergy == undefined || droppedenergy==null) && (tombstone==undefined || tombstone==null)){
                creep.say("1")
                if(Game.getObjectById(creep.memory.destsource.id)==undefined){creep.memory.destsource=undefined}
                let mysource=Game.getObjectById(creep.memory.destsource.id)
                try{
                    //console.log(creep.room.memory.creepcounts)
                    if((mysource.energy==0 || ((creep.room.memory.creepcounts.sourceminer!=null ||creep.room.memory.creepcounts.sourceminer!=undefined )))){
                        creep.say("2.1")
                        //creep.say("No Energy Left to get")
                        let storagetarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return ((s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_LINK) &&  s.store.getUsedCapacity('energy') >= 100)   ;}});
                        if(storagetarget===undefined || storagetarget==null){
                            creep.say('2.2')
                            storagetarget=creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return ((s.structureType == STRUCTURE_STORAGE) &&  s.store.getUsedCapacity('energy') >= creep.room.controller.level * 125000)   ;}});
                            if((storagetarget===undefined || storagetarget==null) && creep.room.terminal && creep.room.terminal.store.getUsedCapacity('energy') > 100000){
                                creep.say('2.3')
                                storagetarget=creep.room.terminal
                            }
                        }
                        //console.log(Game.getObjectById(storagetarget.id))
                        if((storagetarget != undefined || storagetarget != null) && creep.withdraw(storagetarget,RESOURCE_ENERGY)== ERR_NOT_IN_RANGE) {
                            creep.say('3')
                            //creep.say('Getting Energy')
                            creep.travelTo(storagetarget);
                        } else {
                            if(creep.harvest(mysource) == ERR_NOT_IN_RANGE){
                                creep.moveTo(mysource,{ignoreCreeps:ignorecreeps})
                            }
                            creep.say("NSE-Ming")
                        }
                    }else {
                        if(creep.harvest(mysource) == ERR_NOT_IN_RANGE){
                            creep.moveTo(mysource,{ignoreCreeps:ignorecreeps})
                        }
                    }
                } catch(e){
                    console.log(e)
                }
            } else {
                if(droppedenergy){
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
        }
        creep.memory.lastpos=creep.pos
     }
};
module.exports = Phase1Worker;
