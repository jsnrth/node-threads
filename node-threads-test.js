var TnP = require('./threads-and-promises');

module.exports.testSumsTwoNumbers = function(test){
  test.expect(1);
  test.equal(TnP.sum(3, 4), 7);
  test.done();
}

module.exports.testPromisesASumWithWebworkers = function(test){
  test.expect(1);
  TnP.webworkerSum(3, 4).then(function(sum){
    test.equal(sum, 7);
    test.done();
  }).catch(function(e){
    console.error(e);
    test.done(e);
  });
}
