(()=>{
    if(!token) return;
    let closestDistance = 60;
  
    let affected_token_ids = [];
    for(let t of canvas.tokens.placeables)
    {
        let distance = Math.floor(canvas.grid.measureDistance(token, t));
        console.log(distance);
        if((distance < closestDistance) && (distance != 0)){
            closestDistance = distance;
            affected_token_ids = [];
            affected_token_ids.push(t.id);
        } else if (distance == closestDistance){
            affected_token_ids.push(t.id);
        }
    }
    console.log(affected_token_ids);
  })();