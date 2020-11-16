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
      } else {
         let storagetargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return ((s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_TERMINAL || s.structureType == STRUCTURE_FACTORY ) &&  _.sum(s.store) < s.storeCapacity)  ;}});
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