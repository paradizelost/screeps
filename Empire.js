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
    spawnnrworker: function(name){
        if(name==null || name== undefined){
            for(let myroom of _.filter(Game.rooms, 'controller.my')) {
                let name = myroom.name
                require('proc.spawning').spawnnrworker(name)
            }
        } else {
            require('proc.spawning').spawnnrworker(name)
        }
         return 'Spawning initiated'
    },
    spawnworker: function(name){
        if(name!=null && name!= undefined){
            for(let myroom of _.filter(Game.rooms, 'controller.my')) {
                let name = myroom.name
                require('proc.spawning').spawnworker(name)
            }
        } else {
            require('proc.spawning').spawnworker(name)
        }
         return 'Spawning initiated'
    },
    spawnminer: function(name){
        if(name!=null && name!= undefined){
            for(let myroom of _.filter(Game.rooms, 'controller.my')) {
                let name = myroom.name
                require('proc.spawning').spawnsourceminer(name)
            }
        } else {
            require('proc.spawning').spawnsourceminer(name)
        }
         return 'Spawning initiated'
    },
    spawnmover: function(name){
        if(name!=null && name!= undefined){
            for(let myroom of _.filter(Game.rooms, 'controller.my')) {
                let name = myroom.name
                require('proc.spawning').spawnmover(name)
            }
        } else {
            require('proc.spawning').spawnmover(name)
        }
         return 'Spawning initiated'
    },
    spawnclaimer: function(name){
        if(name!=null && name!= undefined){
            for(let myroom of _.filter(Game.rooms, 'controller.my')) {
                let name = myroom.name
                require('proc.spawning').spawnclaimer(name)
            }
        } else {
            require('proc.spawning').spawnclaimer(name)
        }
         return 'Spawning initiated'
    },
    removeConstruction: function(name){
        if(name==null || name== undefined){
            for(let myroom of _.filter(Game.rooms, 'controller.my')) {
                let name = myroom.name
                _.invoke(Game.rooms[name].find(FIND_MY_CONSTRUCTION_SITES), 'remove')
            }
        } else {
            _.invoke(Game.rooms[name].find(FIND_MY_CONSTRUCTION_SITES), 'remove')
        }
    },
    removeAllConstruction: function(){
        _.invoke(_.map(Game.constructionSites, (x)=>x), 'remove')
    },
    removeWalls: function(name){
        if(name==null || name== undefined){
            for(let myroom of _.filter(Game.rooms, 'controller.my')) {
                let name = myroom.name
                Game.rooms[name].find(FIND_STRUCTURES, {filter: s => s.structureType === STRUCTURE_WALL}).forEach(s => s.destroy())
            }
        } else {
            Game.rooms[name].find(FIND_STRUCTURES, {filter: s => s.structureType === STRUCTURE_WALL}).forEach(s => s.destroy())
        }
    },
    removeRoads: function(name,hitsleft){
        Game.rooms[name].find(FIND_STRUCTURES, {filter: s => (s.structureType === STRUCTURE_ROAD && s.hits < hitsleft)}).forEach(s => s.destroy())
        return "done"
    },
    sellEnergy: function(name){
        let myorders = Game.market.getAllOrders(order=>order.resourceType == RESOURCE_ENERGY && order.type == ORDER_SELL)
    },
    computeSourceAccess: function(){
        
        for(let myroom of _.filter(Game.rooms, 'controller.my')) {
            let name = myroom.name
            let minablepositions = 0
            let srcs = Game.rooms[name].find(FIND_SOURCES);
            for(let i = 0;i<srcs.length;i++)
            {
                minablepositions = minablepositions + this.computeSourceAccessPoints(Game.rooms[name],srcs[i])
                //minablepositions = minablepositions + this.checkminablepositions(srcs[i])
            }
            Game.rooms[name].memory.minablepositions = minablepositions
        }
    },
    computeMineralAccess: function(){
        for(let myroom of _.filter(Game.rooms, 'controller.my')) {
            let name = myroom.name
            let mineralminablepositions = 0
            let minerals = Game.rooms[name].find(FIND_MINERALS);
            for(let i = 0;i<minerals.length;i++)
                {
                    mineralminablepositions = mineralminablepositions + this.computeSourceAccessPoints(Game.rooms[name],minerals[i])
                    //minablepositions = minablepositions + this.checkminablepositions(srcs[i])
                }
            //todo - create array of minable positions in the room and assign a screep to them, rather than having them constantly try to find the nearest one.
            Game.rooms[name].memory.mineralminablepositions = mineralminablepositions
        }
    },
    computeSourceAccessPoints: function(room, source){
        const roomTerrain = room.getTerrain();
        var accessPoints = 0;
        for(var x = -1;x<=1;x++)
        {
            for(var y = -1;y<=1;y++)
            {
                if(x==0 && y==0){continue;}
                if(roomTerrain.get(source.pos.x+x,source.pos.y+y)!=1){accessPoints++;}
            }
        }
        return accessPoints;
    },
    computeSpawnLevels: function(room){
        myroom=Game.rooms[room]
        creepcounts=myroom.memory.creepcounts
        let workerrolename = 'phase' + myroom.memory.phase +'worker'
        if((myroom.memory.minablepositions >= 3 ||myroom.memory.minablepositions==undefined) && (creepcounts["mover"] == 0 || creepcounts["mover"]==undefined) ){
            if((((creepcounts[workerrolename]< (myroom.memory.minablepositions + 1) || creepcounts[workerrolename]==undefined)  && myroom.energyAvailable >= myroom.energyCapacityAvailable) ) || ((creepcounts[workerrolename]==0 || creepcounts[workerrolename]==undefined ) && myroom.energyAvailable>100)) {
                console.log('Spawning worker in '  + room)
            }
        } else {                    
            if((((creepcounts['sourceminer']< myroom.find(FIND_SOURCES).length) || creepcounts['sourceminer']==undefined)  ) || ((creepcounts['sourceminer']==0 || creepcounts['sourceminer']==undefined ) && myroom.energyAvailable>100)) {
                console.log('Spawning sourceminer in '  + room)
            }
            if((((creepcounts[workerrolename]< (myroom.memory.minablepositions+1) || creepcounts[workerrolename]==undefined)  && myroom.energyAvailable >= myroom.energyCapacityAvailable) ) || ((creepcounts[workerrolename]==0 || creepcounts[workerrolename]==undefined ) && myroom.energyAvailable>100)) {
                console.log('Spawning worker in '  + room)
            }
        }
        if((myroom.storage!=undefined || myroom.terminal!=undefined) && (creepcounts["mover"] < 2 || creepcounts["mover"]==undefined)){
            console.log("Spawning Mover in " + room)
        }
        if(((myroom.storage || myroom.terminal) && myroom.StructureExtractor)  && (creepcounts["mineralmover"] < 1 || creepcounts["mineralmover"]==undefined)){
            console.log("Spawning MineralMover in " + room)
        }
        if((myroom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTRACTOR}}).length > 0)&&(creepcounts["miner"] < myroom.memory.mineralminablepositions || creepcounts["miner"]==undefined)&&(myroom.energyAvailable >= myroom.energyCapacityAvailable)){
            if(myroom.find(FIND_MINERALS)[0].ticksToRegeneration == undefined || myroom.find(FIND_MINERALS)[0].ticksToRegeneration < 1000 ){
                console.log("Spawning Miner in "  + room)
            } else { 
                if(Game.flags.debug && Game.flags.debug.room == myroom){
                    console.log("Not spawning miner in " + room + ", waiting for regen")
                }
            }
        }
    }
};