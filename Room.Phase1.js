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
                Game.rooms[room].memory.movercount=creepcounts["mover"]
                let workerrolename = 'phase' + Game.rooms[room].memory.phase +'worker'
                let sources = Game.rooms[room].find(FIND_SOURCES )
                if(Game.rooms[room].controller.ticksToDowngrade < CONTROLLER_DOWNGRADE[Game.rooms[room].controller.level] * .2 ){
                    Game.rooms[room].memory.NeedsRecharge=1
                    console.log(room + " needs Recharge " + Game.rooms[room].memory.NeedsRecharge)
                }
                if(Game.rooms[room].controller.ticksToDowngrade > CONTROLLER_DOWNGRADE[Game.rooms[room].controller.level]*.8){
                     Game.rooms[room].memory.NeedsRecharge=0
                }
                if(Game.flags.debug && Game.flags.debug.room == Game.rooms[room]){
                    console.log(room)
                    console.log(workerrolename)
                    console.log(creepcounts[workerrolename])
                    console.log(Game.rooms[room].energyAvailable + " of " + Game.rooms[room].energyCapacityAvailable)
                }
                if(Game.rooms[room].memory.minablepositions >= 3 ||Game.rooms[room].memory.minablepositions==undefined ){
                    if((((creepcounts[workerrolename]< (Game.rooms[room].memory.minablepositions + 1) || creepcounts[workerrolename]==undefined)  && Game.rooms[room].energyAvailable >= Game.rooms[room].energyCapacityAvailable) ) || ((creepcounts[workerrolename]==0 || creepcounts[workerrolename]==undefined ) && Game.rooms[room].energyAvailable>100)) {
                        console.log('Spawning worker in '  + room)
                        require('proc.spawning').spawnworker(room)
                    }
                } else {
                    if((((creepcounts['sourceminer']< Game.rooms[room].memory.minablepositions) || creepcounts['sourceminer']==undefined)  && Game.rooms[room].energyAvailable >= Game.rooms[room].energyCapacityAvailable) || ((creepcounts['sourceminer']==0 || creepcounts['sourceminer']==undefined ) && Game.rooms[room].energyAvailable>100)) {
                        console.log('Spawning sourceminer in '  + room)
                        require('proc.spawning').spawnsourceminer(room)
                    }
                    if((((creepcounts[workerrolename]< (Game.rooms[room].memory.minablepositions) || creepcounts[workerrolename]==undefined)  && Game.rooms[room].energyAvailable >= Game.rooms[room].energyCapacityAvailable) ) || ((creepcounts[workerrolename]==0 || creepcounts[workerrolename]==undefined ) && Game.rooms[room].energyAvailable>100)) {
                        console.log('Spawning worker in '  + room)
                        require('proc.spawning').spawnworker(room)
                    }
                }
                if((Game.rooms[room].storage || Game.rooms[room].terminal) && (creepcounts["mover"] < 2 || creepcounts["mover"]==undefined)){
                    console.log("Spawning Mover in " + room)
                    require('proc.spawning').spawnmover(room)
                }
                if((Game.rooms[room].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTRACTOR}}).length > 0)&&(creepcounts["miner"] < 1 || creepcounts["miner"]==undefined)&&(Game.rooms[room].energyAvailable >= Game.rooms[room].energyCapacityAvailable)){
                    if(Game.rooms[room].find(FIND_MINERALS)[0].ticksToRegeneration < 1000){
                        console.log("Spawning Miner in "  + room)
                        require('proc.spawning').spawnminer(room)
                    } else { if(Game.flags.debug && Game.flags.debug.room == Game.rooms[room]){console.log("Not spawning miner in " + room + ", waiting for regen")}}
                }
                //require('proc.market').sellEnergy(room)
            }
        }
        if(Game.rooms[room].controller.level>2){         }
     }
};
module.exports = Phase1;