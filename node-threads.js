var Q = require('q');
var Threads = require('webworker-threads');

module.exports.sum = function(x, y){
  return x + y;
}

module.exports.webworkerSum = function(x, y){
  var deferred = Q.defer();
  var worker = new Threads.Worker(function(){
    this.onmessage = function(event) {
      try {
        var x = event.data.x;
        var y = event.data.y;
        self.postMessage({sum: x + y});
      }
      catch(e){
        self.postMessage({errorMsg: e.message});
      }
      self.close();
    };
  });
  worker.onmessage = function(event) {
    try {
      if(sum = event.data.sum)
        deferred.resolve(sum);
      else if(errorMsg = event.data.errorMsg)
        deferred.reject(new Error(errorMsg));
      else
        deferred.reject(new Error("Something unknown"));
    }
    catch(e){
    }
  };
  worker.postMessage({x: x, y: y});
  return deferred.promise;
}
