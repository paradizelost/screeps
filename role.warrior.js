let roleWarrior = {
     run: function(creep) {
        var hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var hostilebuilding = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES||FIND_HOSTILE_SPAWNS );
        if(hostile!=undefined) {
            creep.say('Sorry')
            creep.moveTo(hostile);
            creep.attack(hostile);

        } else if(hostilebuilding!=undefined){
            creep.say('Sorry')
            creep.moveTo(hostilebuilding);
            creep.attack(hostilebuilding);
            
            }else if(Game.flags.Attack) {
            creep.say('ATK')
            creep.moveTo(Game.flags.Attack)
            
        } else{
             creep.say('parking')
                creep.moveTo(creep.room.memory.warriorparkx,creep.room.memory.warriorparky,creep.room.roomName)
        }
     }
};
module.exports = roleWarrior;