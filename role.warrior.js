var roleWarrior = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var hostile = creep.pos.findClosestByRange(Game.HOSTILE_CREEPS);

        if(hostile!=undefined) {
            var username = hostile.owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            creep.moveTo(hostile);
            creep.attack(hostile);

        } else{
            creep.moveTo(Game.flags.Flag3);
        }
    },
    spawn: function(){
        var myrole='warrior';
        var nummyrole=2;
        var myroles = _.filter(Game.creeps, (creep) => creep.memory.role == myrole);
        if(myroles.length < nummyrole) { 
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + nummyrole);
            var newName = Game.spawns['Spawn1'].createCreep([ATTACK,RANGED_ATTACK,MOVE], undefined, {role: myrole});
            console.log('Spawning new ' + myrole + ': ' + newName);
        }
    }
}

module.exports = roleWarrior;