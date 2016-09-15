bodyParts.forEach(function (bodyPart) {
          var part = typeof bodyPart === 'string' ? bodyPart : bodyPart.type;
          cost += BODYPART_COST[part];
        });