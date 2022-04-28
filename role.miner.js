let roleMiner = {
     run: function(creep) {
      //if(Game.getObjectById(creep.memory.destsource.id)==undefined){creep.memory.destsource=undefined}
      let ignorecreeps=true
      let filllevel = _.sum(creep.carry)
      if(creep.memory.working && filllevel == 0) {
         creep.memory.working = false;
         creep.say('Gathering');
      }
      if(!creep.memory.working && _.sum(creep.carry) == creep.carryCapacity) {
         creep.memory.working = true;
         creep.say('working');
      }
      if(!creep.memory.working){
         let mysource=Game.rooms[creep.room.name].find(FIND_MINERALS)[0]
         if(creep.harvest(mysource) == ERR_NOT_IN_RANGE) {
            creep.travelTo(mysource);
         }
      }  else if ((creep.ticksToLive < 300 || creep.ticksToLive <= creep.memory.renewto) && (Game.rooms[creep.room.name].find(FIND_MY_SPAWNS, {filter: (r) =>{return ( r.store[RESOURCE_ENERGY]>1)}}))  ) {
         if(creep.memory.renewto == undefined){
             creep.memory.renewto = 1200
         } else {
             if(creep.ticksToLive >= creep.memory.renewto){
                 delete creep.memory.renewto
             }
         }
         //console.log(creep.name + ": " + creep.ticksToLive + " " + creep.memory.renewto)
         creep.say('renewing')
         let spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
         if(spawn.renewCreep(creep) == ERR_NOT_IN_RANGE)
         {
             creep.moveTo(spawn);
         }
     } else {
         let storagetargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return ((s.structureType == STRUCTURE_TERMINAL || s.structureType == STRUCTURE_FACTORY ) &&  _.sum(s.store) < s.storeCapacity)  ;}});
         if(storagetargets){
            if(this.transferAll(creep,storagetargets) == ERR_NOT_IN_RANGE) {
               creep.moveTo(storagetargets,{ignoreCreeps:ignorecreeps})
           } 
       }
      }
   },
   transferAll: function(creep,targetStorage){
      let result = 0;
      for(mat in creep.store)
      {
         let tempResult = creep.transfer(targetStorage,mat);
         if(tempResult !== ERR_INVALID_ARGS) {result = tempResult;}
      }
      return result;
   }
};
module.exports = roleMiner;