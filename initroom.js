let initroom = {
     run: function(name) {
         console.log('Initing room ' + name)
        if(Game.rooms[name].memory.CreepNum == undefined){Game.rooms[name].memory.CreepNum=0}
        if(Game.rooms[name].memory.minbuildpct == undefined){Game.rooms[name].memory.minbuildpct=-1}
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
        if(Game.rooms[name].memory.maxrepairbots == undefined){ Game.rooms[name].memory.maxrepairbots = 1 }
        if(Game.rooms[name].memory.minworkenergypct == undefined){ Game.rooms[name].memory.minworkenergypct = 0.3 }
        if(Game.rooms[name].memory.builderparkx==undefined){Game.rooms[name].memory.builderparkx=24}
        if(Game.rooms[name].memory.builderparky==undefined){Game.rooms[name].memory.builderparky=24}
        if(Game.rooms[name].memory.hauler2parkx==undefined){Game.rooms[name].memory.hauler2parkx=24}
        if(Game.rooms[name].memory.hauler2parky==undefined){Game.rooms[name].memory.hauler2parky=24}
        if(Game.rooms[name].memory.upgraderparkx==undefined){Game.rooms[name].memory.upgraderparkx=24}
        if(Game.rooms[name].memory.upgraderparky==undefined){Game.rooms[name].memory.upgraderparky=24}
        if(Game.rooms[name].memory.warriorparkx==undefined){Game.rooms[name].memory.warriorparkx=15}
        if(Game.rooms[name].memory.warriorparky==undefined){Game.rooms[name].memory.warriorparky=34}   
        Game.rooms[name].memory.hasbeeninited=1
     }
}
module.exports = initroom