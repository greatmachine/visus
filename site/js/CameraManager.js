function CameraManager(ViewsManager){
     this.ViewsManager = ViewsManager;

     this.$videoElement = document.querySelector("#inputVideo");
     this.$faceBoxOverlay = document.querySelector("#faceBox");
     this.faceBoxOverlayContext = this.$faceBoxOverlay.getContext('2d');
     this.$image = document.querySelector('#theImage');
     this.$videoCanvas = document.querySelector('#theVideoCanvas');
     this.videoCanvasContext = this.$videoCanvas.getContext('2d');

     this.init();
}

/**
 * Init camera and event listeners
 */
CameraManager.prototype.init = function(){
     var self = this;

     FaceDetection();
     this._initCamera();

     /**
      * Setup events
      */
     $('#button').on('click', function(){
          self.takePhoto();
     });

     /**
      * Setup other things
      */
      $.busyLoadSetup({ animation: "slide", background: "rgba(255, 152, 0, 0.86)" });
}

/**
 * Init camera
 */
CameraManager.prototype._initCamera = function(){
     var self = this;
     if(navigator.mediaDevices.getUserMedia){
          navigator.mediaDevices.getUserMedia({video: true}).then(function(stream){
               self.$videoElement.srcObject = stream;
               console.log("Webcam started.");
          }).catch(function(err){
               console.log(`Unable to start webcam: ${err}`);
          });
     }
}

/**
 * Take photo
 */
CameraManager.prototype.takePhoto = function(){
     var self = this;

     async.waterfall([_showLoader, _takePhoto, _sendToBackend, _hideLoader], function(){

     });

     /**
      * Display loader (https://github.com/piccard21/busy-load)
      */
     function _showLoader(_cb){
          $.busyLoadFull('show');
          return(_cb(false));
     }

     /**
      * Do photo stuff
      */
     function _takePhoto(_cb){
          console.log("TAKING A PHOTO");
          self.ViewsManager.resultsView();
          return(_cb(false));
     }

     /**
      * Send to backend
      */
     function _sendToBackend(_cb){

     }

     /**
      * Hide loader
      */
     function _hideLoader(_cb){
          $.busyLoadFull('hide');
          return(_cb(false));
     }

}
