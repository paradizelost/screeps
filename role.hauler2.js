 var roleHauler2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carryCapacity > creep.carry.energy){
        var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
               return (structure.structureType == STRUCTURE_CONTAINER &&  structure.store[RESOURCE_ENERGY] > 0)  ;
            }});
        if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.say("MTSC");
            creep.moveTo(container);
            }
        } else {
            var spawntarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                       return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&structure.energy < structure.energyCapacity)  
                   }
            });
            if(spawntarget != undefined) {
                if(creep.transfer(spawntarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('refilling')
                    creep.moveTo(spawntarget);
                }
            } else {
                creep.say('MTF')
                creep.moveTo(Game.flags.Flag1); 
            }
        }
 },
    spawn: function(){
        var myrole='hauler2';
        var nummyrole=1;
        var myroles = _.filter(Game.creeps, (creep) => creep.memory.role == myrole);
        if(myroles.length < nummyrole) { 
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + nummyrole);
            var newName = Game.spawns['Spawn1'].createCreep([MOVE,CARRY], undefined, {role: myrole});
            console.log('Spawning new ' + myrole + ': ' + newName);
        }
    }
 };
 module.exports = roleHauler2;