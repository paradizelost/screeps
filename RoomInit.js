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
        Game.rooms[name].memory.maphits={}
        //Game.rooms[name].memory.minablepositions= this.checkminablepositions(name)
     },
     checkminablepositions: function(name){
          Source.prototype.analyzeFreeSpaces = function() {
               let x = this.pos.x;
               let y = this.pos.y;
               let walkable = this.room.lookForAtArea(
                   LOOK_TERRAIN,
                   y - 1,  // top
                   x - 1,  // left
                   y + 1,  // bottom
                   x + 1,  // right
                   true    // asArray
               ).filter(o => o[LOOK_TERRAIN] !== 'wall');
               return walkable.length;
           };
           
     }
}
module.exports = initroom