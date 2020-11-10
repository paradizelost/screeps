let roleClaimer = {
     run: function(creep) {
        if(Game.flags.claim.room==undefined){
            creep.travelTo(Game.flags.claim)
        } else{
            if(creep.claimController(Game.flags.claim.room.controller)  == ERR_NOT_IN_RANGE) {
                creep.travelTo(Game.flags.claim.room.controller)    
            }
        }
     }
};
module.exports = roleClaimer;
