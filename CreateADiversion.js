const ITEM_UUID = 'Compendium.pf2e.feature-effects.uBJsxCzNhje8m8jj'; // Feature Effect: Panache
(async () => {
    if (actor) {
        let flatFooted = '<a class="entity-link" data-pack="pf2e.conditionitems" data-id="AJh5ex99aV6VTggg" draggable="true"><i class="fas fa-shoe-prints"></i> Flat-Footed</a>' ;
        let targets = Array.from(game.user.targets)
        if(targets.length == 0 || targets.length > 1 ){
            ui.notifications.error("Please target one token");
            return;
        }
        let target_actor = targets[0].actor;
        let save_dc = target_actor.data.data.attributes.perception.value + 10;
        let panacheOn = false;
        const effect = duplicate(await fromUuid(ITEM_UUID));
        for await (const token of canvas.tokens.controlled) {
            let existing = token.actor.items.find(i => i.type === 'effect' && i.data.flags.core?.sourceId === ITEM_UUID);
            if (existing) {
                panacheOn = true;
            }
        }
        const content = `
        <div class="pf2e chat-card action-card" data-actor-id="${actor.data._id}"> 
            <header class="card-header flexrow">
                <i class="fas fa-eye"></i>
                <img src="${token.data.img}" title="Create A Diversion" width="36" height="36" />
                <h3>"Create A Diversion</h3>
            </header>
            <div class="card-content"><a class="entity-link" data-pack="pf2e.actionspf2e" data-id="GkmbTGfg8KcgynOA" draggable="true"><i class="fas fa-eye"></i> Create a Diversion</a> vs the targets <b>Perception DC: ${save_dc}</b>
            </div> 
            <footer class="card-footer">
                <span>Action</span>
            </footer>
            </div>
        `
    let rollMessage = await new Roll('1d20 + ' + actor.data.data.skills.dec.value).toMessage({ flavor: content, speaker: {alias:actor.name} });
       

    Hooks.once('diceSoNiceRollComplete', (messageId) => {
        AudioHelper.play({src: "https://darthraderfoundrybucketyo.s3.amazonaws.com/Sounds/lookoverthere.wav", volume: 0.8}, true); 
        const macro = game.macros.getName("Panache");
        let rolledNumber = rollMessage._roll.dice[0].rolls[0].roll;
        let result = rollMessage._roll._total
    
        let attackResult = result - save_dc;

        console.log(attackResult);
        let chatMessage = '';

        //now check the result.
        if (attackResult >= 0){
            //regular hit
            chatMessage = 'Success!! I am hidden and ' + target_actor.name +  ' is ' + flatFooted + ' for my next mele attack and I get some Panache Bitches!! <br><img src="https://media1.tenor.com/images/b0f257b734fc25ec48a08706d0722ff7/tenor.gif?itemid=4483383"></img>';
            
            if (!panacheOn) {
                macro.execute();
            } 
        }else{
            //must be a regular miss
            chatMessage = 'Failure!! He no lookie <br><img src="https://media1.tenor.com/images/b53a3ed38b2e43706fd57f6ff33ae1bd/tenor.gif?itemid=4119355"></img>';
        }
        ChatMessage.create({ 
            content: chatMessage, 
            speaker: {
                alias:actor.name}
        });
    });
    
    

    
    } else {
        ui.notifications.warn("You must have an actor selected.");
      }
      })(); 