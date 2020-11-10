let buildparts = {
     tick: function(roomname,role) {
             Game.rooms[roomname].memory.tickssincespawn=0
             let tobuild=[]
             let myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
             Game.rooms[roomname].memory.CreepNum++
             let CreepName = role + "_" + roomname + "_" + (Game.rooms[roomname].memory.CreepNum)
             switch(role){
                case 'builder':
                    
                    for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [
                            [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],
                            [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],
                            [MOVE,WORK,CARRY,MOVE,WORK,CARRY],
                            [MOVE,WORK,CARRY,CARRY]
                        
                        ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        console.log(tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:role})
                        console.log('Spawning new ' + role + ': ' + newcreep );
                    }
                    }
                     break;
                case 'nrbuilder':
                     
                    for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [
                            [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],
                            [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],
                            [MOVE,WORK,CARRY,MOVE,WORK,CARRY],
                            [MOVE,WORK,CARRY]
                        
                        ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        console.log(tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:role})
                        console.log('Spawning new ' + role + ': ' + newcreep );
                    }
                    }
                     break;
                case 'hauler':
                    
                    for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [
                            [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]
                            [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE],
                            [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE],
                            [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE],
                            [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE],
                            [CARRY,CARRY,MOVE],
                            [CARRY,MOVE]
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        console.log(tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:role})
                        console.log('Spawning new ' + role + ': ' + newcreep );
                        }
                    }
                     break;
                     case 'hauler3':
                         
                    for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [
                            [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                            [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                            [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
                            [CARRY,CARRY,MOVE,MOVE],
                            [CARRY,MOVE]
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        console.log(tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:role})
                        console.log('Spawning new ' + role + ': ' + newcreep );
                        }
                    }
                     break;
                case 'miner':
                    
                    for(let spawn of myspawns){
                        if(!spawn.spawning){
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
                        console.log(tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:role})
                        console.log('Spawning new ' + role + ': ' + newcreep );
                    }}
                    break;
                case 'miner2':
                    
                    for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [
                            [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],
                            [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],
                            [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],
                            [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],
                            [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],
                            [WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],
                            [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],
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
                        console.log(tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:role})
                        console.log('Spawning new ' + role + ': ' + newcreep );
                    }}
                    break;
                case 'nrminer':
                    
                    for(let spawn of myspawns){
                        if(!spawn.spawning){
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
                        console.log(tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:role})
                        console.log('Spawning new ' + role + ': ' + newcreep );
                    }}
                    break;
                case 'hauler2':
                    
                    for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [
                            [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]
                            [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE],
                            [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE],
                            [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE],
                            [CARRY,CARRY,MOVE,CARRY,CARRY,MOVE],
                            [CARRY,CARRY,MOVE],
                            [CARRY,MOVE]
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        console.log(tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:role})
                        console.log('Spawning new ' + role + ': ' + newcreep );
                    }}
                     break;
                case 'towerrecharger':
                    
                    for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [[CARRY,CARRY,CARRY,MOVE,MOVE]]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        console.log(tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:role})
                        console.log('Spawning new ' + role + ': ' + newcreep );
                    }}
                     break;
                case 'repairbot':
                    
                    for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [
                            [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE]//RCL3
                            [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
                            [WORK,CARRY,MOVE,WORK,CARRY,MOVE],
                            [WORK,CARRY,MOVE]
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        console.log(tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:role})
                        console.log('Spawning new ' + role + ': ' + newcreep );
                    }}
                     break;
                case 'upgrader':
                    
                    for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [
                            [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],//RCL8
                            [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],//RCL7
                            [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],//RCL6
                            [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],//RCL5
                            [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],//RCL4
                            [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],//RCL3
                            [MOVE,WORK,CARRY,MOVE,WORK,CARRY],//RCL2
                            [MOVE,WORK,CARRY]//RCL1
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        console.log(tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:role})
                        console.log('Spawning new ' + role + ': ' + newcreep );
                    }}
                     break;
                case 'warrior':
                    
                    for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [
                            [ATTACK,ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE],
                            [ATTACK,ATTACK,RANGED_ATTACK,MOVE]
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        console.log(tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:role})
                        console.log('Spawning new ' + role + ': ' + newcreep );
                    }}
                     break;
                case 'claimer':
                    
                    for(let spawn of myspawns){
                        if(!spawn.spawning){
                        for(let totry of [
                            [CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,MOVE,MOVE],
                            [CLAIM,MOVE]
                            ]){
                            let ispossible = spawn.canCreateCreep(totry)
                            if(ispossible==OK){
                                tobuild=totry
                                break;
                            }
                        }
                        console.log(tobuild)
                        let newcreep = spawn.createCreep(tobuild,CreepName,{role:role})
                        console.log('Spawning new ' + role + ': ' + newcreep );
                    }}
                     break;
                default:
                    console.log('no match')
             }
         

     }
};
module.exports = buildparts;