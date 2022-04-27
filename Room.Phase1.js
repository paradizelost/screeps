let Phase1 = {
     run: function(room) {
        let myroom=Game.rooms[room]
         require('assignsources').tick(room)
         if(Game.time % 1 === 0){
            //console.log('processing spawn')

            let myspawns = myroom.find(FIND_MY_SPAWNS)
            if(myspawns.length>0){
                let myspawn = myspawns[0]
                let creepcount = myroom.find(FIND_MY_CREEPS).length
                creepcounts = _.countBy(myroom.find(FIND_MY_CREEPS), c => c.memory.role)
                myroom.memory.movercount=creepcounts["mover"]
                let workerrolename = 'phase' + myroom.memory.phase +'worker'
                let sources = myroom.find(FIND_SOURCES )
                if(myroom.controller.ticksToDowngrade < CONTROLLER_DOWNGRADE[myroom.controller.level] * .2 ){
                    myroom.memory.NeedsRecharge=1
                    console.log(room + " needs Recharge " + myroom.memory.NeedsRecharge)
                }
                if(myroom.controller.ticksToDowngrade > CONTROLLER_DOWNGRADE[myroom.controller.level]*.8){
                     myroom.memory.NeedsRecharge=0
                }
                if(Game.flags.debug && Game.flags.debug.room == myroom){
                    console.log(room)
                    console.log(workerrolename)
                    console.log(creepcounts[workerrolename])
                    console.log(myroom.energyAvailable + " of " + myroom.energyCapacityAvailable)
                }
                if(myroom.memory.minablepositions >= 3 ||myroom.memory.minablepositions==undefined ){
                    if((((creepcounts[workerrolename]< (myroom.memory.minablepositions + 1) || creepcounts[workerrolename]==undefined)  && myroom.energyAvailable >= myroom.energyCapacityAvailable) ) || ((creepcounts[workerrolename]==0 || creepcounts[workerrolename]==undefined ) && myroom.energyAvailable>100)) {
                        console.log('Spawning worker in '  + room)
                        require('proc.spawning').spawnworker(room)
                    }
                } else {
                    if((((creepcounts['sourceminer']< myroom.memory.minablepositions) || creepcounts['sourceminer']==undefined)  && myroom.energyAvailable >= myroom.energyCapacityAvailable) || ((creepcounts['sourceminer']==0 || creepcounts['sourceminer']==undefined ) && myroom.energyAvailable>100)) {
                        console.log('Spawning sourceminer in '  + room)
                        require('proc.spawning').spawnsourceminer(room)
                    }
                    if((((creepcounts[workerrolename]< (myroom.memory.minablepositions+1) || creepcounts[workerrolename]==undefined)  && myroom.energyAvailable >= myroom.energyCapacityAvailable) ) || ((creepcounts[workerrolename]==0 || creepcounts[workerrolename]==undefined ) && myroom.energyAvailable>100)) {
                        console.log('Spawning worker in '  + room)
                        require('proc.spawning').spawnworker(room)
                    }
                }
                if((myroom.storage || myroom.terminal) && (creepcounts["mover"] < 2 || creepcounts["mover"]==undefined)){
                    console.log("Spawning Mover in " + room)
                    require('proc.spawning').spawnmover(room)
                }
                if((myroom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTRACTOR}}).length > 0)&&(creepcounts["miner"] < myroom.memory.mineralminablepositions || creepcounts["miner"]==undefined)&&(myroom.energyAvailable >= myroom.energyCapacityAvailable)){
                    if(myroom.find(FIND_MINERALS)[0].ticksToRegeneration == undefined || myroom.find(FIND_MINERALS)[0].ticksToRegeneration < 1000 ){
                        console.log("Spawning Miner in "  + room)
                        require('proc.spawning').spawnminer(room)
                    } else { if(Game.flags.debug && Game.flags.debug.room == myroom){console.log("Not spawning miner in " + room + ", waiting for regen")}}
                }
                if(myroom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TERMINAL}}).length > 0){
                    console.log("starting market check for room " + room)
                    try{
                        let availtosell = myroom.terminal.store.getUsedCapacity([RESOURCE_ENERGY]) - 200000
                        if(availtosell > 1000){
                            require('proc.market').sellEnergy(room)  
                        }
                    }catch{
                        console.log("Myroom" + myroom)
                        console.log("Room" + room)
                    }
                }
                //require('proc.market').sellEnergy(room)
            }
        }
        if(myroom.controller.level>2){         }
     }
};
module.exports = Phase1;