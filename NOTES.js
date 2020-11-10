/*
||Game.rooms[room].find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION }}).length == 5

{ignoreCreeps:true} on moveto, need to find how to check if stuck
let pos = _.create(RoomPosition.prototype, creep.memory.pos)
for(let road in look){if(road.structureType == STRUCTURE_ROAD){console.log('road at ' + creep.pos)}}

let road = in_creep.pos.lookFor(LOOK_STRUCTURES)[0];
if (road) {in_creep.repair(road);}
x=Game.getObjectById("58dbc3ad8283ff5308a3df08"); console.log(`${x.progressTotal - x.progress} to go!`);



--------- code to check for open source spots ----
RoomPosition.prototype.isOpen = function(opts){
// opts.ignoreCreeps (boolean) default false. ignores creeps if true.
// opts.ignoreSolids (boolean) default false. ignores solid structures if true.
    if ("wall" === Game.map.getTerrainAt(this)) return(false);
    if (null==Game.rooms[this.roomName]) return (true);
    if ((null==opts || !opts.ignoreCreeps) && 
        (this.lookFor(LOOK_CREEPS).length !== 0)) return(false);
    if (null==opts || !opts.ignoreSolids){
        var objectList = this.lookFor(LOOK_STRUCTURES).concat(
                         this.lookFor(LOOK_CONSTRUCTION_SITES));
        for(let j=objectList.length; --j>=0; ){
            let rObj = objectList[j];
            if (rObj instanceof ConstructionSite && !rObj.my) continue;
            if (rObj.structureType !== STRUCTURE_ROAD &&
                rObj.structureType !== STRUCTURE_CONTAINER &&
               (rObj.structureType !== STRUCTURE_RAMPART ||
               !rObj.my)) {
                    return false;
            }
        }
    }
    return(true);
}
RoomPosition.prototype.nearOpenList = function(opts){
// using .isOpen (above) this checks adjacent positions for openness. Room exits and 
// other rooms are not considered. The position itself is also not considered.
//
// opts.ignoreCreeps (boolean) default false. ignores creeps if true.
// opts.ignoreSolids (boolean) default false. ignores solid structures if true.
// return               (list) list of open adjacent positions.
    var x=this.x;
    var y=this.y;
    var openPosList=[];
    var sList=[{x:x-1,y:y-1},{x:x, y:y-1},{x:x+1,y:y-1},
               {x:x-1,y:y  },             {x:x+1,y:y  },
               {x:x-1,y:y+1},{x:x, y:y+1},{x:x+1,y:y+1}];
    for (var i=sList.length; --i>=0; ){
        if (sList[i].x<49 && sList[i].x>0 && 
            sList[i].y<49 && sList[i].y>0 && 
            (global.myCache.getRoomPosition(
             sList[i].x,sList[i].y,this.roomName)).isOpen(opts)){
                openPosList.push(
                 global.myCache.getRoomPosition(sList[i].x,sList[i].y,this.roomName));
        }
    }
    return(openPosList);
};
--------- end open position code -----