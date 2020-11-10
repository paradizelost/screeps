let Phase0 = {
     run: function(room) {
         require('assignsources').tick(room)
         creepcounts = _.countBy(Game.rooms[room].find(FIND_MY_CREEPS), c => c.memory.role) 
         let myspawns = Game.rooms[room].find(FIND_MY_SPAWNS)
         let sources = Game.rooms[room].find(FIND_SOURCES )
         if(myspawns.length<1){
             if(Game.rooms[room].controller.level>1){
            
             Game.rooms[room].memory.phase++
             let creeps=Game.rooms[room].find(FIND_MY_CREEPS)
             let newworkerrolename = 'phase' + Game.rooms[room].memory.phase + 'worker'
             for(let mycreep in creeps){
                 creep=creeps[mycreep]
                 if(creep.memory.role == workerrolename){
                     creep.memory.role=newworkerrolename
                 }
             }
             
             Game.rooms[room].memory['tickstophase' + Game.rooms[room].memory.phase]=Game.rooms[room].memory.tickssofar
             console.log(Game.rooms[room].memory['tickstophase' + Game.rooms[room].memory.phase])
             
            }
         } else {
             let workerrolename = 'phase' + Game.rooms[room].memory.phase +'worker'
             console.log(room)
             console.log(workerrolename + " : " + creepcounts[workerrolename])
          if(((creepcounts[workerrolename]< (sources.length * 1) || creepcounts[workerrolename]==undefined) && !myspawns[0].spawning && Game.rooms[room].energyAvailable == Game.rooms[room].energyCapacityAvailable) || (creepcounts[workerrolename] ==0 && Game.rooms[room].energyAvailable==300) ){
                if(Game.rooms[room].energyAvailable == Game.rooms[room].energyCapacityAvailable){
                   require('proc.spawning').spawnworker(room)
                 }
             } else {  }
            if(Game.rooms[room].controller.level>1){
            
             Game.rooms[room].memory.phase++
             let creeps=Game.rooms[room].find(FIND_MY_CREEPS)
             let newworkerrolename = 'phase' + Game.rooms[room].memory.phase + 'worker'
             for(let mycreep in creeps){
                 creep=creeps[mycreep]
                 if(creep.memory.role == workerrolename){
                     creep.memory.role=newworkerrolename
                 }
             }
             
             Game.rooms[room].memory['tickstophase' + Game.rooms[room].memory.phase]=Game.rooms[room].memory.tickssofar
             console.log(Game.rooms[room].memory['tickstophase' + Game.rooms[room].memory.phase])
             
            }
         }
     }
};
module.exports = Phase0;
