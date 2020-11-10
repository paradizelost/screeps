let buildparts = {
     spawnminer: function(roomname) {
        let myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        Game.rooms[roomname].memory.CreepNum++
        let CreepName =  roomname + "_" + (Game.rooms[roomname].memory.CreepNum)
                            for(let spawn of myspawns){
                        if(!spawn.spawning){
                        let tobuild=[]
                        for(let totry of [
                            [WORK,WORK,WORK,WORK,WORK,MOVE],
                            [WORK,WORK,WORK,WORK,MOVE],
                            [WORK,WORK,WORK,MOVE],
                            [WORK,WORK,MOVE],
                            [WORK,MOVE]
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:'miner'})
                    }}

    },
    spawnwarrior: function(roomname) {
        let myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        Game.rooms[roomname].memory.CreepNum++
        let CreepName = roomname + "_" + (Game.rooms[roomname].memory.CreepNum)
                            for(let spawn of myspawns){
                        if(!spawn.spawning){
                        let tobuild=[]
                        for(let totry of [
                            [MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK],
                            [MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK],
                            [MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK],
                            [MOVE,ATTACK,MOVE,ATTACK],
                            [MOVE,ATTACK]
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:'warrior'})
                    }}

    },
     spawnworker: function(roomname) {
        let myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        Game.rooms[roomname].memory.CreepNum++
        let CreepName =  roomname + "_" + (Game.rooms[roomname].memory.CreepNum)
                            for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,CARRY,CARRY],//MOVE*6,WORK*5,CARRY*7
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],// all * 5
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,CARRY],//move*5, work*4, carry*5
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],//move*4,work*4,carry*4
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,CARRY],//move*4, work*3, carry*4
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,CARRY], //move*3,work*2, carry*3
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY], //move*2, work*2, carry*2
                             [MOVE,WORK,CARRY,MOVE,CARRY],//move*2, work*1, carry*2
                             [MOVE,WORK,CARRY]
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:"phase" + Game.rooms[roomname].memory.phase +"worker"})
                    }}

    },
    spawnmover: function(roomname) {
        let myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        Game.rooms[roomname].memory.CreepNum++
        let CreepName =  roomname + "_" + (Game.rooms[roomname].memory.CreepNum)
                            for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [
                             [MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY],//MOVE*6,WORK*5,CARRY*7
                             [MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY],// all * 5
                             [MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY],//move*5, work*4, carry*5
                             [MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY],//move*4,work*4,carry*4
                             [MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY],//move*4, work*3, carry*4
                             [MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY], //move*3,work*2, carry*3
                             [MOVE,CARRY,CARRY,MOVE,CARRY,CARRY], //move*2, work*2, carry*2
                             [MOVE,CARRY,CARRY,MOVE,CARRY],//move*2, work*1, carry*2
                             [MOVE,CARRY,CARRY]
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:"mover"})
                    }}

    },
    spawnnrworker: function(roomname) {
        console.log('1')
        let myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        Game.rooms[roomname].memory.CreepNum++
        let CreepName = "nrworker_" + roomname + "_" + (Game.rooms[roomname].memory.CreepNum)
                    for(let spawn of myspawns){
                        if(!spawn.spawning && spawn.room.energyAvailable > 500){
                            for(let totry of [
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,CARRY,CARRY],//MOVE*6,WORK*5,CARRY*7
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],// all * 5
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,CARRY],//move*5, work*4, carry*5
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],//move*4,work*4,carry*4
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,CARRY],//move*4, work*3, carry*4
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,CARRY], //move*3,work*2, carry*3
                             [MOVE,WORK,CARRY,MOVE,WORK,CARRY], //move*2, work*2, carry*2
                             [MOVE,WORK,CARRY,MOVE,CARRY],//move*2, work*1, carry*2
                             [MOVE,WORK,CARRY]
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:"nrworker"})
                    }}

    },
    spawnclaimer: function(roomname) {
        let myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        Game.rooms[roomname].memory.CreepNum++
        let CreepName = "claimer" + roomname + "_" + (Game.rooms[roomname].memory.CreepNum)
                        for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [
                            [CLAIM,MOVE]
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            } else {
                                console.log("Couldn't find a size that could be made")
                            }
                        }
                        console.log(roomname + ' ' + tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:'claimer'})
                    }}

    }
};
module.exports = buildparts;

/*

*/

/*
switch(role){
            case 'builder':
                    break;
                default:
                    console.log('no match')
                    break;
        }
*/
