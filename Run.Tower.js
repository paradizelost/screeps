var towers = {

    /** @param {Game} game **/
    tick: function(roomname) {
        
        towers = Game.rooms[roomname].find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_TOWER }
                })
        _.forEach(towers, function(tower){
            let myclosestDamagedStructure =  tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART && structure.hits < structure.hitsMax
            }); 
            let closestDamagedStructure = _.first(_.sortBy(myclosestDamagedStructure, (s)=>s.hits / s.hitsMax));
            
            let allcontainers = tower.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return ( s.structureType == STRUCTURE_CONTAINER)
                }
            });
            let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            } else
            {
                if(tower.energy > tower.energyCapacity * .7 ){
                let importantstructures = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                     return (structure.structureType == STRUCTURE_CONTAINER &&  structure.hits < structure.hitsMax)  ;
                 }});
                importantstructures = _.sortBy(importantstructures, (s)=>s.hits / s.hitsMax)
                if(importantstructures.length > 0){
                    tower.repair(importantstructures[0]);
                } else 
                {
                    if(closestDamagedStructure) {
                        if(tower.energy > tower.energyCapacity * 1.8 ){
                            if(global.verbosity>0){
                            console.log("tower repairing. Currently at: " + Game.rooms[roomname].memory.containerstoragepercent)
                            }
                        tower.repair(closestDamagedStructure);
                        } else { 
                            if(global.verbosity>0){
                            console.log("tower waiting for more storage. Currently at: " + Game.rooms[roomname].memory.containerstoragepercent)
                            }
                            }
                    }
                }
            
            }
            }
        })
	}
};

module.exports = towers;