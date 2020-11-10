//let buildparts=require('bodypartbuilder')
module.exports = {
    get getcounts(){
        for(let room of _.filter(Game.rooms, 'controller.my')) {
            roomcounts = _.countBy(room.find(FIND_MY_CREEPS), c => c.memory.role)
            console.log(roomcounts['phase1worker'])
            console.log(roomcounts['miner'])
        }
    },
    decrease: function(role,roomname){
        let rolename = 'max' + role + 's'
        let currentmax = Game.rooms[roomname].memory[rolename]
        Game.rooms[roomname].memory[rolename]--
        let newmax = Game.rooms[roomname].memory[rolename]
        return 'Old Max:'+currentmax+' New Max:'+newmax
    },
    setmax: function(role,roomname,count){
        let rolename = 'max' + role + 's'
        let currentmax = Game.rooms[roomname].memory[rolename]
        Game.rooms[roomname].memory[rolename] = count
        let newmax = Game.rooms[roomname].memory[rolename]
        return 'Old Max:'+currentmax+' New Max:'+newmax
    },
    increase: function(role,roomname){
        let rolename = 'max' + role + 's'
        let currentmax = Game.rooms[roomname].memory[rolename]
        Game.rooms[roomname].memory[rolename]++
        let newmax = Game.rooms[roomname].memory[rolename]
        return 'Old Max:'+currentmax+' New Max:'+newmax
    },
    kill: function(creepname){
        let me= Game.creeps[creepname].suicide()
        return me
    },
    spawnwarrior: function(){
        for(let myroom of _.filter(Game.rooms, 'controller.my')) {
            let name = myroom.name
            require('proc.spawning').spawnwarrior(name)
        }
         return 'Spawning initiated'
    },
    spawnnrworker: function(){
        for(let myroom of _.filter(Game.rooms, 'controller.my')) {
            let name = myroom.name
            require('proc.spawning').spawnnrworker(name)
        }
         return 'Spawning initiated'
    },
    spawnworker: function(){
        for(let myroom of _.filter(Game.rooms, 'controller.my')) {
            let name = myroom.name
            require('proc.spawning').spawnworker(name)
        }
         return 'Spawning initiated'
    },
    spawnclaimer: function(){
        for(let myroom of _.filter(Game.rooms, 'controller.my')) {
            let name = myroom.name
            require('proc.spawning').spawnclaimer(name)
        }
         return 'Spawning initiated'
    },
    removeConstruction: function(roomname){
        _.invoke(Game.rooms[roomname].find(FIND_MY_CONSTRUCTION_SITES), 'remove')
    },
    removeAllConstruction: function(){
        _.invoke(_.map(Game.constructionSites, (x)=>x), 'remove')
    },
    removeWalls: function(roomname){
        Game.rooms[roomname].find(FIND_STRUCTURES, {filter: s => s.structureType === STRUCTURE_WALL}).forEach(s => s.destroy())
    },
    removeRoads: function(roomname,hitsleft){
        Game.rooms[roomname].find(FIND_STRUCTURES, {filter: s => (s.structureType === STRUCTURE_ROAD && s.hits < hitsleft)}).forEach(s => s.destroy())
        return "done"
    },
    sellEnergy: function(roomname){
        let myorders = Game.market.getAllOrders(order=>order.resourceType == RESOURCE_ENERGY && order.type == ORDER_SELL)
        
    }
};