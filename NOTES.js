if(containers.count==0 && structure_extensions.count==0 && storage.count==0 && miners.count==0){spawn harvester} else { spawn miners and haulers}
require('role.' + creep.memory.role).run(creep)
_.forEach(Game.creeps, creep => creep.suicide())
_.forEach(Game.rooms[roomname].constructionSites, cs=>cs.remove())
serializePos: function(pos) {
       return pos.x + '_' + pos.y + '_' + pos.roomName;
   },
   deserializePos: function(str) {
       var ar = str.split('_');
       return new RoomPosition(ar[0], ar[1], ar[2]);
   },
   
   
   
   Structure.prototype.getResourceCapacity = function(resourceType) {
    switch (this.structureType) {
        case STRUCTURE_CONTAINER:
        case STRUCTURE_STORAGE:
        case STRUCTURE_TERMINAL:    
        return  this.storeCapacity;
        case STRUCTURE_SPAWN:
        case STRUCTURE_EXTENSION:
        case STRUCTURE_LINK:
        case STRUCTURE_TOWER:
        if (RESOURCE_ENERGY == resourceType) {
            return(this.energyCapacity);
        } else {
            return(-1);
        }
        case STRUCTURE_LAB:
        if (RESOURCE_ENERGY == resourceType) {
            return(this.energyCapacity);
        } else {
            return(this.mineralCapacity);
        }
        default:
        return(-1);
    }
}
Structure.prototype.getResource = function(resourceType) {
    switch (this.structureType) {
        case STRUCTURE_CONTAINER:
        case STRUCTURE_STORAGE:
        case STRUCTURE_TERMINAL:    
        return this.store[resourceType];
        case STRUCTURE_SPAWN:
        case STRUCTURE_EXTENSION:
        case STRUCTURE_LINK:
        case STRUCTURE_TOWER:
        if (RESOURCE_ENERGY == resourceType) {
            return(this.energy);
        } else {
            return(-1);
        }
        case STRUCTURE_LAB:
        if (RESOURCE_ENERGY == resourceType) {
            return(this.energy);
        } else {
            return(this.mineralAmount);
        }
        default:
        return(-1);
    }
}