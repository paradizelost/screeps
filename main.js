'use strict';
global.Empire = require("Empire")
let Traveler = require("Traveler")
global.verbosity=0
module.exports.loop = function () {
    let decrementcounter = Game.time % 30
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
            require('Room.Phase' + myroom.memory.phase).run(name)
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
    }
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            if(global.verbosity>0){
            }
        } else {
            try{
                let creep = Game.creeps[name]
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
                console.log("creep error " + Game.creeps[name])
                console.log(e)
            }
        }
    }
    let flags = Game.flags
    for(let flag in flags){
        require('flag.' + flag ).run()
    }
    for(let name in Memory.rooms) {
        let myroom = Game.rooms[name]
        if(!Game.rooms[name]){delete Memory.rooms[name]}
    }
        
    }
