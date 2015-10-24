#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    ofBackground(0);
    psize = 10;
    for(int i = 0;i<psize;i++){
        particles.push_back(Particle());
    }
}

//--------------------------------------------------------------
void ofApp::update(){
    for (int p = 0; p < particles.size(); p++) {
        particles[p].applyAttraction(ofPoint(0,0,0));
        particles[p].update();
    }   

}

//--------------------------------------------------------------
void ofApp::draw(){
    cam.begin();
    ofNoFill();
    for (int p = 0; p < particles.size(); p++) {
        particles[p].display();
    }
    cam.end();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    for (int p = 0; p < particles.size(); p++) {
        particles[p].vel*=2;
    }
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
