var towers = {

    /** @param {Game} game **/
    tick: function() {
        
        towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_TOWER }
                })
        _.forEach(towers, function(tower){
            
            
            var myclosestDamagedStructure =  tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            }); 
            var closestDamagedStructure = _.first(_.sortBy(myclosestDamagedStructure, (s)=>s.hits / s.hitsMax));
            
            var allcontainers = tower.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return ( s.structureType == STRUCTURE_CONTAINER)
                }
            });
            var usedstorage=0
            var mycapacity=0
            for(var i=0; i < allcontainers.length;i++){
                usedstorage+=_.sum(allcontainers[i].store)
                mycapacity+=allcontainers[i].storeCapacity
            }
            console.log(usedstorage + " " + mycapacity)
            
            var storagepercent = usedstorage/mycapacity
            var importantstructures = tower.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
               return (structure.structureType == STRUCTURE_CONTAINER &&  structure.hits < structure.hitsMax)  ;
            }});
            importantstructures = _.sortBy(importantstructures, (s)=>s.hits / s.hitsMax)
            if(tower.energy > tower.energyCapacity * .7 ){
                if(importantstructures.length > 0){
                    tower.repair(importantstructures[0]);
                } else 
                {
                    if(closestDamagedStructure) {
                        if(storagepercent > .8){
                            console.log("tower repairing. Currently at: " + storagepercent)
                        tower.repair(closestDamagedStructure);
                        } else { console.log("tower waiting for more storage. Currently at: " + storagepercent)}
                    }
                }
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
            }
        })
	}
};

module.exports = towers;