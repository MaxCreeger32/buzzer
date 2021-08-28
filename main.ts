/**
 * démarrage
 */
let config = false
let id = ""

game.setScore(0)
game.showScore()
radio.setGroup(1)
id = "A"
music.setBuiltInSpeakerEnabled(true)
music.setVolume(255)

basic.forever(function () {
    
})

input.onPinPressed(TouchPin.P0, function () {
    radio.sendValue(id, 1)
    music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
    for (let i=0 ;i<=5; i++)
    {
        animationCarre()
    }
    pause(5000)
    game.showScore()
    basic.showNumber(game.score())
})

function animationCarre()
{
    basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
    pause(50)
    basic.showIcon(IconNames.SmallSquare)
    pause(50)
    basic.showIcon(IconNames.Square)
    pause(50)
}


//-----------DBEUT CONFIG DEVICE--------------
// lance la config (identifiant du device)
input.onButtonPressed(Button.AB, function () {
    if (!(config)) {
        basic.showString("Config ID")  
        basic.showString("A")
        id = "A"
        config = true
    } else {
        config = false
        game.showScore()
    }
})
input.onButtonPressed(Button.A, function () {
    if (config) {
        if (id == "A") {
            id = "D"
            basic.showString(id)
        } else if (id == "B") {
            id = "A"
            basic.showString(id)
        } else if (id == "C") {
            id = "B"
            basic.showString(id)
        } else if (id == "D") {
            id = "C"
            basic.showString(id)
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (config) {
        if (id == "A") {
            id = "B"
            basic.showString(id)
        } else if (id == "B") {
            id = "C"
            basic.showString(id)
        } else if (id == "C") {
            id = "D"
            basic.showString(id)
        } else if (id == "D") {
            id = "A"
            basic.showString(id)
        }
    }
})
//-----------FIN CONFIG DEVICE----------------

// à la réception on va savoir si c'est juste ou pas 
radio.onReceivedValue(function (name, value) {
    if (name == id && value == 1) 
    {
        game.addScore(1)
        music.startMelody(music.builtInMelody(Melodies.PowerUp), 120)     
    }
    else if (name == id && value == 0)
    {
        music.startMelody(music.builtInMelody(Melodies.PowerDown), 120)     
    }
    game.showScore()
})

