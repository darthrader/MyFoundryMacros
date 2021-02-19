(async () => {
    console.log(actor);
    let macroType = 'strike';
    let actorStrikes = actor.data.data.actions.filter(a => a.type === macroType);
    console.log(actorStrikes);
    let weaponOptions = ""
    for(let strike of actorStrikes){
        weaponOptions += `<option value=${strike.name}>${strike.name} | ATK: ${strike.totalModifier}</option>`
    }
    console.log(weaponOptions);

    let dialogTemplate = `
    <h1> Pick a weapon </h1>
    <div style="display:flex">
        <div><select id="weapon">${weaponOptions}</select></div>
        <input type="radio" id="first" name="gender" value="male">
        <label for="first">1st</label><br>
        <input type="radio" id="second" name="gender" value="female">
        <label for="second">2nd</label><br>
        <input type="radio" id="third" name="gender" value="other">
        <label for="third">3rd</label>
    </div>
  `
  new Dialog({
    title: "FINISH THE BITCH!!", 
    content: dialogTemplate,
    buttons: {
        roll: {
            label: "Roll",
            callback: (html) => {
                let wepID = html.find("#weapon")[0].value;
                let strike = actor.data.data.actions.filter(a => a.type === 'strike').find(s => s.name === wepID);
                console.log(strike);
                let options = actor.getRollOptions(['all', 'attack-roll']);
                let rollMessage = strike.variants[0]?.roll(event, options);
                let targets = Array.from(game.user.targets)

                Hooks.once('renderChatMessage', (chatItem, html) => {
                    let weapon = actor.data.items.find(item => item.name == wepID);
                    let wepRoll = `${weapon.data.damage.dice}${weapon.data.damage.die}`
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
                        successMess = '<b style="color:#FF0000";>Critical Success!!</b>';
                        wepDamRoll = `2 * (${wepRoll} + ${panacheDam} + ${actor.data.data.abilities.str.mod}) + 1d8`;
                        
                    } else if (rolledNumber == 1 || attackResult <= -10){
                        //crit failure
                        successMess = '<b style="color:#FF0000";>Critical Fail!!</b> Fuck this damn game!!';
                        ChatMessage.create({ 
                            content: successMess, 
                            speaker: {
                                alias:actor.name}
                        });
                        return;
                    } else if (attackResult >= 0){
                        //regular hit
                        successMess = 'Success!!';
                        wepDamRoll = `${wepRoll} + ${panacheDam} + ${actor.data.data.abilities.str.mod}`;
                    }else{
                        //must be a regular miss
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
                    `

                    let damageMessage = new Roll(wepDamRoll).toMessage({ flavor: damageFlavor, speaker: {alias:actor.name} });
                
                })
            }
        },
        close: {
            label: "Cancel"
        }
    }
    }).render(true);
})(); 