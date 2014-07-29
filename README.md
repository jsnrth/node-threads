node-threads
============

Playing around with node threads... they seem hacky...

This implementation seems strange. Why is it optimized for loading and evaling
script files?

Why can't I just pass in a closure and have that "just work"?

Basically, I want to do something like this:

```javascript
var Q = require('q');
var Threads = require('webworker-threads');

function doSomething(data){
  // something expensive with data...
  return data;
}

function doSomethingInAnotherThread(data){
  var deferred = Q.defer();
  var worker = new Threads.Worker(function(){
    this.onmessage = function(event){
      var value = doSomething(event.data);
      postMessge(value);
      self.close();
    };
  });
  worker.onmessage = function(event){
    deferred.resolve(event.data);
  }
  worker.postMessage(data);
  return deferred.promise;
}

doSomethingInAnotherThread(data)
  .then(function(newData){
    console.log('new data', newData);
  });
```

That doesn't work though. `doSomething` is not actually available within the
closure I pass into the worker. The API seems to focus on loading and
evaling scripts into the worker, but that feels pretty hacky and I'm not sure
how I would structure code that way -- it seems non-conforming to the way I would
normally write node modules.
