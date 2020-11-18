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
        let mineralminablepositions = 0
        let minerals = Game.rooms[name].find(FIND_MINERALS);
        for(let i = 0;i<minerals.length;i++)
        {
            mineralminablepositions = mineralminablepositions + this.computeSourceAccessPoints(Game.rooms[name],minerals[i])
            //minablepositions = minablepositions + this.checkminablepositions(srcs[i])
        }
        //todo - create array of minable positions in the room and assign a screep to them, rather than having them constantly try to find the nearest one.
        Game.rooms[name].memory.mineralminablepositions = mineralminablepositions
        let minablepositions = 0
        let srcs = Game.rooms[name].find(FIND_SOURCES);
        for(let i = 0;i<srcs.length;i++)
        {
            minablepositions = minablepositions + this.computeSourceAccessPoints(Game.rooms[name],srcs[i])
            //minablepositions = minablepositions + this.checkminablepositions(srcs[i])
        }
        //todo - create array of minable positions in the room and assign a screep to them, rather than having them constantly try to find the nearest one.
        Game.rooms[name].memory.minablepositions = minablepositions
     },
     computeSourceAccessPoints: function(room, source){
        const roomTerrain = room.getTerrain();
        var accessPoints = 0;
        for(var x = -1;x<=1;x++)
        {
            for(var y = -1;y<=1;y++)
            {
                if(x==0 && y==0){continue;}
                if(roomTerrain.get(source.pos.x+x,source.pos.y+y)!=1){accessPoints++;}
            }
        }
        return accessPoints;
    },
     checkminablepositions: function(name){
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
     }
}
module.exports = initroom