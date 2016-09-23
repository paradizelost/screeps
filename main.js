var roleBuilder=require('role.builder');
var roleMiner=require('role.miner');
var roleMiner2=require('role.miner2');
var roleHauler=require('role.hauler')
var roleHauler2=require('role.hauler2')
var roleUpgrader=require('role.upgrader')
var roleTowerrecharger=require('role.recharger')
var runSources=require('sourceprocessing')
var roleRepairbot=require('role.repairbot')
var runTower = require('tower');
module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    for(var name in Game.rooms) {
        runTower.tick(name);
        var roomenergy = Game.rooms[name].energyAvailable
        var allstorage = Game.rooms[name].find(FIND_STRUCTURES, {filter: (s) => {return ( s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE)}})
        var allcontainers = Game.rooms[name].find(FIND_STRUCTURES, {filter: (s) => {return ( s.structureType == STRUCTURE_CONTAINER)}})
        var usedstorage = 0
        var mycapacity=0
        for(var i=0; i < allstorage.length;i++){
                usedstorage+=_.sum(allstorage[i].store)
                mycapacity+=allstorage[i].storeCapacity
        }
        Game.rooms[name].memory.storagepercent = usedstorage/mycapacity
        
        var containerusedstorage = 0
        var containercapacity=0
        for(var i=0; i < allcontainers.length;i++){
                containerusedstorage+=_.sum(allcontainers[i].store)
                containercapacity+=allcontainers[i].storeCapacity
        }
        Game.rooms[name].memory.containerstoragepercent = containerusedstorage/containercapacity
        console.log('-------')
        console.log('Room "'+name+'" has '+roomenergy+' energy : Using ' + usedstorage + ' of ' + mycapacity + ', ' + Game.rooms[name].memory.storagepercent * 100 + '% Storage, ' + containerusedstorage + ' of ' + containercapacity + ':' + Game.rooms[name].memory.containerstoragepercent *100+ '% in containers')
        if(Game.rooms[name].memory.maxbuilders == undefined){ Game.rooms[name].memory.maxbuilders =0 }
        if(Game.rooms[name].memory.maxupgraders == undefined){ Game.rooms[name].memory.maxupgraders = 0 }
        if(Game.rooms[name].memory.maxminers == undefined){ Game.rooms[name].memory.maxminers = 0 }
        if(Game.rooms[name].memory.maxminer2s == undefined){ Game.rooms[name].memory.maxminer2s = 0 }
        if(Game.rooms[name].memory.maxhaulers == undefined){ Game.rooms[name].memory.maxhaulers = 0 }
        if(Game.rooms[name].memory.maxhauler2s == undefined){ Game.rooms[name].memory.maxhauler2s = 0 }
        if(Game.rooms[name].memory.maxwarriors == undefined){ Game.rooms[name].memory.maxwarriors = 0 }
        if(Game.rooms[name].memory.maxtowerrechargers == undefined){ Game.rooms[name].memory.maxtowerrechargers = 0 }
        if(Game.rooms[name].memory.maxharvesters == undefined){ Game.rooms[name].memory.maxharvesters = 0 }
        if(Game.rooms[name].memory.maxharvester2s == undefined){ Game.rooms[name].memory.maxharvester2s = 0 }
        if(Game.rooms[name].memory.maxrepairbots == undefined){ Game.rooms[name].memory.maxrepairbots = 0 }
        if(Game.rooms[name].memory.minworkenergypct == undefined){ Game.rooms[name].memory.minworkenergypct = 0.3 }
        if(Game.rooms[name].memory.builderparkx==undefined){Game.rooms[name].memory.builderparkx=24}
        if(Game.rooms[name].memory.builderparky==undefined){Game.rooms[name].memory.builderparky=24}
        if(Game.rooms[name].memory.hauler2parkx==undefined){Game.rooms[name].memory.hauler2parkx=24}
        if(Game.rooms[name].memory.hauler2parky==undefined){Game.rooms[name].memory.hauler2parky=24}
        if(Game.rooms[name].memory.upgraderparkx==undefined){Game.rooms[name].memory.upgraderparkx=24}
        if(Game.rooms[name].memory.upgraderparky==undefined){Game.rooms[name].memory.upgraderparky=24}
        runSources.tick(name)
        roleBuilder.spawn(name)
        roleMiner.spawn(name)
        roleHauler.spawn(name)
        roleHauler2.spawn(name)
        roleUpgrader.spawn(name)
        roleMiner2.spawn(name)
        roleTowerrecharger.spawn(name)
        roleRepairbot.spawn(name)
        var mycreeps = Game.rooms[name].find(FIND_MY_CREEPS)
        for(var mycreep in mycreeps){
            try{
            var creep = mycreeps[mycreep]
            if(creep.memory.role == 'miner'){
                roleMiner.run(creep)
            }
            if(creep.memory.role == 'miner2'){
                roleMiner2.run(creep)
            }
            if(creep.memory.role == 'hauler'){
                roleHauler.run(creep)
            }
            if(creep.memory.role == 'hauler2'){
                roleHauler2.run(creep)
            }
            if(creep.memory.role == 'builder'){
                roleBuilder.run(creep)
            }
            if(creep.memory.role == 'upgrader'){
                roleUpgrader.run(creep)
            }
            if(creep.memory.role=='towerrecharger'){
                roleTowerrecharger.run(creep)
            }
            if(creep.memory.role == 'repairbot'){
               roleRepairbot.run(creep)
            }
            }  catch (e) {
                //console.log(e.toString)
            }
        }
    }
    console.log('-------')
}