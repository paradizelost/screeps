let roleClaimer = {
     run: function(creep) {
        if(creep.memory.originroom === undefined){
            creep.memory.originroom = creep.room.name
        }
        //let mycontroller= creep.room.find(STRUCTURE_CONTROLLER)
        if(!creep.room.controller.my){
            creep.say('claiming')
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else if(Game.flags.claim){
            creep.say('claim')
            creep.moveTo(Game.flags.claim)
        } else{
            creep.say('parking')
            creep.moveTo(creep.room.memory.claimerparkx,creep.room.memory.claimerparky,creep.room)
        }
     }
};
module.exports = roleClaimer;