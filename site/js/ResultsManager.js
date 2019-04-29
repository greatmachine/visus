function ResultsManager(ViewsManager){
     this.ViewsManager = ViewsManager;

     this.init();
}

/**
 * Init results accordion and sliders
 */
ResultsManager.prototype.init = function(){
     var self = this
     this._initCarousels();
     // $face = $('#view-results .results');
     //
     // $resultsCarousel.on('init', function(event, slick){
     //      initResultsKnob(slick.slideCount);
     // });
     //
     // $resultsCarousel.slick({
     //      vertical: true,
     //      dots: false,
     //      arrows: false,
     //      initialSlide: 1,
     //      infinite: true
     // });

     $('.accordion-item .provider').on('click', function(e){
  // e.preventDefault();
console.log("CLICK");
          if($(this).parent().hasClass('active')){
               $(this).parent().find('.active').removeClass('active');
               $(this).parent().find('.collapsed').removeClass('collapsed');

          } else {
               $(this).parent().parent().find('.active').removeClass('active');
               $(this).parent().removeClass('collapsed').addClass('active');
               $(this).parent().siblings().addClass('collapsed');
          }
          self._reinitCarousels();
     });

}

ResultsManager.prototype._initCarousels = function(){
     var self = this;
     this.husani = [];
     var faceCarousels = $('.accordion-item .details .faces');
     faceCarousels.each(function(){
          var carousel = $(this).slick({
               dots: false,
               arrows: true,
               infinite: false,
               prevArrow: $(this).siblings('.pagination').children('.prev'),
               nextArrow: $(this).siblings('.pagination').children('.next')
          });
          self.husani.push(carousel);
     });
     console.log(this.husani);
}

ResultsManager.prototype._reinitCarousels = function(){
     for(var i = 0; i < this.husani.length; i++){
          this.husani[i].slick('unslick');
     }
//      var faceCarousels = $('.result.slick-slide .accordion-item .details .faces.slick-initialized');
//      faceCarousels.each(function(){
// console.log($(this).attr('class'));
//           if(!$(this).hasClass('slick-cloned')){
//
//                // console.log($(this));
//                // console.log("REINIT");
//                // $(this).slick('resize');
//           } else {
//                // console.log("NO");
//           }
//      });
}
