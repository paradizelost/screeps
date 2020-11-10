let Phase1 = {
     run: function(room) {
         require('assignsources').tick(room)
         if(Game.time % 10 === 0){
            //console.log('processing spawn')
            let myspawns = Game.rooms[room].find(FIND_MY_SPAWNS)
            if(myspawns.length>0){
                let myspawn = myspawns[0]
                let creepcount = Game.rooms[room].find(FIND_MY_CREEPS).length
                creepcounts = _.countBy(Game.rooms[room].find(FIND_MY_CREEPS), c => c.memory.role)
                let workerrolename = 'phase' + Game.rooms[room].memory.phase +'worker'
                let sources = Game.rooms[room].find(FIND_SOURCES )
                if(Game.rooms[room].controller.ticksToDowngrade < CONTROLLER_DOWNGRADE[Game.rooms[room].controller.level] * .2 ){
                    Game.rooms[room].memory.NeedsRecharge=1
                    console.log(Game.rooms[room].memory.NeedsRecharge)
                }
                if(Game.rooms[room].controller.ticksToDowngrade > CONTROLLER_DOWNGRADE[Game.rooms[room].controller.level]*.8){
                     Game.rooms[room].memory.NeedsRecharge=0
                     console.log(room + 'needs recharge: ' + Game.rooms[room].memory.NeedsRecharge)
                }
                if(Game.flags.debug && Game.flags.debug.room == Game.rooms[room]){
                    console.log(room)
                    console.log(workerrolename)
                    console.log(creepcounts[workerrolename])
                    console.log(Game.rooms[room].energyAvailable + " of " + Game.rooms[room].energyCapacityAvailable)
                }
                
                if((((creepcounts[workerrolename]< (sources.length * 3) || creepcounts[workerrolename]==undefined)  && Game.rooms[room].energyAvailable >= Game.rooms[room].energyCapacityAvailable) ) || ((creepcounts[workerrolename]==0 || creepcounts[workerrolename]==undefined ) && Game.rooms[room].energyAvailable>100)) {
                    require('proc.spawning').spawnworker(room)
                }
                if(Game.rooms[room].storage && Game.rooms[room].terminal && (creepcounts["mover"] < 1 || creepcounts["mover"]==undefined)  && Game.rooms[room].energyAvailable >= Game.rooms[room].energyCapacityAvailable){
                    console.log("Spawning Mover")
                    require('proc.spawning').spawnmover(room)
                }
                //require('proc.market').sellEnergy(room)
            }
        }
        if(Game.rooms[room].controller.level>2){         }
     }
};
module.exports = Phase1;