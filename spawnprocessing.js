let buildparts=require('bodypartbuilder')
let processSpawns = {
     tick: function(roomname) {
        let myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        for(let spawn of myspawns){
            if(spawn.spawning){spawn.memory.spawnqueued=true}else {spawn.memory.spawnqueued=false}
        } 
        let energyready = Game.rooms[roomname].energyAvailable
        let energymax = Game.rooms[roomname].energyCapacityAvailable
        if(global.verbosity>0){
        console.log(Game.rooms[roomname].memory.tickssincespawn)
        console.log(energyready / energymax)
        }
        if(energyready==energymax || energyready / energymax > .5 ||Game.rooms[roomname].memory.tickssincespawn>50){
            Game.rooms[roomname].memory.tickssincespawn=0
            let allcreeps = _.filter(Game.rooms[roomname].find(FIND_MY_CREEPS));
            let allbuilders = _.filter(allcreeps,(creep) => (creep.memory.role=='builder'))
            let allminers = _.filter(allcreeps,(creep) => (creep.memory.role=='miner'))
            let allminer2s = _.filter(allcreeps,(creep) => (creep.memory.role=='miner2'))
            let allhaulers = _.filter(allcreeps,(creep) => (creep.memory.role=='hauler'))
            let allhauler2s = _.filter(allcreeps,(creep) => (creep.memory.role=='hauler2'))
            let allhauler3s = _.filter(allcreeps,(creep) => (creep.memory.role=='hauler3'))
            let alltowerrechargers = _.filter(allcreeps,(creep) => (creep.memory.role=='towerrecharger'))
            let allrepairbots = _.filter(allcreeps,(creep) => (creep.memory.role=='repairbot'))
            let allupgraders = _.filter(allcreeps,(creep) => (creep.memory.role=='upgrader'))
            let allwarriors = _.filter(allcreeps,(creep) => (creep.memory.role=='warrior'))
            let allclaimers = _.filter(allcreeps,(creep) => (creep.memory.role=='claimer'))
            let allnrbuilders = _.filter(allcreeps,(creep) => (creep.memory.role=='nrbuilder'))
            let allnrminers = _.filter(allcreeps,(creep) => (creep.memory.role=='nrminer'))
            
            //console.log(allcreeps.length + " " + allbuilders.length + " " + allminers.length + " " + allhaulers.length + " " + allhauler2s.length + " " + alltowerrechargers.length + " " + allrepairbots.length + " " + allupgraders.length + " " + allwarriors.length)
             for(let spawn of myspawns){
                if(!spawn.spawning && !spawn.memory.spawnqueued){
                    if(global.verbosity>0){
                    console.log('WOULD SPAWN AT '+ spawn.name)
                    }
                    //spawn.memory.spawnqueued=true
                    
                    if(Game.rooms[roomname].memory.maxminers > allminers.length){
                        if(global.verbosity>0){
                        console.log('spawn miner')
                        }
                         buildparts.tick(roomname,'miner')
                        spawn.memory.spawnqueued=true
                    } else if(Game.rooms[roomname].memory.maxminer2s > allminer2s.length){
                        if(global.verbosity>0){
                        console.log('spawn miner2s')
                        }
                         buildparts.tick(roomname,'miner2')
                        spawn.memory.spawnqueued=true
                    } else if(Game.rooms[roomname].memory.maxhaulers > allhaulers.length){
                     if(global.verbosity>0){
                        console.log('spawn hauler')
                    }
                         buildparts.tick(roomname,'hauler')
                        spawn.memory.spawnqueued=true
                    }else if(Game.rooms[roomname].memory.maxhauler3s > allhauler3s.length){
                        if(global.verbosity>0){
                        console.log('spawn hauler3')
                        }
                         buildparts.tick(roomname,'hauler3')
                        spawn.memory.spawnqueued=true
                    }else if(Game.rooms[roomname].memory.maxupgraders > allupgraders.length){
                        if(global.verbosity>0){
                        console.log('spawn upgrader')
                        }
                         buildparts.tick(roomname,'upgrader')
                        spawn.memory.spawnqueued=true
                    } else if(Game.rooms[roomname].memory.maxhauler2s > allhauler2s.length){
                        if(global.verbosity>0){
                        console.log('spawn hauler2')
                        }
                         buildparts.tick(roomname,'hauler2')
                        spawn.memory.spawnqueued=true
                    } else if(Game.rooms[roomname].memory.maxtowerrechargers > alltowerrechargers.length){
                        if(global.verbosity>0){
                        console.log('spawn towerrecharger')
                        }
                         buildparts.tick(roomname,'towerrecharger')
                        spawn.memory.spawnqueued=true
                    } else if(Game.rooms[roomname].memory.maxrepairbots > allrepairbots.length){
                        if(global.verbosity>0){
                        console.log('spawn repairbot')
                        }
                         buildparts.tick(roomname,'repairbot')
                        spawn.memory.spawnqueued=true
                    }else if(Game.rooms[roomname].memory.maxbuilders > allbuilders.length){
                        if(global.verbosity>0){
                        console.log('spawn builder')
                        }
                         buildparts.tick(roomname,'builder')
                        spawn.memory.spawnqueued=true
                    } else if (Game.rooms[roomname].memory.maxwarriors > allwarriors.length){
                        if(global.verbosity>0){
                        console.log('spawn warrior')
                        }
                        buildparts.tick(roomname,'warrior')
                    } else if(Game.rooms[roomname].memory.maxclaimers > allclaimers.length){
                        if(global.verbosity>0){
                        console.log('spawn claimer')
                        }
                        buildparts.tick(roomname,'claimer')
                    } else if(Game.rooms[roomname].memory.maxnrbuilders > allnrbuilders.length){
                        if(global.verbosity>0){
                        console.log('spawn nrbuilder')
                        }
                        buildparts.tick(roomname,'nrbuilder')
                    } else if(Game.rooms[roomname].memory.maxnrminers > allnrminers.length){
                        if(global.verbosity>0){
                        console.log('spawn nrminer')
                        }
                        buildparts.tick(roomname,'nrminer')
                    } else {}
                    
                } else if (!spawn.spawning && spawn.memory.spawnqueued) {
                    spawn.memory.spawnqueued=false
                    if(global.verbosity>0){
                    console.log('clearing spawn queue')
                    }
                } else if (spawn.spawning && !spawn.memory.spawnqueued){
                    spawn.memory.spawnqueued=true
                }
            }
        }else{
            if(Game.rooms[roomname].memory.tickssincespawn==undefined){Game.rooms[roomname].memory.tickssincespawn=1} else{
                Game.rooms[roomname].memory.tickssincespawn++
            }
        }
    }
};
module.exports = processSpawns;