(async () => {
    if (actor) {
        let flatFooted = '<a class="entity-link" data-pack="pf2e.conditionitems" data-id="TBSHQspnbcqxsmjL" draggable="true"><i class="fas fa-suitcase"></i> Frightened</a>' ;
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
                <i class="far fa-angry fa-5x"></i>
                <h3>Intimidating Glare</h3>
            </header>
            <div class="card-content">
                <a class="entity-link" data-pack="pf2e.feats-srd" data-id="xQMz6eDgX75WX2ce" draggable="true"><i class="fas fa-suitcase"></i> Intimidating Glare</a> vs the targets <b>Will DC: ${save_dc}</b>
            </div> 
            <footer class="card-footer">
                <span>Action</span>
            </footer>
        </div>
        `
        let rollMessage = await new Roll('1d20 + ' + actor.data.data.skills.itm.value).toMessage({ flavor: content, speaker: {alias:actor.name} });

        Hooks.once('diceSoNiceRollComplete', (messageId) => {
            let rolledNumber = rollMessage._roll.dice[0].rolls[0].roll;
            let result = rollMessage._roll._total
        
            let attackResult = result - save_dc;

            console.log(attackResult);
            let chatMessage = '';

            //now check the result.
            if(rolledNumber == 20 || attackResult >=10){
                //crit success
                chatMessage = '<b style="color:#FF0000";>Critical Success!!</b>' + target_actor.name +  ' is ' + flatFooted + ' <b>2</b>. <img src="https://media1.tenor.com/images/a3398ffc8f3c445051c3b08c5acdf546/tenor.gif?itemid=7232934"></img>  Fuck you panzy ass scared bitch!';
            } else if (attackResult >= 0){
                //regular hit
                chatMessage = '<b>Success!!</b> ' + target_actor.name +  ' is ' + flatFooted + ' <b>1</b>.  <img src="https://media1.tenor.com/images/e1a0e460965bad32d6af9ab68ac3892e/tenor.gif?itemid=4735349"></img> You little bitch.';
            }else{
                //must be a regular miss
                chatMessage = '<b>Failure!!</b> I shall kill you anyway';
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