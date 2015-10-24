#pragma once

#include "ofMain.h"

class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		void keyPressed(int key);
		void keyReleased(int key);
		void mouseMoved(int x, int y );
		void mouseDragged(int x, int y, int button);
		void mousePressed(int x, int y, int button);
		void mouseReleased(int x, int y, int button);
		void windowResized(int w, int h);
		void dragEvent(ofDragInfo dragInfo);
		void gotMessage(ofMessage msg);
    
        class Particle{
        public:
            
            
            ofPoint pos;
            ofPoint vel;
            ofPoint acc;
            
            float size;
            float velReduction;
            
            Particle(){
                pos = ofPoint(ofRandom(-500,500),ofRandom(-500,500),ofRandom(-500,500));
                vel = ofPoint(ofRandom(-100,100),ofRandom(-100,100),ofRandom(-100,100));
                acc = ofPoint(0,10,0);
                velReduction = .99;
                size = ofRandom(50,100);
            }
            void update(){
                vel += acc;
                pos += vel;
                acc *= 0;
                vel*=velReduction;
            }
            
            void display(){
                

                ofPushStyle();
                ofRotateX(ofGetElapsedTimeMillis()*2/size);
                ofRotateY(ofGetElapsedTimeMillis()*2/size);
                ofPushMatrix();
                
                ofTranslate(pos);
                ofDrawBox(ofPoint::zero(), size);
                ofPopMatrix();
                ofPopStyle();
            }
        
            void applyAttraction( ofPoint _origin){
                acc = (_origin-pos)*0.001;
            }
            
        };
    
    vector<Particle> particles;
    
    ofEasyCam cam;
    
    int psize;
		
};
