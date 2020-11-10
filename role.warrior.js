let rolewarrior = {
     run: function(creep) {
                    var hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    var hostilebuilding = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS );
                    if(hostile!=undefined) {
            creep.say('Sorry')
            creep.travelTo(hostile,{ignoreCreeps:true});
            creep.attack(hostile);

        } else if(hostilebuilding!=undefined){
            creep.say('Sorry')
            creep.travelTo(hostilebuilding,{ignoreCreeps:true});
            creep.attack(hostilebuilding);
            
            }else if(Game.flags.protect,{ignoreCreeps:true}) {
            creep.say('ATK')
            creep.travelTo(Game.flags.protect,{ignoreCreeps:true})
            
        } else{
             creep.say('parking')
                creep.travelTo(creep.room.memory.warriorparkx,creep.room.memory.warriorparky,creep.room.roomName,{ignoreCreeps:true})
        }
     }
};
module.exports = rolewarrior;



