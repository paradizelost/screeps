var roleHarvester = require('role.harvester');
var roleHarvester2 = require('role.harvester2');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleMiner2 = require('role.miner2');
var roleHauler = require('role.hauler');
var roleHauler2 = require('role.hauler2');
var roleWarrior = require('role.warrior');
var runTower = require('tower');
var roleTowerrecharger = require('role.towerrecharger');
var purgetype="NONE"
var clearflags=0
module.exports.loop = function () {
    
    if(purgetype != "NONE"){        _(Game.creeps).filter(c=>c.memory.role == purgetype).forEach(c=>c.suicide()).value()      }
    
    runTower.tick();
    if(clearflags>0){
        console.log("Clearing Flags");
        _.forEach(Game.flags, function(flag) {flag.remove()});
    }
    console.log("--------")
    for(var name in Game.rooms) {
        if(Game.rooms[name].memory.maxbuilders == undefined){ Game.rooms[name].memory.maxbuilders =4 }
        if(Game.rooms[name].memory.maxupgraders == undefined){ Game.rooms[name].memory.maxupgraders = 3 }
        if(Game.rooms[name].memory.maxminers == undefined){ Game.rooms[name].memory.maxminers = 1 }
        if(Game.rooms[name].memory.maxminer2s == undefined){ Game.rooms[name].memory.maxminer2s = 1 }
        if(Game.rooms[name].memory.maxhaulers == undefined){ Game.rooms[name].memory.maxhaulers = 2 }
        if(Game.rooms[name].memory.maxhauler2s == undefined){ Game.rooms[name].memory.maxhauler2s = 1 }
        if(Game.rooms[name].memory.maxwarriors == undefined){ Game.rooms[name].memory.maxwarriors = 2 }
        if(Game.rooms[name].memory.maxtowerrechargers == undefined){ Game.rooms[name].memory.maxtowerrechargers = 3 }
        if(Game.rooms[name].memory.maxharvesters == undefined){ Game.rooms[name].memory.maxharvesters = 0 }
        if(Game.rooms[name].memory.maxharvester2s == undefined){ Game.rooms[name].memory.maxharvester2s = 0 }
        
        console.log('Room "'+name+'" has ' + Game.rooms[name].energyAvailable + ' energy');
    }
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    roleMiner.spawn()
    roleMiner2.spawn()
    roleHarvester.spawn()
    roleHarvester2.spawn()
    roleBuilder.spawn()
    roleUpgrader.spawn()
    roleHauler.spawn()
    roleHauler2.spawn()
    roleTowerrecharger.spawn()
    roleWarrior.spawn()
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'harvester2') {
            roleHarvester2.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'miner2') {
              roleMiner2.run(creep);
        }
        if(creep.memory.role == 'hauler'){
            roleHauler.run(creep)
        }
        if(creep.memory.role == 'hauler2'){
            roleHauler2.run(creep)
        }
        if(creep.memory.role == 'warrior'){
            roleWarrior.run(creep)
        }
        if(creep.memory.role == 'towerrecharger'){
            roleTowerrecharger.run(creep)
        }
    }
}