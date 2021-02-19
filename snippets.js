//action card with inline roll
<div class="pf2e chat-card action-card" data-actor-id="NcU2wfcl7lXU92Zu" data-item-id="z8Vh23jCIh7iroYs">
      <header class="card-header flexrow">
          <img src="icons/svg/mystery-man.svg" title="Swarming Stings" width="36" height="36" />
          <h3>Swarming Stings</h3>
      </header>
  
      <div class="card-content">Each enemy in the swarm’s space takes <a class="inline-roll roll" data-mode="roll" data-flavor="piercing damage" data-formula="2d8" title="piercing damage"><i class="fas fa-dice-d20"></i> 2d8</a> piercing damage (DC 21 basic Reflex save) and is exposed to wasp venom. A successful save negates the poison exposure.</div>
  
  
      <footer class="card-footer">
          <span>Action</span>
      </footer>
  </div>

  //example of condition card
  
            <div class="dice-roll">
                <div class="dice-result">
                    <div class="dice-total statuseffect-message">
                        <ul>
                <li><img src="systems/pf2e/icons/conditions-2/controlled.png" title="Another creature determines your actions." />
                    <span class="statuseffect-li">
                        <span class="statuseffect-li-text">Controlled </span>
                        <div class="statuseffect-rules"><h2>Controlled</h2><p>Someone else is making your decisions for you, usually because you’re being commanded or magically dominated. The controller dictates how you act and can make you use any of your actions, including attacks, reactions, or even <a class="entity-link" data-pack="pf2e.actionspf2e" data-lookup="A72nHGUtNXgY5Ey9" draggable="true"><i class="fas fa-suitcase"></i> Delay</a>. The controller usually does not have to spend their own actions when controlling you.</p></div>
                    </span>
                </li>
                <li><img src="systems/pf2e/icons/conditions-2/flatFooted.png" title="You’re unable to defend yourself to your full capability." />
                    <span class="statuseffect-li">
                        <span class="statuseffect-li-text">Flat-Footed </span>
                        <div class="statuseffect-rules"><h2>Flat-Footed</h2><p>You’re distracted or otherwise unable to focus your full attention on defense. You take a –2 circumstance penalty to AC. Some effects give you the flat-footed condition only to certain creatures or against certain attacks. Others—especially conditions—can make you universally flat-footed against everything. If a rule doesn’t specify that the condition applies only to certain circumstances, it applies to all of them; for example, many effects simply say “The target is flat-footed.”</p></div>
                    </span>
                </li></ul>
                    </div>
                </div>
            </div>

//Grovel entity link
<a class="entity-link" data-pack="pf2e.feats-srd" data-id="gS9FYlD0Vt8yyZkP" draggable="true"><i class="fas fa-suitcase"></i> Grovel</a>


//crit hit
<div><h3 style="border-bottom:3px solid black">Attacks:</h3></div><div class="targetPicker" data-target="FBCdorG3ruUBkhFi" data-hittype="ch">
                <div style="color:#131516;margin-top:4px">
                💥 <b>Jerry's Temp:</b>   
                </div>
                <div style="border-bottom:2px solid black;color:#131516;padding-bottom:4px">
                💥 
                <b style="color:#4C7D4C">
                Critically Hit by 12!
                </b>
                </div>
                </div>"

//norm hit
"<div><h3 style="border-bottom:3px solid black">Attacks:</h3></div><div class="targetPicker" data-target="FBCdorG3ruUBkhFi" data-hittype="h">
                <div style="color:#131516;margin-top:4px">
                <b style="color:#4C7D4C">✔️</b> <b>Jerry's Temp:</b> 
                </div>
                <div style="color:#131516;border-bottom:2px solid black;padding-bottom:4px">
                <b style="color:#4C7D4C">✔️</b> Hit by 9.
                </div>
                </div>"

//miss
"<div><h3 style="border-bottom:3px solid black">Attacks:</h3></div><div class="targetPicker" data-target="FBCdorG3ruUBkhFi" data-hittype="m">
                <div style="color:#131516;margin-top:4px">
                ❌ <b>Jerry's Temp:</b> 
                </div>
                <div style="color:#131516;border-bottom:2px solid black;padding-bottom:4px">
                ❌ Missed by -3.
                </div>
                </div>"

//turn on hooks debugging
CONFIG.debug.hooks = true


//play sound
AudioHelper.play({src: "https://assets.forge-vtt.com/5eecb1178c5c9e3604c4a5d4/yippee.wav"});


//attack roll flavor
<b>Strike: Rapier w/ Confident Finisher</b>
<div style="display:flex;flex-wrap:wrap">
    <span style="white-space:nowrap;margin:0 2px 2px 0;padding:0 3px;font-size:10px;line-height:16px;border:1px solid #999;border-radius:3px;background:rgba(0, 0, 0, 0.05)">
        Dexterity +4
    </span>
    <span style="white-space:nowrap;margin:0 2px 2px 0;padding:0 3px;font-size:10px;line-height:16px;border:1px solid #999;border-radius:3px;background:rgba(0, 0, 0, 0.05)">
        Expert +9
    </span>
</div>

//Finisher damage roll flavor
<b>Damage Roll: Rapier w/ Finisher</b> (success)
<div style="display:flex;flex-wrap:wrap">
    <span style="white-space:nowrap;margin:0 2px 2px 0;padding:0 3px;font-size:10px;line-height:16px;border:1px solid #999;border-radius:3px;color:white;background:rgba(0, 0, 0, 0.45)">
        Base 1d6 piercing
    </span>
    <span style="white-space:nowrap;margin:0 2px 2px 0;padding:0 3px;font-size:10px;line-height:16px;border:1px solid #999;border-radius:3px;background:rgba(0, 0, 0, 0.05)">
        Additional Custom Damage +3d6
    </span>
    <span style="white-space:nowrap;margin:0 2px 2px 0;padding:0 3px;font-size:10px;line-height:16px;border:1px solid #999;border-radius:3px;background:rgba(0, 0, 0, 0.05)">
        Strength +3
    </span>
</div>

//add effects
const ITEM_UUID = 'Compendium.pf2e.spell-effects.beReeFroAx24hj83'; // Spell Effect: Inspire Courage
(async () => {
  const effect = duplicate(await fromUuid(ITEM_UUID));
  for await (const token of canvas.tokens.controlled) {
    let existing = token.actor.items.find(i => i.type === 'effect' && i.data.flags.core?.sourceId === ITEM_UUID);
    if (existing) {
      token.actor.deleteOwnedItem(existing._id);
    } else {
      token.actor.createOwnedItem(effect);
    }
  }
})();
        