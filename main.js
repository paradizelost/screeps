'use strict';
global.Empire = require("Empire")
let roleBuilder=require('role.builder');
let roleClaimer=require('role.claimer');
let roleMiner=require('role.miner');
let roleHauler=require('role.hauler')
let roleHauler2=require('role.hauler2')
let roleUpgrader=require('role.upgrader')
let roleTowerrecharger=require('role.recharger')
let runSources=require('sourceprocessing')
let roleRepairbot=require('role.repairbot')
let runTower = require('tower');
let assignMiners=require('sproc')
let roleWarrior=require('role.warrior')
let rolenrBuilder=require('role.nrbuilder')
let rolenrMiner=require('role.nrminer')
let processSpawns=require('spawnprocessing')
let minerals=require('mineralprocessing')
let roleMiner2=require('role.miner2')
let roleHauler3=require('role.mineralhauler')
let minedproc = require('MinedMineralProc')
module.exports.loop = function () {
    console.log('---START---')
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    for(let myroom of _.filter(Game.rooms, 'controller.my')) {
        let name = myroom.name
        console.log('---'+name+'---')
        runTower.tick(name);
        assignMiners.tick(name)
        runSources.tick(name)
        minedproc.tick(name)
        try{
        let roomenergy = Game.rooms[name].energyAvailable
        let allstorage = Game.rooms[name].find(FIND_STRUCTURES, {filter: (s) => {return ( s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE)}})
        let usedstorage = 0
        let mycapacity=0
        for(let i of allstorage){
                usedstorage+=_.sum(i.store)
                mycapacity+=i.storeCapacity
        }
        let allcontainers = Game.rooms[name].find(FIND_STRUCTURES, {filter: (s) => {return ( s.structureType == STRUCTURE_CONTAINER)}})
        let containerusedstorage = 0
        let containercapacity=0
        for(let i=0; i < allcontainers.length;i++){
                containerusedstorage+=_.sum(allcontainers[i].store)
                containercapacity+=allcontainers[i].storeCapacity
        }
        Game.rooms[name].memory.storagepercent = usedstorage/mycapacity
        Game.rooms[name].memory.containerstoragepercent = containerusedstorage/containercapacity
        if(!(Game.rooms[name].memory.containerstoragepercent >-.1)){Game.rooms[name].memory.containerstoragepercent=0}
        console.log('-------')
        console.log('Room "'+name+'" has '+roomenergy+' energy : Using ' + usedstorage + ' of ' + mycapacity + ', ' + Game.rooms[name].memory.storagepercent * 100 + '% Storage, ' + containerusedstorage + ' of ' + containercapacity + ':' + Game.rooms[name].memory.containerstoragepercent *100+ '% in containers')
        } catch(e){}
        if(Game.rooms[name].memory.CreepNum == undefined){Game.rooms[name].memory.CreepNum=0}
        if(Game.rooms[name].memory.minbuildpct == undefined){Game.rooms[name].memory.minbuildpct=.5}
        if(Game.rooms[name].memory.minupgradepct == undefined){Game.rooms[name].memory.minupgradepct=.5}
        if(Game.rooms[name].memory.minrepairpct == undefined){Game.rooms[name].memory.minrepairpct=.5}
        if(Game.rooms[name].memory.maxbuilders == undefined){ Game.rooms[name].memory.maxbuilders =1 }
        if(Game.rooms[name].memory.maxnrbuilders == undefined){ Game.rooms[name].memory.maxnrbuilders =0 }
        if(Game.rooms[name].memory.maxclaimers == undefined){ Game.rooms[name].memory.maxclaimers =0 }
        if(Game.rooms[name].memory.maxupgraders == undefined){ Game.rooms[name].memory.maxupgraders = 2 }
        if(Game.rooms[name].memory.maxminers == undefined){ Game.rooms[name].memory.maxminers = 2 }
        if(Game.rooms[name].memory.maxminer2s == undefined){ Game.rooms[name].memory.maxminer2s = 0 }
        if(Game.rooms[name].memory.maxnrminers == undefined){ Game.rooms[name].memory.maxnrminers = 0 }
        if(Game.rooms[name].memory.maxhaulers == undefined){ Game.rooms[name].memory.maxhaulers = 2 }
        if(Game.rooms[name].memory.maxhauler2s == undefined){ Game.rooms[name].memory.maxhauler2s = 1 }
        if(Game.rooms[name].memory.maxhauler3s == undefined){ Game.rooms[name].memory.maxhauler3s = 0 }
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
        if(Game.rooms[name].memory.warriorparkx==undefined){Game.rooms[name].memory.warriorparkx=15}
        if(Game.rooms[name].memory.warriorparky==undefined){Game.rooms[name].memory.warriorparky=34}
        processSpawns.tick(name)
        minerals.tick(name)
    }
    let mycreeps = Game.creeps
        for(let mycreep in mycreeps){
            try{
            let creep = mycreeps[mycreep]
            if(creep.memory.role == 'miner'){
                roleMiner.run(creep)
            }
            if(creep.memory.role=='miner2'){
                roleMiner2.run(creep)
            }
            if(creep.memory.role == 'claimer'){
                roleClaimer.run(creep)
            }
            if(creep.memory.role == 'hauler'){
                roleHauler.run(creep)
            }
            if(creep.memory.role == 'hauler2'){
                roleHauler2.run(creep)
            }
            if(creep.memory.role == 'hauler3'){
                roleHauler3.run(creep)
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
            if(creep.memory.role=='warrior'){
                roleWarrior.run(creep)
            }
            if(creep.memory.role=='nrbuilder'){
                rolenrBuilder.run(creep)
            }
            if(creep.memory.role=='nrminer'){
                rolenrMiner.run(creep)
            }
            }  catch (e) {
                //console.log(e.toString)
            }

        }
    console.log('----END---')
}