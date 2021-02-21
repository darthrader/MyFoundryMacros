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
                

                let chatMessage = '';
                chatMessage = '<b style="color:#FF0000";>Serko Got Panache!!</b> <br> <img src="https://media2.giphy.com/media/l3q2wYhKr6uvfXpkc/giphy-downsized.gif"></img>';
                ChatMessage.create({ 
                    content: chatMessage, 
                    speaker: {
                        alias:actor.name}
                });
            }
        }
    } else {
      ui.notifications.warn("You must have an actor selected.");
    }
})(); 
