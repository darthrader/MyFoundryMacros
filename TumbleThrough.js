const ITEM_UUID = 'Compendium.pf2e.feature-effects.uBJsxCzNhje8m8jj'; // Feature Effect: Panache
(async () => {
    if (actor) {
        let flatFooted = '<a class="entity-link" data-pack="pf2e.conditionitems" data-id="AJh5ex99aV6VTggg" draggable="true"><i class="fas fa-suitcase"></i> Flat-Footed</a>' ;
        let targets = Array.from(game.user.targets)
        if(targets.length == 0 || targets.length > 1 ){
            ui.notifications.error("Please target one token");
            return;
        }
        let target_actor = targets[0].actor;
        console.log(target_actor);
        let save_dc = target_actor.data.data.saves.reflex.totalModifier + 10;
        const content = `
        <div class="pf2e chat-card action-card" data-actor-id="${actor.data._id}"> 
            <header class="card-header flexrow">
                <img src="/systems/pf2e/icons/actions/OneAction.png" title="Tumble Through" width="36" height="36" />
                <h3>Tumble Through</h3>
            </header>
            <div class="card-content"><a class="entity-link" data-pack="pf2e.actionspf2e" data-id="21WIfSu7Xd7uKqV8" draggable="true"><i class="fas fa-suitcase"></i> Tumble Through</a> vs the targets <b>Reflex DC: ${save_dc}</b>
            </div> 
            <footer class="card-footer">
                <span>Action</span>
            </footer>
            </div>
        `
        let panacheOn = false;
        let panacheBonus = 0;
        const effect = duplicate(await fromUuid(ITEM_UUID));
        for await (const token of canvas.tokens.controlled) {
            let existing = token.actor.items.find(i => i.type === 'effect' && i.data.flags.core?.sourceId === ITEM_UUID);
            if (existing) {
                panacheOn = true;
                panacheBonus = 1;
            }
        }
        
        let totalBonus = actor.data.data.skills.acr.value + panacheBonus;
        let rollMessage = await new Roll('1d20 + ' + totalBonus).toMessage({ flavor: content, speaker: {alias:actor.name} });

        Hooks.once('diceSoNiceRollComplete', (messageId) => {
            const macro = game.macros.getName("Panache");
            let result = rollMessage._roll._total
        
            let attackResult = result - save_dc;

            console.log(attackResult);
            let chatMessage = '';

            //now check the result.
            if (attackResult >= 0){
                //regular hit
                chatMessage = '<b>Success!!</b> You move through the enemy’s space, treating the squares in its space as difficult terrain (every 5 feet costs 10 feet of movement). If you don’t have enough Speed to move all the way through its space, you get the same effect as a failure. <br><img src="https://media.tenor.com/images/3bbdb810cc1c13e92c047831cd1eda40/tenor.gif"></img>';
                if (!panacheOn) {
                    macro.execute();
                } 
            }else{
                //must be a regular miss
                chatMessage = '<b>Failure!!</b> Your movement ends, and you trigger reactions as if you had moved out of the square you started in. <br><img src="https://media.tenor.com/images/2830c857842c963d4b4ab7a26c973376/tenor.gif"></img>';
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