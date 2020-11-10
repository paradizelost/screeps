let rolenrBuilder = {
     run: function(creep) {
        if(Game.flags.claim.pos.isEqualTo(creep.pos) && creep.room == Game.flags.claim.room){
            creep.memory.role = 'phase' + creep.room.memory.phase + 'worker'
        } else {
         creep.travelTo(Game.flags.claim)
     }
     }
};
module.exports = rolenrBuilder;
