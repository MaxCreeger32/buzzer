/** démarrage */
let config = false
let id2 = ""
game.setScore(0)
radio.setGroup(10)
radio.setTransmitPower(7)
id2 = "A"
music.setBuiltInSpeakerEnabled(true)
music.setVolume(255)
let attente_reponse = false
music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.OnceInBackground)
basic.forever(function on_forever() {
    
    if (!attente_reponse) {
        basic.showNumber(game.score())
    }
    
    
})
//  appui sur le buzzer
input.onPinPressed(TouchPin.P0, function on_pin_pressed_p0() {
    
    if (!attente_reponse) {
        radio.sendValue(id2, 5)
        attente_reponse = true
        soundExpression.spring.playUntilDone()
        // music.start_melody(music.built_in_melody(Melodies.PUNCHLINE), MelodyOptions.ONCE_IN_BACKGROUND)
        for (let i = 0; i < 2; i++) {
            animationCarre()
        }
        pause(500)
        basic.showNumber(game.score())
    } else {
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.OnceInBackground)
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
    pause(25)
    basic.showIcon(IconNames.SmallSquare)
    pause(25)
    basic.showIcon(IconNames.Square)
    pause(25)
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
            music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.OnceInBackground)
            basic.showIcon(IconNames.Yes)
            attente_reponse = false
        } else if (name == id2 && value == 0) {
            music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.OnceInBackground)
            basic.showIcon(IconNames.No)
            attente_reponse = false
        } else if (name != id2 && value == 1) {
            basic.showIcon(IconNames.No)
            attente_reponse = false
        }
        
    } else if (name == "ALL" && value == 0) {
        //  si rien ne correspond on ne doit rien faire mais rester en attente
        // c'est le reset
        game.setScore(0)
        attente_reponse = false
    }
    
})
input.onLogoEvent(TouchButtonEvent.Pressed, function on_logo_event_pressed() {
    
    attente_reponse = false
})
