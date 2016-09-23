serializePos: function(pos) {
       return pos.x + '_' + pos.y + '_' + pos.roomName;
   },
   deserializePos: function(str) {
       var ar = str.split('_');
       return new RoomPosition(ar[0], ar[1], ar[2]);
   },