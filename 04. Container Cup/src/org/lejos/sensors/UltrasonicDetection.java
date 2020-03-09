package org.lejos.sensors;

import lejos.hardware.ev3.LocalEV3;
import lejos.hardware.port.Port;
import lejos.hardware.sensor.EV3UltrasonicSensor;
import lejos.hardware.sensor.SensorModes;
import lejos.robotics.SampleProvider;

public class UltrasonicDetection {
	// Get a port instance
	static Port port = LocalEV3.get().getPort("S2");

	// Get an instance of the Ultrasonic EV3 sensor
	static SensorModes sensor = new EV3UltrasonicSensor(port);

	// Get an instance of "sensor" in measurement mode
	static SampleProvider distance= sensor.getMode("Distance");

	// Initialize an array of floats for fetching samples.
	static float[] samples = new float[10];
	
	public static boolean forwardDetect() {
		while(true) {
			distance.fetchSample(samples, 0);
			if(samples[0] <= 0.1) {
				return true;
			}
		}
	}
}