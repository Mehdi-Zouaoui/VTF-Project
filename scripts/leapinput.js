const LEAP = {
    position : {
        x : 0,
        y : 0
                },
    connected : false,
};

const controller = new Leap.Controller();
controller.connect();

controller.on('deviceStreaming', function(){
    LEAP.connected = true;
    console.log(' ✔ Leap Motion is connected ');
});

controller.on('deviceStreaming', function(){
    LEAP.connected = true;
    console.log(' ❌Leap Motion is disconnected ');
});
controller.on('CircleGesture' , function(){
    if(gesture.type = "circle"){
        console.log('circle');
    }
})
controller.on('frame' , function(frame){
    let hand = frame.hands[0];
    if(!hand)return;

    const palm = get2dCoords(hand.stabilizedPalmPosition , frame);
    LEAP.position.x = palm.x;
    LEAP.position.y = palm.y;
});

function get2dCoords(leapPosition, frame) {
    const interactionBox  = frame.interactionBox;
    const normalizedPoint = interactionBox.normalizePoint(leapPosition, true);

    return {
        x : normalizedPoint[0] * window.innerWidth,
        y : (1 - normalizedPoint[1]) * window.innerHeight,
    }
}
