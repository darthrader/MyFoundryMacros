(async () => {
    if (actor) {
        let flatFooted = '<a class="entity-link" data-pack="pf2e.conditionitems" data-id="AJh5ex99aV6VTggg" draggable="true"><i class="fas fa-suitcase"></i> Flat-Footed</a>' ;
        let targets = Array.from(game.user.targets)
        if(targets.length == 0 || targets.length > 1 ){
            ui.notifications.error("Please target one token");
            return;
        }
        let target_actor = targets[0].actor;
        let save_dc = target_actor.data.data.saves.reflex.totalModifier + 10;
        const content = `
        <div class="pf2e chat-card action-card" data-actor-id="${actor.data._id}"> 
            <header class="card-header flexrow">
                <i class="fas fa-handshake-slash fa-3x"></i>
                <img src="${token.data.img}" title="Disarm" width="36" height="36" />
                <h3>Disarm</h3>
            </header>
            <div class="card-content"><a class="entity-link" data-pack="pf2e.actionspf2e" data-id="Dt6B1slsBy8ipJu9" draggable="true"><i class="fas fa-suitcase"></i> Disarm</a> vs the targets <b>Reflex DC: ${save_dc}</b>
            </div> 
            <footer class="card-footer">
                <span>Action</span>
            </footer>
            </div>
        `
    let rollMessage = await new Roll('1d20 + ' + actor.data.data.skills.ath.value).toMessage({ flavor: content, speaker: {alias:actor.name} });

    Hooks.once('diceSoNiceRollComplete', (messageId) => {
        let rolledNumber = rollMessage._roll.dice[0].rolls[0].roll;
        let result = rollMessage._roll._total
    
        let attackResult = result - save_dc;

        console.log(attackResult);
        let chatMessage = '';

        //now check the result.
        if(rolledNumber == 20 || attackResult >=10){
            //crit success
            chatMessage = '<b style="color:#FF0000";>Critical Success!!</b>' + target_actor.name +  ' drops their damn weapon. I own that bitch!! <br> <img src="https://media1.tenor.com/images/5e9a5cc4a52f828fe79a0373240b81a7/tenor.gif?itemid=8089096"></img>';           
        } else if (rolledNumber == 1 || attackResult <= -10){
            //crit failure
            chatMessage = 'Critical Fail!! I lost my balance and am ' + flatFooted + ' until the start of my next god damn fucking turn';
        } else if (attackResult >= 0){
            //regular hit
            chatMessage = 'Success!! ' + target_actor.name +  ' has a <b>-2</b> to attacks and attempts to disarm.  <br><img src="https://media1.tenor.com/images/4a2a8c87ea2a86dd4c0d094b0bd7dc07/tenor.gif?itemid=18197638"></img>';
            
        }else{
            //must be a regular miss
            chatMessage = 'Failure!! Keep your fucking weapon bitch!!';
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