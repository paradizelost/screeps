var roleMiner2 = {
     run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1]);
        } 
     },
     spawn: function(roomname){
        var myspawns=Game.rooms[roomname].find(FIND_MY_SPAWNS)
        var myroom = Game.rooms[roomname]
        for(var thisspawn in myspawns){
            var spawn = myspawns[thisspawn]
            var myrole='miner2';
            var myroles = _.filter(Game.rooms[roomname].find(FIND_MY_CREEPS), (creep) => creep.memory.role == myrole);
            console.log(myrole + 's: ' + myroles.length + ' Needed: ' + Game.rooms[roomname].memory['max'+myrole+'s']);
            if(myroles.length < Game.rooms[roomname].memory['max'+myrole+'s']) { 
                var newName = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: myrole});
                console.log('Spawning new ' + myrole + ': ' + newName);
            }
        }
     }
};
module.exports = roleMiner2;