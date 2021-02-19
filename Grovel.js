const CLOAK_UUID = 'Compendium.pf2e.equipment-effects.7dLsA9PAb5ij7Bc6'; // Equipment Effect: Dueling Cape
const ITEM_UUID = 'Compendium.pf2e.feature-effects.uBJsxCzNhje8m8jj'; // Feature Effect: Panache
(async () => {
    if (actor) {
        let flatFooted = '<a class="entity-link" data-pack="pf2e.conditionitems" data-id="AJh5ex99aV6VTggg" draggable="true"><i class="fas fa-suitcase"></i> Flat-Footed</a>' ;
        let goadingFeint = '<a class="entity-link" data-pack="pf2e.feats-srd" data-id="hXYnwpi95E77qfAu" draggable="true"><i class="fas fa-suitcase"></i> Goading Feint</a>' ;
        let targets = Array.from(game.user.targets)
        if(targets.length == 0 || targets.length > 1 ){
            ui.notifications.error("Please target one token");
            return;
        }
        let target_actor = targets[0].actor;
        let save_dc = target_actor.data.data.saves.will.totalModifier + 10;
        const content = `
        <div class="pf2e chat-card action-card" data-actor-id="${actor.data._id}"> 
            <header class="card-header flexrow">
                <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
                <img src="${token.data.img}" title="Grovel" width="36" height="36" />
                <h3>Grovel</h3>
            </header>
            <div class="card-content"><a class="entity-link" data-pack="pf2e.feats-srd" data-id="gS9FYlD0Vt8yyZkP" draggable="true"><i class="fas fa-suitcase"></i> Grovel</a> vs the targets <b>Will DC: ${save_dc}</b>
            </div> 
            <footer class="card-footer">
                <span>Action</span>
            </footer>
            </div>
        `
        let chatMessage = '';
        let capeBonus = 0;
        let givePanache = false;
        let decValue = actor.data.data.skills.dec.value;
        const effect = duplicate(await fromUuid(ITEM_UUID));
        for await (const token of canvas.tokens.controlled) {
            let existing = token.actor.items.find(i => i.type === 'effect' && i.data.flags.core?.sourceId === ITEM_UUID);
            if (!existing) {
                givePanache = true;
            }
            let hasCape = token.actor.items.find(i => i.type === 'effect' && i.data.flags.core?.sourceId === CLOAK_UUID);
            if (hasCape){
                decValue += 1;
            }
        }

    let rollMessage = await new Roll('1d20 + ' +  decValue).toMessage({ flavor: content, speaker: {alias:actor.name} });

    Hooks.once('diceSoNiceRollComplete', (messageId) => {
        const macro = game.macros.getName("Panache");
        let rolledNumber = rollMessage._roll.dice[0].rolls[0].roll;
        let result = rollMessage._roll._total
    
        let attackResult = result - save_dc;

        console.log(attackResult);
        

        //now check the result.
        if(rolledNumber == 20 || attackResult >=10){
            //crit success
            chatMessage = '<b style="color:#FF0000";>Critical Success!!</b>' + target_actor.name +  ' is ' + flatFooted + ' until the end of my next turn and suffers a -2 penalty to attack me until the end of its next turn (' + goadingFeint + ')<br> <img src="https://media1.tenor.com/images/a5a01fa518bb4bf119fea35560a7a4a3/tenor.gif?itemid=4854239"></img>';
            if (givePanache) {
                macro.execute();
            } 
        } else if (rolledNumber == 1 || attackResult <= -10){
            //crit failure
            chatMessage = 'Critical Fail!! I am ' + flatFooted + ' against melee attacks fromt the target until the end of my next god damn fucking turn';
        } else if (attackResult >= 0){
            //regular hit
            chatMessage = 'Success!! ' + target_actor.name +  ' is ' + flatFooted + ' for my next mele attack and suffers a -2 penalty on its next attack (' + goadingFeint + ')<br><img src="https://media1.tenor.com/images/f4ac0a3a026ce93023090a51ec60b885/tenor.gif?itemid=5262053"></img>';
            if (givePanache) {
                macro.execute();
            } 
        }else{
            //must be a regular miss
            chatMessage = 'Failure!! Well that sucks!! No panache for you';
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