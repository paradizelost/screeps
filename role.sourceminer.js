let rolesourceMiner = {
    run: function(creep) {
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
            if(creep.harvest(mysource) == ERR_NOT_IN_RANGE) {
                creep.travelTo(mysource);
            }
        }
    }   
};
module.exports = rolesourceMiner;