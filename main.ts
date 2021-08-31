/** démarrage */
let config = false
let id2 = ""
game.setScore(0)
game.showScore()
radio.setGroup(1)
id2 = "A"
music.setBuiltInSpeakerEnabled(true)
music.setVolume(255)
let attente_reponse = false
basic.forever(function on_forever() {
    game.showScore()
    
})
//  appui sur le buzzer
input.onPinPressed(TouchPin.P0, function on_pin_pressed_p0() {
    
    if (!attente_reponse) {
        radio.sendValue(id2, 1)
        attente_reponse = true
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
        for (let i = 0; i < 6; i++) {
            animationCarre()
        }
        pause(5000)
        game.showScore()
        basic.showNumber(game.score())
    }
    
})
function animationCarre() {
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

//  -----------DBEUT CONFIG DEVICE--------------
//  lance la config (identifiant du device)
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    if (!config) {
        basic.showString("Config ID")
        basic.showString("A")
        id2 = "A"
        config = true
    } else {
        config = false
        game.showScore()
    }
    
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (config) {
        if (id2 == "A") {
            id2 = "D"
            basic.showString(id2)
        } else if (id2 == "B") {
            id2 = "A"
            basic.showString(id2)
        } else if (id2 == "C") {
            id2 = "B"
            basic.showString(id2)
        } else if (id2 == "D") {
            id2 = "C"
            basic.showString(id2)
        }
        
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (config) {
        if (id2 == "A") {
            id2 = "B"
            basic.showString(id2)
        } else if (id2 == "B") {
            id2 = "C"
            basic.showString(id2)
        } else if (id2 == "C") {
            id2 = "D"
            basic.showString(id2)
        } else if (id2 == "D") {
            id2 = "A"
            basic.showString(id2)
        }
        
    }
    
})
//  -----------FIN CONFIG DEVICE----------------
//  à la réception on va savoir si c'est juste ou pas 
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    if (attente_reponse) {
        if (name == id2 && value == 1) {
            game.addScore(1)
            music.startMelody(music.builtInMelody(Melodies.PowerUp), 120)
        } else if (name == id2 && value == 0) {
            music.startMelody(music.builtInMelody(Melodies.PowerDown), 120)
        }
        
        game.showScore()
    }
    
})
