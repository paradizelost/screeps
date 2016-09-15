Object.defineProperty(Room.prototype, "spawns", {
    /**
     * Holds array of spawns. If you do not own the room, returns ERR_NOT_OWNER
     *
     * @returns {number|ERR_NOT_OWNER|object}
     */
    configurable: true,
    get: function () {
        if (!this.controller || !this.controller.my) {
            return ERR_NOT_OWNER;
        }
        let spawnObjects = [];
        if (!this.memory.spawns) {
            let spawns = [];
            spawnObjects = this.find(FIND_MY_STRUCTURES, {
                filter: {
                    structureType: STRUCTURE_SPAWN
                }
            });
            spawnObjects.forEach(
                function (spawn) {
                    spawns.push(spawn.id)
                });
            this.memory.spawns = spawns;
        }
        if (spawnObjects.length == 0 && this.memory.spawns.length > 0) {
            for (let key in this.memory.spawns) {
                let spawnId = this.memory.spawns[key];
                let spawn = Game.getObjectById(spawnId);
                if (!spawn) {
                    this.log('No spawn found for ID ' + spawnId + ' despite being in cache, cleaning.', WARNING, true);
                    delete this.memory.spawns;
                } else {
                    spawnObjects.push(spawn);
                }
            }
        }
        return spawnObjects;
    }
});