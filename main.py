"""

démarrage

"""
config = False
id2 = ""
game.set_score(0)
radio.set_group(10)
radio.set_transmit_power(7)
id2 = "A"
music.set_built_in_speaker_enabled(True)
music.set_volume(255)
attente_reponse = False
music.start_melody(music.built_in_melody(Melodies.ENTERTAINER),
    MelodyOptions.ONCE_IN_BACKGROUND)

def on_forever():
    global attente_reponse,config

    if not (attente_reponse):
        basic.show_number(game.score())
    pass
basic.forever(on_forever)
# appui sur le buzzer
def on_pin_pressed_p0():
    global attente_reponse, id2
    if not (attente_reponse):
        radio.send_value(id2, 5)
        attente_reponse = True
        soundExpression.spring.play_until_done()
        #music.start_melody(music.built_in_melody(Melodies.PUNCHLINE), MelodyOptions.ONCE_IN_BACKGROUND)
        for i in range(2):
            animationCarre()
        pause(500)
        basic.show_number(game.score())
    else:
        music.start_melody(music.built_in_melody(Melodies.BA_DING), MelodyOptions.ONCE_IN_BACKGROUND)
input.on_pin_pressed(TouchPin.P0, on_pin_pressed_p0)

def animationCarre():
    basic.show_leds("""
        . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
    """)
    pause(25)
    basic.show_icon(IconNames.SMALL_SQUARE)
    pause(25)
    basic.show_icon(IconNames.SQUARE)
    pause(25)
# -----------DBEUT CONFIG DEVICE--------------
# lance la config (identifiant du device)

def on_button_pressed_ab():
    global id2, config
    if not (config):
        basic.show_string("Config ID")
        basic.show_string("A")
        id2 = "A"
        config = True
    else:
        config = False
        game.show_score()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_a():
    global id2
    if config:
        if id2 == "A":
            id2 = "D"
            basic.show_string(id2)
        elif id2 == "B":
            id2 = "A"
            basic.show_string(id2)
        elif id2 == "C":
            id2 = "B"
            basic.show_string(id2)
        elif id2 == "D":
            id2 = "C"
            basic.show_string(id2)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global id2
    if config:
        if id2 == "A":
            id2 = "B"
            basic.show_string(id2)
        elif id2 == "B":
            id2 = "C"
            basic.show_string(id2)
        elif id2 == "C":
            id2 = "D"
            basic.show_string(id2)
        elif id2 == "D":
            id2 = "A"
            basic.show_string(id2)
input.on_button_pressed(Button.B, on_button_pressed_b)

# -----------FIN CONFIG DEVICE----------------
# à la réception on va savoir si c'est juste ou pas 

def on_received_value(name, value):
    
    global attente_reponse,id2
    if (attente_reponse):
        if name == id2 and value == 1:
            game.add_score(1)
            music.start_melody(music.built_in_melody(Melodies.POWER_UP), MelodyOptions.ONCE_IN_BACKGROUND)
            basic.show_icon(IconNames.YES)
            attente_reponse=False
        elif name == id2 and value == 0:
            music.start_melody(music.built_in_melody(Melodies.WAWAWAWAA), MelodyOptions.ONCE_IN_BACKGROUND)
            basic.show_icon(IconNames.NO)
            attente_reponse=False
        elif name != id2 and value == 1:
            basic.show_icon(IconNames.NO)
            attente_reponse=False
        # si rien ne correspond on ne doit rien faire mais rester en attente

    elif name=="ALL" and value== 0:
        #c'est le reset
        game.set_score(0)
        attente_reponse=False
            
radio.on_received_value(on_received_value)

def on_logo_event_pressed():
    global attente_reponse
    attente_reponse=False
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_event_pressed)
