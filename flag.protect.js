let protect = {
     run: function() {
         console.log(Game.flags.protect.room)
         let creepcount=0
         let totallife=0
         let avglife=0
        if(Game.flags.protect.room.find(FIND_MY_CREEPS).length ==undefined){
            
        } else {
             creepcount = Game.flags.protect.room.find(FIND_MY_CREEPS).length
             totallife =  _.sum(Game.flags.protect.room.find(FIND_MY_CREEPS), c => c.ticksToLive)
             avglife  = totallife/creepcount
        }
        //console.log(avglife)
        if(creepcount<3||(avglife<500 && creepcount < 4 )){ 
            if(Game.flags.protect.memory.requesttime==undefined){
                Game.flags.protect.memory.requesttime=Game.time
                Game.notify('Spawning additional new room workers')
                require('Empire').spawnwarrior()
            } else {
                if(Game.time - Game.flags.protect.memory.requesttime > 500){
                    console.log('ticks have passed, trying agin.')
                    Game.flags.protect.memory.requesttime=undefined 
                }
            }
        } else {
            Game.flags.protect.memory.requesttime=undefined
        }
        if(!Game.flags.protect.room.controller.my){
            console.log('not my controller')
        }
     }
       
};
module.exports = protect;
