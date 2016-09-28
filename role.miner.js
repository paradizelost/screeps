let roleMiner = {
     run: function(creep) {
        if(creep.memory.originroom === undefined){
            creep.memory.originroom = creep.room.name
        }
        if(Game.getObjectById(creep.memory.destsource.id)==undefined){creep.memory.destsource=undefined}
           let mysource=Game.getObjectById(creep.memory.destsource.id)
           if(creep.harvest(mysource) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(mysource);
            } 
     },
     spawn: function(roomname){
        let myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        let myroom = Game.rooms[roomname]
        for(let spawn of myspawns){
            let myrole='miner';
            let myroles = _.filter(Game.creeps, (creep) => creep.memory.role == myrole && creep.memory.originroom == roomname);
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + Game.rooms[roomname].memory['max'+myrole+'s']);
            if(myroles.length < Game.rooms[roomname].memory['max'+myrole+'s']) { 
                let newName = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: myrole});
                console.log('Spawning new ' + myrole + ': ' + newName);
            }
        }
     }
};
module.exports = roleMiner;