let buildparts=require('bodypartbuilder')
module.exports = {
    get getcounts(){
        let output=''
        
       for(let myroom of _.filter(Game.rooms, 'controller.my')) {
            let name = myroom.name
            //let{builder,miner,hauler,hauler2,towerrecharger,repairbot,upgrader,warrior,claimer,nrbuilder,nrminer}=_.groupBy(Game.rooms[name].creeps, 'memory.role')
            let allcreeps = _.filter(Game.rooms[name].find(FIND_MY_CREEPS));
            let allbuilders = _.filter(allcreeps,(creep) => (creep.memory.role=='builder'))
            let allminers = _.filter(allcreeps,(creep) => (creep.memory.role=='miner'))
            let allminer2s = _.filter(allcreeps,(creep) => (creep.memory.role=='miner2'))
            let allhaulers = _.filter(allcreeps,(creep) => (creep.memory.role=='hauler'))
            let allhauler2s = _.filter(allcreeps,(creep) => (creep.memory.role=='hauler2'))
            let alltowerrechargers = _.filter(allcreeps,(creep) => (creep.memory.role=='towerrecharger'))
            let allrepairbots = _.filter(allcreeps,(creep) => (creep.memory.role=='repairbot'))
            let allupgraders = _.filter(allcreeps,(creep) => (creep.memory.role=='upgrader'))
            let allwarriors = _.filter(allcreeps,(creep) => (creep.memory.role=='warrior'))
            let allclaimers = _.filter(allcreeps,(creep) => (creep.memory.role=='claimer'))
            let allnrbuilders = _.filter(allcreeps,(creep) => (creep.memory.role=='nrbuilder'))
            let allnrminers = _.filter(allcreeps,(creep) => (creep.memory.role=='nrminer'))
            output +=(
                name + ': ' +
                allcreeps.length + ' total creeps ' + ' '
                + allbuilders.length + ' Builders of ' + Game.rooms[name].memory.maxbuilders + " "
                + allminers.length + ' Miners of ' + Game.rooms[name].memory.maxminers + " "
                + allminer2s.length + ' Miner2s of ' + Game.rooms[name].memory.maxminer2s + " "
                + allhaulers.length + ' Haulers of ' + Game.rooms[name].memory.maxhaulers + " "
                + allhauler2s.length + ' Hauler2s of ' + Game.rooms[name].memory.maxhauler2s + " "
                + alltowerrechargers.length + ' Rechargers of ' + Game.rooms[name].memory.maxtowerrechargers + " "
                + allrepairbots.length + ' Repairbots of ' + Game.rooms[name].memory.maxrepairbots + " "
                + allupgraders.length + ' Upgraders of ' + Game.rooms[name].memory.maxupgraders + " "
                + allwarriors.length + ' Warriors of ' + Game.rooms[name].memory.maxwarriors + " "
                + allclaimers.length + ' Claimers of ' + Game.rooms[name].memory.maxclaimers + " "
                + allnrbuilders.length + ' nrbuilders of ' + Game.rooms[name].memory.maxnrbuilders + " "
                + allnrminers.length + ' nrminers of ' + Game.rooms[name].memory.maxnrminers + " "
                + '\n'
                )
       }
       return output
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
    spawn: function(roomname,role){
         buildparts.tick(roomname,role)
         return 'Spawning initiated'
    },
    removeConstruction: function(roomname){
        _.invoke(Game.rooms[roomname].find(FIND_MY_CONSTRUCTION_SITES), 'remove')
    },
    removeWalls: function(roomname){
        Game.rooms[roomname].find(FIND_STRUCTURES, {filter: s => s.structureType === STRUCTURE_WALL}).forEach(s => s.destroy())
    }
};