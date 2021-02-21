const WEAP_NAME = 'Rapier'; 
const ANIM_NAME = 'SwordPurple';
(async () => {
    for await (const token of canvas.tokens.controlled) {
        console.log(token.actor.data.items);
        let existing = token.actor.data.items.find(i => i.type === 'weapon' && i.name === WEAP_NAME);
        if (existing) {
                let spellID = existing._id;
                console.log(spellID);
                game.pf2e.rollItemMacro(spellID);
        } else {
            ui.notifications.warn("Bitch you ain't got a weapon named " + WEAP_NAME);  
            return;
        }
    }

    const macro = game.macros.getName(ANIM_NAME);
    if(macro){
        macro.execute();
    } else{
        ui.notifications.warn("Dumbass you need to imprt the macro " + ANIM_NAME);
    }

})(); 