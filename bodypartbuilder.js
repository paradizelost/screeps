let buildparts = {
     tick: function(roomname,role) {
         console.log(roomname + ":" + role)
         let energyready = Game.rooms[roomname].energyAvailable
         let energymax = Game.rooms[roomname].energyCapacityAvailable
         if(energyready==energymax){
             let tobuild=[]
             switch(role){
                case 'builder':
                    let myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
                    for(let spawn of myspawns){
                        for(let totry of [
                            [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,WORK],
                            [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE],
                            [MOVE,MOVE,CARRY]
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        console.log(tobuild)
                    }
                     break;
                case 'hauler':
                    console.log('2')
                    break
                default:
                    console.log('3')
             }
         }

     }
};
module.exports = buildparts;