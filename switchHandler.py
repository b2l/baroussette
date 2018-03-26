#!/usr/bin/env python

from time import sleep
import RPi.GPIO as GPIO

switchPin=16
thermostatPin=12

GPIO.setmode(GPIO.BOARD)
GPIO.setup(switchPin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(thermostatPin, GPIO.OUT)

def my_callback(channel):
    GPIO.output(thermostatPin, not GPIO.input(thermostatPin))

GPIO.add_event_detect(switchPin, GPIO.BOTH, callback=my_callback, bouncetime=300)

while True:
    pass
    