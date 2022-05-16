let rolesourceMiner = {
    run: function(creep) {
        try{
        //if(Game.getObjectById(creep.memory.destsource.id)==undefined){creep.memory.destsource=undefined}
        let ignorecreeps=true
        //console.log('running sourceminer')
        let mysource=Game.getObjectById(creep.memory.destsource.id)
        if ((creep.ticksToLive < 300 || creep.ticksToLive <= creep.memory.renewto) && (Game.rooms[creep.room.name].find(FIND_MY_SPAWNS, {filter: (r) =>{return ( r.store[RESOURCE_ENERGY]>200)}}))  ) {
            if(creep.memory.renewto == undefined){
                creep.memory.renewto = 1200
            } else {
                if(creep.ticksToLive >= creep.memory.renewto){
                    delete creep.memory.renewto
                }
            }
            creep.say('renewing')
            console.log(creep.name + ": " + creep.ticksToLive + " " + creep.memory.renewto)
            let spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
            if(creep.room.memory.NeedsRecharge==1 && creep.carry.energy>0){
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                      creep.say(creep.room.controller.ticksToDowngrade + " of " +  (CONTROLLER_DOWNGRADE[creep.room.controller.level] * .2))
                      creep.moveTo(creep.room.controller)
               }
            } else {
               if(spawn.renewCreep(creep) == ERR_NOT_IN_RANGE){
                    creep.moveTo(spawn);
                }   
            }
        } else{
            try{
                creep.say('1')
            destcontainer=Game.getObjectById(creep.memory.destsource.id).pos.findInRange(FIND_STRUCTURES,1,{filter: (s) => {return (s.structureType == STRUCTURE_CONTAINER && s.store.getFreeCapacity() > 0)  ;}})
            
            if(destcontainer == undefined || destcontainer == null){
                creep.say('2')
                console.log(creep.name + " " + destcontainer[0].id)
                creep.travelTo(destcontainer[0])
                if(creep.harvest(mysource) == ERR_NOT_IN_RANGE) {
                    //let mycontainer = creep.find(FIND_STRUCTURES, {filter: (s) => {return (s.structureType == STRUCTURE_CONTAINER)  ;}});
                    creep.travelTo(destcontainer[0],{ignoreCreeps:ignorecreeps});
                }
            } else {
                creep.say('3')
                if(creep.harvest(mysource) == ERR_NOT_IN_RANGE) {
                    //let mycontainer = creep.find(FIND_STRUCTURES, {filter: (s) => {return (s.structureType == STRUCTURE_CONTAINER)  ;}});
                    creep.travelTo(mysource,{ignoreCreeps:ignorecreeps});
                }
            }
            } catch(e){
                console.log(e)
            }
        }
    }   catch(e){
            console.log(e)
        }
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
};
module.exports = rolesourceMiner;