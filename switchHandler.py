from time import sleep
import RPi.GPIO as GPIO

switchPin=4
thermostatPin=1

GPIO.setmode(GPIO.BOARD)
GPIO.setup(switchPin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

def my_callback(channel):
    val = !GPIO.input(thermostatPin)
    GPIO.write(thermostatPin, val)

GPIO.add_event_detect(switchPinpin, GPIO.RISING, callback=my_callback, bouncetime=300)
