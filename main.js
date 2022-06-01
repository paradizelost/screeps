'use strict';
global.Empire = require("Empire")
let Traveler = require("Traveler")
global.verbosity=0
module.exports.loop = function () {
    console.log("----Start loop for "+ Game.time + '----')
    let decrementcounter = Game.time % 30
    ///for (let key of require('Empire')) global[key] = require('Empire')[key]
    try{
    for(let name in Game.rooms){
        let myroom=Game.rooms[name]
        
         let towers = Game.rooms[name].find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_TOWER }})
         //console.log(towers.length)
         if(towers.length>0){
           //  console.log('running towers in ' + name)
             require('Run.Tower').tick(name)
             
         }
         if(!myroom.memory.hasbeeninited && (myroom.controller!==undefined)){
             require('RoomInit').run(name)
         }
         if(myroom.controller!==undefined){
            myroom.memory.tickssofar++
            try{
            require('Room.Phase' + myroom.memory.phase).run(name)
            } catch(e){
                console.log(myroom.name + ": " + e)
            }
         }
         
         for(let pos in myroom.memory.maphits){
             if((myroom.memory.maphits[pos].lastwalked < (Game.time - 1000)) && (myroom.memory.maphits[pos].hits>0)){
                    if(decrementcounter== 0){
                        myroom.memory.maphits[pos].hits--
                    }
             } else if(myroom.memory.maphits[pos].hits==0){
                delete myroom.memory.maphits[pos]
             }
         }
    }} catch(e) {console.log("Error processing rooms: "+ e + " " + e.stack)}
    try{
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            if(global.verbosity>0){
            }
        } else {
            let creep = Game.creeps[name]
            try{
                if(creep.spawning) return;
                if(creep.fatigue>0){
                    if(creep.room.memory.maphits==undefined){
                        creep.room.memory.maphits={}
                    }
                    //creep.room.createConstructionSite(creep.pos.x,creep.pos.y,STRUCTURE_ROAD)
                    if(creep.room.memory.maphits[creep.pos.x + '-' + creep.pos.y] ==undefined){
                        creep.room.memory.maphits[creep.pos.x + '-' + creep.pos.y]={}
                        creep.room.memory.maphits[creep.pos.x + '-' + creep.pos.y].lastwalked = Game.time
                        creep.room.memory.maphits[creep.pos.x + '-' + creep.pos.y].hits=1
                    } else {
                        creep.room.memory.maphits[creep.pos.x + '-' + creep.pos.y].hits++
                        if(creep.room.memory.maphits[creep.pos.x + '-' + creep.pos.y].hits > 5){
                            if(creep.room.memory.phase>0){
                                creep.room.createConstructionSite(creep.pos.x,creep.pos.y,STRUCTURE_ROAD)
                            }
                        }
                    }
                }
                
                require('role.' + creep.memory.role).run(creep)
                //creep.say("TRYING")
            }  catch (e) {
                creep.say('🦄')
                console.log("creep error " + creep.name)
                console.log(e)
                console.log(e.stack)
            }
        }
        //console.log('done running creeps')
    }} catch(e) {console.log("Error processing creeps: "+ e.stack)}
    try{
    let flags = Game.flags
    for(let flag in flags){
        //console.log('running flags')
        require('flag.' + flag ).run()
    }} catch(e) {console.log("Error processing flags: "+ e.stack)}
    for(let name in Memory.rooms) {
       // console.log('cleaning up old rooms')
        let myroom = Game.rooms[name]
        if(!Game.rooms[name]){delete Memory.rooms[name]}
    }
    console.log("----End loop for "+ Game.time +'----')
}