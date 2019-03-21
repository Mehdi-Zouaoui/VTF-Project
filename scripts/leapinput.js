const LEAP = {
    position: {
        x: 0,
        y: 0,
        centerPosition: 0,
        radius: 0,
    },
    connected: false,
    gesture_done: false,
    nb_circles : 0,
    swipe : false,
    keyTap : false
};

const controller = new Leap.Controller({
    enableGestures: true
});
controller.connect();

controller.on('deviceStreaming', function () {
    LEAP.connected = true;
    console.log(' ✔ Leap Motion is connected ');
});

controller.on('deviceStreaming', function () {
    LEAP.connected = true;
    console.log(' ❌ Leap Motion is disconnected ');
});

controller.on('frame', function (frame) {
    LEAP.connected = true;
    let hand = frame.hands[0];
    if (!hand) return;

    const palm = get2dCoords(hand.stabilizedPalmPosition, frame);
    LEAP.position.x = palm.x;
    LEAP.position.y = palm.y;

    frame.gestures.forEach(function (gesture) {
        switch (gesture.type) {
        
            case "circle":
                let circleProgress = gesture.progress;
                let completeCircles = Math.floor(circleProgress);
                LEAP.nb_circles = completeCircles;
                LEAP.position.radius = gesture.radius;
                break;
            case "keyTap":
              
                LEAP.keyTap = true;
                break;
            /*case "screenTap":
                console.log("Screen Tap Gesture");
                break;*/
            case "swipe":
            let state = gesture.state; 
                if(state == 'stop'){
                LEAP.swipe = true; 
                }
                break;
            default :
                
        }
        
        
    });
});

function get2dCoords(leapPosition, frame) {
    const interactionBox = frame.interactionBox;
    const normalizedPoint = interactionBox.normalizePoint(leapPosition, true);

    return {
        x: normalizedPoint[0] * window.innerWidth,
        y: (1 - normalizedPoint[1]) * window.innerHeight,
    }
}