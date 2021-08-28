def on_button_pressed_a():
    global id2
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

def on_button_pressed_ab():
    global id2, config
    if config:
        basic.show_string("A")
        id2 = "A"
        config = True
    else:
        config = False
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global id2
    if id2 == "A":
        id2 = "B"
        basic.show_string(id2)
    elif id2 == " B":
        id2 = "C"
        basic.show_string(id2)
    elif id2 == "C":
        id2 = "D"
        basic.show_string(id2)
    elif id2 == "D":
        id2 = "A"
        basic.show_string(id2)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    if name == "A" and value == 1:
        basic.show_icon(IconNames.YES)
    elif name == "B" and value == 0:
        basic.show_icon(IconNames.NO)
    else:
        basic.show_icon(IconNames.ASLEEP)
radio.on_received_value(on_received_value)

config = False
id2 = ""
basic.show_icon(IconNames.HAPPY)
radio.set_group(1)
id2 = "A"

def on_forever():
    pass
basic.forever(on_forever)

def on_pin_pressed_p0():
    radio.send_value(id2, 1)
input.on_pin_pressed(TouchPin.P0, on_pin_pressed_p0)
