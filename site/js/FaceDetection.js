//var output = document.querySelector("#output");
var video = document.querySelector("#inputVideo");
var faceBoxOverlay = document.querySelector("#faceBox");
var faceBoxOverlayContext = faceBoxOverlay.getContext('2d');
var image = document.querySelector('#theImage');
var videoCanvas = document.querySelector('#theVideoCanvas');
var videoCanvasContext = videoCanvas.getContext('2d');

/**
 * Start Emotihue system
 */
var FaceDetection = async function(){
     //load the AI models
     await faceapi.loadTinyFaceDetectorModel('/models')
     await faceapi.loadFaceLandmarkTinyModel('/models')

     //start converting video to canvas and detecting faces on video play event
     video.addEventListener('play', detectFace);

     // //create a throttled function to send stills to AWS...
     // var throttled = _.throttle(getEmotionAndChangeLight, 1000, {leading: false, trailing: false});
     // //and trigger the throttled function on image load
     // image.addEventListener('load', throttled);
     //
     //initialize webcam
//     initWebcam();
}

/**
 * Detect face in webcam video
 */
var detectFace = async function(){
     var options = new faceapi.TinyFaceDetectorOptions({inputSize: 256, scoreThreshold: 0.3});

     //detect face(s)
     var detections = await faceapi.detectSingleFace(video, options);
     if(typeof detections != "undefined"){
          //resize detected boxes to account for video size
          var detectionsForSize = faceapi.resizeResults(detections, {width: video.offsetWidth, height: video.offsetHeight});
          //resize canvas
          faceBoxOverlay.width = video.offsetWidth
          faceBoxOverlay.height = video.offsetHeight
          //draw face overlay
          faceapi.drawDetection(faceBoxOverlay, detectionsForSize, { withScore: true });
          //set output
          //output.className = "face-detected";
          //and convert the video to canvas and image data
          convertVideoToCanvas();
     } else {
          //there's no face detected, so clear the overlay
          faceBoxOverlayContext.clearRect(0, 0, faceBoxOverlay.width, faceBoxOverlay.height);
          //set the output
          //output.className = "no-face-detected";
          //and set the canvas/image to no face
          triggerNoFace();
     }

     //loop
     setTimeout(detectFace);
}

/**
 * Convert webcam video to canvas in realtime
 */
var convertVideoToCanvas = function(){
     //clear the canvas
     videoCanvasContext.clearRect(0, 0, videoCanvas.width, videoCanvas.height);

     //draw current video frame on canvas
     videoCanvasContext.drawImage(video, 0, 0);

     //convert canvas to png
     var imageData = videoCanvas.toDataURL("image/png");

     //set image object to png
     image.src = imageData;

     //note that there's a face
     image.setAttribute('data-face-detected', true);
}

/**
 * Set up NO FACE DETECTED in output and canvas/image
 */
var triggerNoFace = function(){
     //if(image.getAttribute('data-face-detected') == "true"){
          videoCanvasContext.clearRect(0, 0, videoCanvas.width, videoCanvas.height);
          image.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
          image.setAttribute('data-face-detected', false);
     //}
}
