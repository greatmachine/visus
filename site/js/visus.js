$(document).ready(function(){

     var viewsManager = new ViewsManager();
     var cameraManager = new CameraManager(viewsManager);

     /**
      * Init webcam
      */

     var initWebcam = function(){
          if(navigator.mediaDevices.getUserMedia){
               navigator.mediaDevices.getUserMedia({video: true}).then(function(stream){
                    video.srcObject = stream;
                    console.log("Webcam started.");
               }).catch(function(err){
                    console.log(`Unable to start webcam: ${err}`);
               });
          }
     }
     //initWebcam();

$('#button').on('click', function(){
     $('#view-camera').removeClass('screen-active');
     $('#view-results').addClass('screen-active');

});

     var oldKnobValue = 1;

     $resultsCarousel = $('#view-results .results');

     $resultsCarousel.on('init', function(event, slick){
          initResultsKnob(slick.slideCount);
     });

     $resultsCarousel.slick({
          vertical: true,
          dots: false,
          arrows: false,
          infinite: true
     });

     function initResultsKnob(numSlides){
          numSlides = numSlides;
          $(".dial").knob({
               displayInput: true,
               min: 0,
               max: 10,
               change: function(v){
                    var newKnobValue = Math.round(v);
                    if(newKnobValue > oldKnobValue){
                         $resultsCarousel.slick('slickNext');
                    } else if(newKnobValue < oldKnobValue) {
                         $resultsCarousel.slick('slickPrev');
                    }
                    oldKnobValue = newKnobValue;
               }
          });
     }

});
