const ITEM_UUID = 'Compendium.pf2e.feature-effects.uBJsxCzNhje8m8jj'; // Feature Effect: Panache
(async () => {
    if (actor) {
        let mapIndex=0;
        if(event.ctrlKey){
            mapIndex = 1;
        }
        if(event.altKey){
           mapIndex = 2;
        }
       
        
        const macro = game.macros.getName("Panache");
        //see if they have a single target
        let targets = Array.from(game.user.targets)
        if(targets.length == 0 || targets.length > 1 ){
            ui.notifications.error("Please target one token");
            return;
        }
        
        let strike = actor.data.data.actions.filter(a => a.type === 'strike').find(s => s.name === 'Rapier');
        console.log(strike);
        let options = actor.getRollOptions(['all', 'attack-roll']);
        let damageOptions = actor.getRollOptions(['all', 'damage-roll']);
        AudioHelper.play({src: "https://darthraderfoundrybucketyo.s3.amazonaws.com/Sounds/sword.mp3"}, true);
        let rollMessage = strike.variants[mapIndex]?.roll(event, options);
        Hooks.once('renderChatMessage', (chatItem, html) => {
            const macroSword = game.macros.getName("SwordSimple");
            macroSword.execute();
            console.log(chatItem);
            console.log(damageOptions);
            let rolledNumber = chatItem._roll.results[0];
            console.log("Rolled Number = " + rolledNumber);
            let result = chatItem._roll._total     
            let target_actor = targets[0].actor;
            let targetAC = target_actor.data.data.attributes.ac.value;
            let attackResult = result - targetAC;
            let successMess = '';
            
            if(rolledNumber == 20 || attackResult >=10){
                //crit success
                AudioHelper.play({src: "https://darthraderfoundrybucketyo.s3.amazonaws.com/Sounds/sm64_mario_haha.wav", volume: 0.3}, true);
                successMess = '<b style="color:#FF0000";>Critical Success!!</b> Serko is a god amongst Kobolds';
                ChatMessage.create({ 
                    content: successMess, 
                    speaker: {
                        alias:actor.name}
                });
            } else if (rolledNumber == 1 || attackResult <= -10){
                //crit failure
                AudioHelper.play({src: "https://darthraderfoundrybucketyo.s3.amazonaws.com/Sounds/sm64_mario_oof.wav", volume: 0.3}, true);                
                successMess = '<b style="color:#FF0000";>Critical Fail!!</b> Fuck this damn game!!';
                ChatMessage.create({ 
                    content: successMess, 
                    speaker: {
                        alias:actor.name}
                });
            } else if (attackResult >= 0){
                //regular hit
                AudioHelper.play({src: "https://darthraderfoundrybucketyo.s3.amazonaws.com/Sounds/sm64_mario_waha.wav", volume: 0.3}, true);
                successMess = 'Success!!';
                ChatMessage.create({ 
                    content: successMess, 
                    speaker: {
                        alias:actor.name}
                });
            }else{
                //must be a regular miss
                AudioHelper.play({src: "https://darthraderfoundrybucketyo.s3.amazonaws.com/Sounds/sm64_mario_mamma-mia.wav", volume: 0.3}, true);
                successMess = 'Failure (still half precision damage)';
                ChatMessage.create({ 
                    content: successMess, 
                    speaker: {
                        alias:actor.name}
                });                
            }        
        }); 
    } else {
        ui.notifications.warn("You must have an actor selected.");
    }
})(); 