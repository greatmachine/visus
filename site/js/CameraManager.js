function CameraManager(ViewsManager){
     this.ViewsManager = ViewsManager;
     this.$video = document.getElementById('video');
     this.tracker = new tracking.ObjectTracker('face');

     this.init();
}

/**
 * Init camera and event listeners
 */
CameraManager.prototype.init = function(){
     var self = this;

     //init face tracking
     this._initCameraAndFaceTracking();

     //setup loader animation
     $.busyLoadSetup({ animation: "slide", background: "rgba(255, 152, 0, 0.86)" });

     //setup events
     $('#button').on('click', function(){
          self.takePhoto();
     });

}

/**
 * Init camera and face tracking (via trackerjs)
 */
CameraManager.prototype._initCameraAndFaceTracking = function(){
     this.tracker.setInitialScale(4);
     this.tracker.setStepSize(2);
     this.tracker.setEdgesDensity(0.1);
     this.faceTracking = tracking.track(this.$video, this.tracker, { camera: true });
     this.tracker.on('track', function(event) {
          $('#outlines').empty();
          for(var i = 0; i < event.data.length; i++){
               $div = $('<div/>');
               $div.attr('class', 'outline');
               $div.css('top', event.data[i].y + 'px');
               $div.css('left', event.data[i].x + 'px');
               $div.css('width', event.data[i].width + 'px');
               $div.css('height', event.data[i].height + 'px');
               $('#outlines').append($div);
          }
     });
}

/**
 * Take photo
 */
CameraManager.prototype.takePhoto = function(){
     var self = this;

     async.waterfall([_takePhoto, _showLoader, _sendToBackend, _hideLoader], function(){

     });

     /**
      * Do photo stuff
      */
     function _takePhoto(_cb){
          self.faceTracking.stop();
          self.$video.pause();
          //self.$video.srcObject.getVideoTracks()[0].pause();
          console.log("TAKING A PHOTO");
          self.ViewsManager.resultsView();
          return(_cb(false));
     }

     /**
      * Display loader (https://github.com/piccard21/busy-load)
      */
     function _showLoader(_cb){
          //$.busyLoadFull('show');
          return(_cb(false));
     }

     /**
      * Send to backend
      */
     function _sendToBackend(_cb){
          return(_cb(false));

     }

     /**
      * Hide loader
      */
     function _hideLoader(_cb){
          //$.busyLoadFull('hide');
          return(_cb(false));
     }

}
