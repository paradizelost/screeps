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
            let terminaltarget = creep.room.terminal
            if(creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => {return ((([STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER].includes(s.structureType)) && s.energy < s.energyCapacity))}})){
                let spawntarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => {return (((s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity))}});
                if(creep.transfer(spawntarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawntarget,{ignoreCreeps:ignorecreeps})
                }
            }else if(creep.transfer(terminaltarget,RESOURCE_ENERGY)== ERR_NOT_IN_RANGE) {
                creep.say('Putting Energy')
                creep.travelTo(terminaltarget);
            }
        } else {
            if(filllevel < creep.carryCapacity){
                let storagetarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return ((s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER ) &&  _.sum(s.store) >= 500)  ;}});
                if(creep.withdraw(storagetarget,RESOURCE_ENERGY)== ERR_NOT_IN_RANGE) {
                           creep.say('Getting Energy')
                           creep.travelTo(storagetarget);
                } 
            }
        }
        creep.memory.lastpos=creep.pos
}
}
module.exports = mover;