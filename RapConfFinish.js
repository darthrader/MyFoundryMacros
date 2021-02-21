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

        let capeBonus = 0;
        const effect = duplicate(await fromUuid(ITEM_UUID));
        for await (const token of canvas.tokens.controlled) {
            let existing = token.actor.items.find(i => i.type === 'effect' && i.data.flags.core?.sourceId === ITEM_UUID);
            if (existing) {
                macro.execute();
            }else {
                ui.notifications.warn("You ain't got no panache. You can't do a finisher!!");  
                return;  
            }
        }
        
        let strike = actor.data.data.actions.filter(a => a.type === 'strike').find(s => s.name === 'Rapier');
        console.log(strike);
        let options = actor.getRollOptions(['all', 'attack-roll']);
        AudioHelper.play({src: "https://darthraderfoundrybucketyo.s3.amazonaws.com/Sounds/sword.mp3"}, true);
        let rollMessage = strike.variants[mapIndex]?.roll(event, options);
        Hooks.once('renderChatMessage', (chatItem, html) => {
            const macroSword = game.macros.getName("SwordSimple");
            macroSword.execute();
            let weapon = actor.data.items.find(item => item.name == 'Rapier')
            let wepRoll = `2${weapon.data.damage.die}`
            let rolledNumber = chatItem._roll.dice[0].rolls[0].roll;
            let result = chatItem._roll._total     
            let target_actor = targets[0].actor;
            let targetAC = target_actor.data.data.attributes.ac.value;
            let attackResult = result - targetAC;
            let successMess = '';
            let wepDamRoll = ``;
            let level = actor.data.data.details.level.value;
            let panacheDam = '';
            if(level<5){
                panacheDam = '2d6';
            }
            else if (level<9){
                panacheDam = '3d6';
            }
            else if (level<13){
                panacheDam = '4d6';
            }
            else if (level<17){
                panacheDam = '5d6';
            }
            else{
                panacheDam = '6d6';
            }
            if(rolledNumber == 20 || attackResult >=10){
                //crit success
                AudioHelper.play({src: "https://darthraderfoundrybucketyo.s3.amazonaws.com/Sounds/sm64_mario_haha.wav", volume: 0.3}, true);
                successMess = '<b style="color:#FF0000";>Critical Success!!</b>';
                wepDamRoll = `2 * (${wepRoll} + ${panacheDam} + ${actor.data.data.abilities.str.mod}) + 1d8`;
                
            } else if (rolledNumber == 1 || attackResult <= -10){
                //crit failure
                AudioHelper.play({src: "https://darthraderfoundrybucketyo.s3.amazonaws.com/Sounds/sm64_mario_oof.wav", volume: 0.3}, true);                
                successMess = '<b style="color:#FF0000";>Critical Fail!!</b> Fuck this damn game!!';
                ChatMessage.create({ 
                    content: successMess, 
                    speaker: {
                        alias:actor.name}
                });
                return;
            } else if (attackResult >= 0){
                //regular hit
                AudioHelper.play({src: "https://darthraderfoundrybucketyo.s3.amazonaws.com/Sounds/sm64_mario_waha.wav", volume: 0.3}, true);
                successMess = 'Success!!';
                wepDamRoll = `${wepRoll} + ${panacheDam} + ${actor.data.data.abilities.str.mod}`;
            }else{
                //must be a regular miss
                AudioHelper.play({src: "https://darthraderfoundrybucketyo.s3.amazonaws.com/Sounds/sm64_mario_mamma-mia.wav", volume: 0.3}, true);
                successMess = 'Failure (still half precision damage)';
                wepDamRoll = `(${panacheDam})/2`;
            }

            const damageFlavor = `
            <b>Damage Roll: Rapier w/ Finisher</b> - ${successMess}
            <div style="display:flex;flex-wrap:wrap">
                <span style="white-space:nowrap;margin:0 2px 2px 0;padding:0 3px;font-size:10px;line-height:16px;border:1px solid #999;border-radius:3px;color:white;background:rgba(0, 0, 0, 0.45)">
                    Base ${wepRoll} ${weapon.data.damage.damageType}
                </span>
                <span style="white-space:nowrap;margin:0 2px 2px 0;padding:0 3px;font-size:10px;line-height:16px;border:1px solid #999;border-radius:3px;background:rgba(0, 0, 0, 0.05)">
                    Panache Damage +${panacheDam}
                </span>
                <span style="white-space:nowrap;margin:0 2px 2px 0;padding:0 3px;font-size:10px;line-height:16px;border:1px solid #999;border-radius:3px;background:rgba(0, 0, 0, 0.05)">
                    Strength +${actor.data.data.abilities.str.mod}
                </span>
            </div>
            <div>
                <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/55d4b777-55b7-49a6-bc23-9167b00a22e2/dbmql5o-281f65a1-28b0-4d75-a3f6-dcbcd7eeff13.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNTVkNGI3NzctNTViNy00OWE2LWJjMjMtOTE2N2IwMGEyMmUyXC9kYm1xbDVvLTI4MWY2NWExLTI4YjAtNGQ3NS1hM2Y2LWRjYmNkN2VlZmYxMy5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.3HtENdaI4gpdSCyH_-d2SAsJpgpgfsbxCKhoxS2cIPA" title="Grovel" />
            </div>            
            `

            let damageMessage = new Roll(wepDamRoll).toMessage({ flavor: damageFlavor, speaker: {alias:actor.name} });
        
        });       
    } else {
        ui.notifications.warn("You must have an actor selected.");
    }
})(); 