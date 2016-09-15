let roleHarvester = require('role.harvester');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');
let roleDistributor = require('role.distributor');
let roleUpgrader = require('role.upgrader');
let roleClaimer = require('role.claimer');
let roleMiner = require("role.miner");

let roleDefender = require('role.defender');

let structureTower = require('structure.tower');
let structureLink = require('structure.link');

const FLAG_PRIORITIES = { 'Flag1': 100, 'Flag2': 70, 'Flag3': 80, 'Flag4': 75, 'Flag5': 100};
const ROLE_PRIORITIES = { 'Claimers': 100, 'Harvesters': 95, 'Distributors': 94, 'Repairers': 85, 'Builders': 80, 'Upgraders': 75, 'Defenders': 90 , 'Miners' : 85 };

module.exports.loop = function () {
    let spawnStack = new Array();
    
    cleanUpCreepsFromMemory();
    
    for(let room in Memory.myRooms){
        let roomBuf = Memory.myRooms[room];
        let spawnsInRoom = Game.rooms[room].find(FIND_MY_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_SPAWN });
        
        structureLink.run();//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        for(let tower in Game.rooms[room].find(FIND_MY_STRUCTURES, {filter: s => s.structureType == STRUCTURE_TOWER}))
            structureTower.run(Game.rooms[room].find(FIND_MY_STRUCTURES, {filter: s => s.structureType == STRUCTURE_TOWER})[tower]);
        
        for(let flag in roomBuf){
            let flagBuf = roomBuf[flag];
            
            for(let role in flagBuf){
                let roleBuf = flagBuf[role];
                
                while(roleBuf.creeps.length < roleBuf.amountToSpawn){
                    roleBuf.creeps.push("undefined");
                }
                
                for(let i = roleBuf.creeps.length-1; i > 0; i--){
                    if(i >= roleBuf.amountToSpawn && !Game.creeps[roleBuf.creeps[i]]){
                        roleBuf.creeps.pop();
                    }else {
                        break;
                    }
                }
                
                for(let creep in roleBuf.creeps){
                    let creepBuf = roleBuf.creeps[creep];
                    
                    if(!Game.creeps[creepBuf]){
                        addToSpawnStack(spawnStack, room, flag, role, creep);
                    }else {
                        var start = Game.cpu.getUsed();
                        orderCreep(room, flag, role, creepBuf, creep);
                        var end = Game.cpu.getUsed();
                        //console.log(end-start + " " + flag + " " + role);
                        
                        let hostileCreeps = Game.creeps[creepBuf].room.find(FIND_HOSTILE_CREEPS);
                        if(hostileCreeps.length > 0){
                            Game.flags['DD'].setPosition(hostileCreeps[0].pos);
                        }
                    }
                }
            }
        }
        
        spawnStack.sort(function(s1, s2){ return s1.priority > s2.priority });
        for(let spawn in spawnsInRoom){
            let spawnBuf = spawnsInRoom[spawn];
                
            if(spawnBuf.isSpawning == null && spawnStack.length > 0)
                spawnFromStack(spawnStack, spawnBuf);
        }
    }
}

let cleanUpCreepsFromMemory = function () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

let addToSpawnStack = function(spawnStack, room, flag, role, creep){
    let priority = FLAG_PRIORITIES[flag] * ROLE_PRIORITIES[role];
    spawnStack.push({'priority': priority,'room': room, 'flag': flag, 'role': role, 'creep': creep});
    //console.log("Pushed: " + priority + " " + room + " " + flag + " " + role + " " + creep);
}
    
let spawnFromStack = function(spawnStack, spawn){
    if(spawn.isSpawning != null)
        return;
    
    let creepToSpawn = spawnStack.pop();
    
    let room = creepToSpawn.room;
    let flag = creepToSpawn.flag;
    let role = creepToSpawn.role;
    let creep = creepToSpawn.creep;
    let newCreep = spawnCreep(role, spawn);
        
    if(Game.creeps[newCreep]){
        Memory.myRooms[room][flag][role].creeps[creep] = newCreep;
        console.log("Spawned new Creep: " + newCreep + " " + role + " " + flag + " " + room);
    }else {
        spawnStack.push(creepToSpawn);
    }
}

let spawnCreep = function(role, spawn){
    let newCreep;
    if(role == 'Harvesters'){
        if(spawn.name == "Spawn1")
            newCreep = spawn.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], undefined);
        else
            newCreep = spawn.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined);
    }else if(role == 'Distributors'){
        if(spawn.name == "Spawn1")
            newCreep = spawn.createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined);
        else
           newCreep = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined); 
    }else if(role == 'Upgraders'){
        if(spawn.name == "Spawn1")
            newCreep = spawn.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined);
        else
            ;
    }else if(role == 'Builders'){
        if(spawn.name == "Spawn1")
            newCreep = spawn.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined);
        else
            newCreep = spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined);
    }else if(role == 'Repairers'){
        if(spawn.name == "Spawn1")
            newCreep = spawn.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined);
        else
            newCreep = spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined);
    }else if(role == 'Miners'){
        if(spawn.name == "Spawn1")
            newCreep = spawn.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined);
        else
            newCreep = spawn.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined);
    }else if(role == 'Claimers'){
        if(spawn.name == "Spawn1")
            newCreep = spawn.createCreep([CLAIM, CLAIM, MOVE, MOVE], undefined);
        else
            newCreep = spawn.createCreep([CLAIM,CLAIM,MOVE,MOVE], undefined);
    }else if(role == 'Defenders'){
        if(spawn.name == "Spawn1")
            newCreep = spawn.createCreep([TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE ,MOVE, HEAL, HEAL, HEAL, HEAL, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], undefined);
        else
            ;
    }
    return newCreep;
}

let orderCreep = function(room, flag, role, creepName, creepIndex){
    if(role == 'Harvesters'){
        
        roleHarvester.run(room, flag, creepName, creepIndex);
        
    }else if(role == 'Distributors'){
        
        roleDistributor.run(room, flag, creepName, creepIndex);
        
    }else if(role == 'Upgraders'){
        
        roleUpgrader.run(flag, creepName);
        
    }else if(role == 'Builders'){
        
        roleBuilder.run(room, flag, creepName);
        
    }else if(role == 'Repairers'){
        
        roleRepairer.run(room, flag, creepName);
        
    }else if(role == 'Miners'){
        
        roleMiner.run(room, flag, creepName);
        
    }else if(role == 'Claimers'){
        
        roleClaimer.run(flag, creepName);
        
    }else if(role == 'Defenders'){
        
        roleDefender.run('DD', creepName);
        
    }
}

let init = function(){
    Memory.myRooms = 
        {
            'E22S57': 
            {
                'Flag1': 
                {
                    'Harvesters': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Distributors': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Repairers': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Builders': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Upgraders': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Miners': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Claimers': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Healers': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Melees': {'amountToSpawn': 0, 'creeps': new Array()},
                },
                
                'Flag2': 
                {
                    'Harvesters': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Distributors': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Repairers': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Builders': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Upgraders': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Miners': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Claimers': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Healers': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Melees': {'amountToSpawn': 0, 'creeps': new Array()},
                },
                
                'Flag3': 
                {
                    'Harvesters': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Distributors': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Repairers': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Builders': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Upgraders': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Miners': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Claimers': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Healers': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Melees': {'amountToSpawn': 0, 'creeps': new Array()},
                },
                
                'Flag4': 
                {
                    'Harvesters': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Distributors': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Repairers': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Builders': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Upgraders': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Miners': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Claimers': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Healers': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Melees': {'amountToSpawn': 0, 'creeps': new Array()},
                }
            },
		
			'E24S57': 
            {
                'Flag5': 
                {
                    'Harvesters': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Distributors': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Repairers': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Builders': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Upgraders': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Miners': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Claimers': {'amountToSpawn': 0, 'creeps': new Array()}, 
                    'Healers': {'amountToSpawn': 0, 'creeps': new Array()},
                    'Melees': {'amountToSpawn': 0, 'creeps': new Array()},
                }
            }
        };
}