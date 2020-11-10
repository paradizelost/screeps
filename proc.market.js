/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('proc.market');
 * mod.thing == 'a thing'; // true
 */
let gomarket={
    sellEnergy: function(myroom) {
        try{
        let availtosell= Game.rooms[myroom].terminal.store[RESOURCE_ENERGY]
        
        if(availtosell>5000){
            console.log(myroom + ":" + availtosell)
            //console.log(JSON.stringify(Game.market.orders))
          // if(Game.market.orders.length > 9){
                let myorders = Game.market.getAllOrders(order=>order.resourceType == RESOURCE_ENERGY && order.type == ORDER_BUY)
                //console.log(myorders.length)
                for(let i=0; i<myorders.length; i++){
                     let recheckavailtosell= Game.rooms[myroom].terminal.store[RESOURCE_ENERGY]
                     if(recheckavailtosell<1000){
                         console.log("too little to mess with")
                     } else {
                    //let maxTransferEnergyCost=500
                    //const transferEnergyCost = Game.market.calcTransactionCost(myorders[i].amount, myroom, myorders[i].roomName);
                    //if(transferEnergyCost < maxTransferEnergyCost) {
                        if(recheckavailtosell < myorders[i].amount){
                            amttosell = recheckavailtosell - 1000
                        } else {
                            amttosell=myorders[i].amount
                        }
                        console.log( myroom + " trying to sell " + amttosell + " Energy on order size of " + myorders[i].amount + " with " + recheckavailtosell + " left")
                        let mydeal = Game.market.deal(myorders[i].id, amttosell, myroom);
                        console.log(mydeal)
                     //} else { 
                    //     console.log("Too expensive")
                     //}
                     }
                }
         //  } else {
          //     console.log("Too many orders pending")
        //   }
        }
        }catch(e){
            console.log(e)
        }
    }
        
}
module.exports = gomarket;