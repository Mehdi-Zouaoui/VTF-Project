const LEAP = {
    position : {
        x : 0,
        y : 0,
        centerPosition : 0,
        radius : 0,
                },
    connected : false,
    gesture_done : false,
    
};

const controller = new Leap.Controller({enableGestures: true}   );
controller.connect();

controller.on('deviceStreaming', function(){
    LEAP.connected = true;
    console.log(' ✔ Leap Motion is connected ');
});

controller.on('deviceStreaming', function(){
    LEAP.connected = true;
    console.log(' ❌ Leap Motion is disconnected ');
});
  
controller.on('frame' , function(frame){
    let hand = frame.hands[0];
    if(!hand)return;

    const palm = get2dCoords(hand.stabilizedPalmPosition , frame);
    LEAP.position.x = palm.x;
    LEAP.position.y = palm.y;


    frame.gestures.forEach(function(gesture) {
      
        switch (gesture.type){
            case "circle":
                let  circleProgress = gesture.progress;
                let completeCircles = Math.floor(circleProgress);
                console.log(completeCircles);
                let circle = renderCircle(gesture);
                LEAP.position.radius = circle.radius;
                LEAP.gesture_done = true;
                break;
            case "keyTap":
                console.log("Key Tap Gesture");

                break;
            case "screenTap":
                console.log("Screen Tap Gesture");
                break;
            case "swipe":
                console.log("Swipe Gesture");
                break;
        
          
    }

    });
});


function get2dCoords(leapPosition, frame) {
    const interactionBox  = frame.interactionBox;
    const normalizedPoint = interactionBox.normalizePoint(leapPosition, true);

    return {
        x : normalizedPoint[0] * window.innerWidth,
        y : (1 - normalizedPoint[1]) * window.innerHeight,
    }
}
function renderCircle(gesture ) {
    const radius = gesture.radius;
   
    //console.log("Circle");

    return {
        radius : radius,
     
}
}
