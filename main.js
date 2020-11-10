'use strict';
global.Empire = require("Empire")
let Traveler = require("Traveler")
global.verbosity=0
module.exports.loop = function () {
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
        }

    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            if(global.verbosity>0){
            console.log('Clearing non-existing creep memory:', name);
            }
        } else {
            try{
                let creep = Game.creeps[name]
                if(creep.spawning) return;
                if(creep.fatigue>0){
                    creep.say('fatigued')
                    creep.room.createConstructionSite(creep.pos.x,creep.pos.y,STRUCTURE_ROAD)
                }
                
                require('role.' + creep.memory.role).run(creep)
                //creep.say("TRYING")
            }  catch (e) {}
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
