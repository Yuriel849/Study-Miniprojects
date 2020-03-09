package org.lejos.maneuver;

import lejos.hardware.motor.EV3LargeRegulatedMotor;
import lejos.hardware.port.MotorPort;
import lejos.robotics.RegulatedMotor;

import org.lejos.sensors.UltrasonicDetection;

public class SearchPattern {
	public static void main(String[] args) {
		boolean timer = false; // Set to true after 2 minutes
		
		RegulatedMotor right = new EV3LargeRegulatedMotor(MotorPort.B);
		RegulatedMotor left = new EV3LargeRegulatedMotor(MotorPort.C);
		RegulatedMotor[] synclist = { left }; // Put left in array to synchronize with right
		right.synchronizeWith(synclist); // Synchronize right and left (both wheel motors)
		
		right.startSynchronization();
		
		while(true) {
			goForward(right, left);

			// If object detected within 10 centimeters, turn left sixty degrees
			if(UltrasonicDetection.forwardDetect()) {
				goStop(right, left);
				right.rotate(60);
			}
			
			// After two minutes have passed, find and follow the green line
			if(timer) {
				break;
			}
		}
		
		
		goStop(right, left);
		
		right.endSynchronization();
		
		right.close();
		left.close();
	}
	
	private static void goForward(RegulatedMotor right, RegulatedMotor left) {
		right.setSpeed((int) right.getMaxSpeed());
		left.setSpeed((int) right.getMaxSpeed());

		right.forward();
		left.forward();
	}
	
	private static void goStop(RegulatedMotor right, RegulatedMotor left) {
		right.stop();
		left.stop();
	}
}