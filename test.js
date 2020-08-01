var startTime = performance.now();
var endTime;
console.log("start: "+startTime);
VideoToFrames.getFrames('v1.mp4', 30, VideoToFramesMethod.totalFrames).then(function (frames) {
    endTime = performance.now();
    frames.forEach(function (frame) {
        var canvas = document.createElement('canvas');
        canvas.width = frame.width;
        canvas.height = frame.height;
        canvas.getContext('2d').putImageData(frame, 0, 0);
        var image=new Image();
        image.style.display="block";
        //console.log(canvas.toDataURL());
        image.src=canvas.toDataURL("image/png",0.5);
        //canvas.baseURI();
        textDetect(image.src);
        document.getElementsByTagName('body')[0].appendChild(image);
        //document.getElementsByTagName('body')[0].appendChild(canvas);
    });
    endTime=performance.now();
    console.log("end: "+endTime);
    console.log(endTime - startTime);
});
//# sourceMappingURL=test.js.map
//sk_bf1181c3d9a8437b02f16672
function textDetect(source){
    console.log("in textDetect");
    var secret_key = "sk_bf1181c3d9a8437b02f16672";
    var url = "https://api.openalpr.com/v3/recognize_bytes?recognize_vehicle=1&country=us&secret_key=" + secret_key;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    // Send POST data and display response
    xhr.send(source);  // Replace with base64 string of an actual image
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            document.getElementById("response").innerHTML = xhr.responseText;
        } else {
            document.getElementById("response").innerHTML = "Waiting on response...";
        }
    }
    
    //console.log(xhr);

}