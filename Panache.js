const ITEM_UUID = 'Compendium.pf2e.feature-effects.uBJsxCzNhje8m8jj'; // Feature Effect: Panache
(async () => {
    if (actor) {
        const effect = duplicate(await fromUuid(ITEM_UUID));
        for await (const token of canvas.tokens.controlled) {
            let existing = token.actor.items.find(i => i.type === 'effect' && i.data.flags.core?.sourceId === ITEM_UUID);
            if (existing) {
                token.actor.deleteOwnedItem(existing._id);
            } else {
                token.actor.createOwnedItem(effect);
                AudioHelper.play({src: "https://darthraderfoundrybucketyo.s3.amazonaws.com/Sounds/super_mario_bros_mushroom_sound_effect.mp3", volume: 0.1}, true);
                ui.notifications.warn("Serko got his Panache on bitches! He is faster and shit!");
                let params = 
                [{
                    filterType: "globes",
                    filterId: "glowingGlobes",
                    time: 0,
                    color: 0xFF0099,
                    distortion: 0.8,
                    scale: 100,
                    alphaDiscard: false,
                    zOrder: 1,
                    animated :
                    {
                    time : 
                    { 
                        active: true, 
                        speed: 0.005, 
                        animType: "move" 
                    }
                    }
                }]

                let chatMessage = '';
                chatMessage = '<b style="color:#FF0000";>Serko Got Panache!!</b> <br> <img src="https://media2.giphy.com/media/l3q2wYhKr6uvfXpkc/giphy-downsized.gif"></img>';
                ChatMessage.create({ 
                    content: chatMessage, 
                    speaker: {
                        alias:actor.name}
                });

                TokenMagic.addUpdateFiltersOnSelected(params);
            }
        }

    //     // if the actor is already in Panache, remove Panache
    //   if ((actor.data.data.customModifiers['damage'] || []).some(modifier => modifier.name === 'Panache')) {
    //     await actor.removeCustomModifier('damage', 'Panache')
    //     ui.notifications.warn("Panache Off");
    //     token.actor.data.data.attributes.speed.value = '30';
    
    //     // if (token.data.effects.includes("systems/pf2e/icons/features/classes/sneak-attack.jpg")) {
    //     //   token.toggleEffect("systems/pf2e/icons/features/classes/sneak-attack.jpg")
    //     // }
    //     TokenMagic.deleteFiltersOnSelected();
     
    //   } else {
    //     // else if the actor is not in Panache, add Panache
       
    //     let level = token.actor.data.data.details.level.value;
       
    //     token.actor.data.data.attributes.speed.value = '35';
    //     let speedVal = token.actor.data.data.attributes.speed.value;
    //     console.log(speedVal);
    //     let panacheDam = 0;
    //     if(level<5){
    //         panacheDam = 2;
    //     }
    //     else if (level<9){
    //         panacheDam = 3;
    //     }
    //     else if (level<13){
    //         panacheDam = 4;
    //     }
    //     else if (level<17){
    //         panacheDam = 5;
    //     }
    //     else{
    //         panacheDam = 6;
    //     }

    //     await actor.addCustomModifier('damage', 'Panache', panacheDam, 'precision');
        
    //   }


    } else {
      ui.notifications.warn("You must have an actor selected.");
    }
})(); 
