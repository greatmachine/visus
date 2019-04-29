$(document).ready(function(){

     var viewsManager = new ViewsManager();
     //var cameraManager = new CameraManager(viewsManager);
     var resultsManager = new ResultsManager();


     var oldKnobValue = 1;

     $resultsCarousel = $('#view-results .results');

     $resultsCarousel.on('init', function(event, slick){
          initResultsKnob(slick.slideCount);
     });

     $resultsCarousel.slick({
          vertical: true,
          dots: false,
          arrows: false,
          initialSlide: 1,
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
