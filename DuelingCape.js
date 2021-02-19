const ITEM_UUID = 'Compendium.pf2e.equipment-effects.7dLsA9PAb5ij7Bc6'; // Effect: Dueling Cape
(async () => {
  const effect = duplicate(await fromUuid(ITEM_UUID));
  effect.flags.core = effect.flags.core ?? {};
  effect.flags.core.sourceId = effect.flags.core.sourceId ?? ITEM_UUID;
  for await (const token of canvas.tokens.controlled) {
    let existing = token.actor.items.find(i => i.type === 'effect' && i.data.flags.core?.sourceId === ITEM_UUID);
    if (existing) {
      token.actor.deleteOwnedItem(existing._id);
    } else {
        token.actor.createOwnedItem(effect);

        let chatMessage = '';
        chatMessage = 'Serko winds his dueling cape around his arm! <br> <img src="https://64.media.tumblr.com/ee0d639e6f12d1cf8cf7370593b30abf/tumblr_mlftigw5BO1rarw0lo1_250.gifv"></img>';
        ChatMessage.create({ 
                content: chatMessage, 
                speaker: {
                    alias:actor.name}
        });
    }
  }
})();
