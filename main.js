'use strict';
global.Empire = require("Empire")
//let runTower = require('tower');
//let assignMiners=require('sproc')
//let processSpawns=require('spawnprocessing')
//let minerals=require('mineralprocessing')
//let minedproc = require('MinedMineralProc')
//let runSources=require('sourceprocessing')
global.verbosity=0
module.exports.loop = function () {
    if(global.verbosity>0){
        console.log('---START---')
    }
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            if(global.verbosity>0){
            console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
    for(let myroom of _.filter(Game.rooms, 'controller.my')) {
        let name = myroom.name
        if(global.verbosity>0){
        console.log('---'+name+'---')
        }
        if(Game.rooms[name].memory.hasbeeninited==undefined){
            console.log('initing')
            require('initroom').run(name)
        }
        require('tower').tick(name);
        require('sproc').tick(name) // assignMiners
        require('sourceprocessing').tick(name)
        require('MinedMineralProc').tick(name)
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
        
        if(global.verbosity>0){
        console.log('-------')
        console.log('Room "'+name+'" has '+roomenergy+' energy : Using ' + usedstorage + ' of ' + mycapacity + ', ' + Game.rooms[name].memory.storagepercent * 100 + '% Storage, ' + containerusedstorage + ' of ' + containercapacity + ':' + Game.rooms[name].memory.containerstoragepercent *100+ '% in containers')
        }
        } catch(e){}
        require('spawnprocessing').tick(name)
        require('mineralprocessing').tick(name)
    }
    let mycreeps = Game.creeps
        for(let mycreep in mycreeps){
            try{
            let creep = mycreeps[mycreep]
            require('role.' + creep.memory.role).run(creep)
            }  catch (e) {
                //console.log(e.toString)
            }

        }
    if(global.verbosity>0){
        console.log('----END---')
    }
}