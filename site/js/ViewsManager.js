function ViewsManager(){
     this.$viewsCarousel = $('#views');

     //init carousel
     this.$viewsCarousel.slick({
          vertical: true,
          dots: false,
          arrows: false,
          infinite: false
     });
}

/**
 * Switch to camera view
 */
ViewsManager.prototype.cameraView = function(){
     this.$viewsCarousel.slick('slickGoTo', 0);
}

/**
 * Switch to results view
 */
ViewsManager.prototype.resultsView = function(){
     this.$viewsCarousel.slick('slickGoTo', 1);
}
