const ITEM_UUID = 'Compendium.pf2e.feat-effects.1nCwQErK6hpkNvfw'; // Feat Effect:Dueling Parry
let messageContent = '';
(async () => {
    for (let token of canvas.tokens.controlled) {
        const parry = token.actor.data.items.filter(item => item.name === 'Dueling Parry');
        if (parry) {
            const effect = duplicate(await fromUuid(ITEM_UUID));
            for await (const token of canvas.tokens.controlled) {
                let existing = token.actor.items.find(i => i.type === 'effect' && i.data.flags.core?.sourceId === ITEM_UUID);
                if (existing) {
                    token.actor.deleteOwnedItem(existing._id);
                    messageContent = '<a class="entity-link" data-pack="pf2e.feats-srd" data-id="WcY7H7mRiK2VDquV" draggable="true"><i class="fas fa-suitcase"></i> Dueling Parry</a> no longer active'
                }else{
                    token.actor.createOwnedItem(effect);
                    messageContent = 'Has activated  <a class="entity-link" data-pack="pf2e.feats-srd" data-id="WcY7H7mRiK2VDquV" draggable="true"><i class="fas fa-suitcase"></i> Dueling Parry</a>.  He is <b>unhittable bitches!!</b> <img src="https://media1.tenor.com/images/1d2edf4e8ea20b84279870923838203b/tenor.gif?itemid=10415980"></img>'
                }
            };


        } else ui.notifications.warn("You don't know how to do that shit.");
    }

    if (messageContent !== '') {
        let chatData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: messageContent,
        };
        ChatMessage.create(chatData, {});
    }
})();
// create the message
