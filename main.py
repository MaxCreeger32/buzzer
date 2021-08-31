"""

démarrage

"""
config = False
id2 = ""
game.set_score(0)
game.show_score()
radio.set_group(1)
id2 = "A"
music.set_built_in_speaker_enabled(True)
music.set_volume(255)
attente_reponse = False

def on_forever():
    game.show_score()
    pass
basic.forever(on_forever)
# appui sur le buzzer
def on_pin_pressed_p0():
    global attente_reponse, id2
    if not (attente_reponse):
        radio.send_value(id2, 1)
        attente_reponse = True
        music.start_melody(music.built_in_melody(Melodies.BA_DING), MelodyOptions.ONCE)
        for i in range(6):
            animationCarre()
        pause(5000)
        game.show_score()
        basic.show_number(game.score())
input.on_pin_pressed(TouchPin.P0, on_pin_pressed_p0)

def animationCarre():
    basic.show_leds("""
        . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
    """)
    pause(50)
    basic.show_icon(IconNames.SMALL_SQUARE)
    pause(50)
    basic.show_icon(IconNames.SQUARE)
    pause(50)
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
    if (attente_reponse):
        if name == id2 and value == 1:
            game.add_score(1)
            music.start_melody(music.built_in_melody(Melodies.POWER_UP), 120)
        elif name == id2 and value == 0:
            music.start_melody(music.built_in_melody(Melodies.POWER_DOWN), 120)
        game.show_score()
radio.on_received_value(on_received_value)
