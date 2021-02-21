//Change these two to whatever spell name you want and the name of the animation macro you want executed
const SPELL_NAME = 'Magic Missile'; 
const ANIM_NAME = 'MagicMissileRanColor';
(async () => {
    for await (const token of canvas.tokens.controlled) {
        console.log(token.actor.data.items);
        let existing = token.actor.data.items.find(i => i.type === 'spell' && i.name === SPELL_NAME);
        if (existing) {
                let spellID = existing._id;
                console.log(spellID);
                game.pf2e.rollItemMacro(spellID);
        } else {
            ui.notifications.warn("Bitch you ain't got a spell named " + SPELL_NAME);  
            return;
        }
    }

    const macro = game.macros.getName(ANIM_NAME);
    macro.execute();
    AudioHelper.play({src: "https://darthraderfoundrybucketyo.s3.amazonaws.com/Sounds/magic-missiles.wav"}, true);

})();