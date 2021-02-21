// For use on selected tokens.
// Requires one token to be selected
if(canvas.tokens.controlled.length == 0) ui.notifications.error("Please select a token");
// Requires FX Master Module
if (!canvas.fxmaster) ui.notifications.error("This macro depends on the FXMaster module. Make sure it is installed and enabled");

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function Cast() {

var myStringArray = Array.from(canvas.tokens.controlled);
var arrayLength = canvas.tokens.controlled.length;
let Scale = canvas.scene.data.grid/100;

for (var i = 0; i < arrayLength; i++) {
let Target = myStringArray[i];

let spellAnim = 
                    {
                     file: "modules/jb2a_patreon/Library/Generic/Explosion/Explosion_01_Orange_400x400.webm",
                      position: Target.center,
                      anchor: {
                       x: 0.5,
                       y: 0.5
                      },
                      angle: 0,
                      scale: {
                       x: Scale,
                       y: Scale
                      }
                    }; 
async function SpellAnimation(number) {

    let x = number;
// This is the interval in between the start of each animation on the loop in milliseconds
    let interval = 750;
    for (var i = 0; i < x; i++) {
         setTimeout(function() {
             canvas.fxmaster.playVideo(spellAnim);
             game.socket.emit('module.fxmaster', spellAnim);
             game.socket.emit('module.fxmaster', spellAnim);
         }, i * interval);
    }
}
// The number in parenthesis sets the number of times it loops
SpellAnimation(3)

// Add some sounds
/*
function mm_audio(number){
    let soundHome = "sound file path here";
    let soundFile = [
        `soundfile 1 here`,
        `soundfile 2 here`,
        `soundfile 3 here`
    ];
    let x = number;
// match the interval to be the same as above in SpellAnimation
    let interval = 750;
    for (var i = 0; i < x; i++) {
        setTimeout(function () {
            let random = Math.floor(Math.random() * (soundFile.length));
            AudioHelper.play({src: soundHome + soundFile[random], volume: 0.3, autoplay: true, loop: false}, true);
        }, i * interval);
    }
}
// then just define the number of times it will play
mm_audio(3);
*/

// Add some Token Magic FX
/*
let params =
[{
    filterType: "wave",
    filterId: "myShockwave",
    time: 0,
    strength: 0.03,
    frequency: 15,
    maxIntensity: 4.0,
    minIntensity: 0.5,
    padding:25,
    animated :
    {
      time : 
      { 
        active: true, 
        speed: 0.0180,
        animType: "move",
       }
    }
},
{
    filterType: "xfire",
    filterId: "myColdXFire",
    time: 0,
// Change color here in hex format
    color: 0xCB7404,
    blend: 1,
    amplitude: 1,
    dispersion: 0,
    chromatic: false,
    scaleX: 1,
    scaleY: 1,
    inlay: false,
    animated :
    {
      time : 
      { 
        active: true, 
        speed: -0.0015, 
        animType: "move" 
      }
    }
}];
await wait(250);
TokenMagic.addUpdateFiltersOnSelected(params);
*/
}
}
Cast ()
// Activate this to auto delete TMFX Filters
/*
async function ByeBye() {
await wait (2500);
TokenMagic.deleteFiltersOnSelected();
}
ByeBye ()
*/