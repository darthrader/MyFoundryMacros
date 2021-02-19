main()

async function main(){
    let actors = canvas.tokens.controlled.map(token => {
        return token.actor
    })
    console.log(actors)
    const data = {
        "user": "tokens",
        "actors": [
            actors
        ],
        "abilities": [],
        "saves": [],
        "skills": [],
        "advantage": 0,
        "mode": "blindroll",
        "title": "Perception Check Bitch!",
        "message": "Make me a secret perception check.  We all know you cheat when you know the result",
        "formula": "",
        "deathsave": false,
        "initiative": false,
        "perception": true
      };
      
      game.socket.emit('module.lmrtfy', data);

}
