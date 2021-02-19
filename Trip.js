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
                <img src="${token.data.img}" title="Trip" width="36" height="36" />
                <h3>Trip</h3>
            </header>
            <div class="card-content"><a class="entity-link" data-pack="pf2e.actionspf2e" data-id="ge56Lu1xXVFYUnLP" draggable="true"><i class="fas fa-suitcase"></i> Trip</a> vs the targets <b>Reflex DC: ${save_dc}</b>
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
            chatMessage = '<b style="color:#FF0000";>Critical Success!!</b>' + target_actor.name +  ' falls prone and takes <b>1d6</b> points of damage!! <br> <img src="https://media1.tenor.com/images/b6bb26c978e2df9eb40afef1fc43e215/tenor.gif?itemid=10117231"></img>';           
        } else if (rolledNumber == 1 || attackResult <= -10){
            //crit failure
            chatMessage = 'Critical Fail!! I lost my balance and am now fucking prone.  This is bullshit!!';
        } else if (attackResult >= 0){
            //regular hit
            chatMessage = 'Success!! ' + target_actor.name +  ' is now prone.  <br><img src="https://media.tenor.com/images/1313298f059fa1ad74356d4f6fa3d8fe/tenor.gif"></img>';
            
        }else{
            //must be a regular miss
            chatMessage = 'Failure!! I guess you can still stay standing FOR FUCKING NOW!!';
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