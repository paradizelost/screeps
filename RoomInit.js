let initroom = {
     run: function(name) {
         console.log('Initing room ' + name)
        Game.rooms[name].memory.phase=0
        Game.rooms[name].memory.CreepNum=0
        Game.rooms[name].memory.minbuildpct=-1
        Game.rooms[name].memory.minupgradepct=.5
        Game.rooms[name].memory.minrepairpct=.5
        Game.rooms[name].memory.hasbeeninited=1
        Game.rooms[name].memory.tickssofar=0
     }
}
module.exports = initroom