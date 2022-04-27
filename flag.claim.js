let claim = {
     run: function() {
        if(Game.flags.claim.room==undefined){} else {
        let creepcount = Game.flags.claim.room.find(FIND_MY_CREEPS).length
        let totallife =  _.sum(Game.flags.claim.room.find(FIND_MY_CREEPS), c => c.ticksToLive)
        let avglife  = totallife/creepcount
        if(creepcount<3||(avglife<700 && creepcount < 4 )){
            if(Game.flags.claim.memory.requesttime==undefined){
                Game.flags.claim.memory.requesttime=Game.time
                Game.notify('Spawning additional new room workers')
                require('Empire').spawnnrworker()
            } else {
                if(Game.time - Game.flags.claim.memory.requesttime > 500){
                    console.log('ticks have passed, trying agin.')
                    Game.flags.claim.memory.requesttime=undefined 
                }
            }
        } else {
            Game.flags.claim.memory.requesttime=undefined
        }
        if(!Game.flags.claim.room.controller.my){
            //console.log('not my controller')
        }
        console.log("Room: " + Game.flags.claim.room  + "CreepCount:"+creepcount+"| Lifetime:" + avglife + "|Request Time:" + Game.flags.claim.memory.requesttime )
     }
     
     }
};
module.exports = claim;
