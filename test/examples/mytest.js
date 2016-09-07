'use strict'

var knex = require('../../config/db/knex');
const expect = require("chai").expect;
const config = require('../../lib/dbops/configs');

describe("#linearSearch", function(){

  it("can run the test query", function() {
    return config.getShowTest()
    .then(function(data){
      // console.log('SHOW TEST', data);
    })
    .catch(function(err){
      // console.log('ERR',err);
    });
  });
});









/*
const positiveArr = [1,2,3,4,5,6];
const negativeArr = [-5,-4,-3,-2,-1];
const decimalArr = [1.1,2.4,5.5,5.6,5.7];

describe("#linearSearch", function(){

  it("does not use indexOf", function() {
    expect(lib.linearSearch.toString()).to.not.contain('indexOf');
  });

  it("finds items in an array of positive numbers", function(){
    expect(lib.linearSearch(positiveArr, 3)).to.equal(2);
  });

  it("finds items in an array of negative numbers", function(){
    expect(lib.linearSearch(negativeArr, -2)).to.equal(3);
  });

  it("finds items in an array of non-integers", function(){
    expect(lib.linearSearch(decimalArr, 1.1)).to.equal(0);
  });

  it("returns -1 when the item is not found", function(){
    expect(lib.linearSearch(decimalArr, 0)).to.equal(-1);
  });

});

describe("binarySearch", () => {

  it("finds items in an array of positive numbers", function(){
    expect(lib.binarySearch(positiveArr,3)).to.equal(2);
  });

it("finds items in an array of negative numbers", function(){
  expect(lib.binarySearch(negativeArr, -2)).to.equal(3);
});

it("finds items in an array of non-integers", function(){
  expect(lib.binarySearch(decimalArr, 1.1)).to.equal(0);
});

it("returns -1 when the item is not found", function(){
  expect(lib.binarySearch(decimalArr, 0)).to.equal(-1);
});

function checkForLoops(methodName) {
  return () => {
    const definition = lib[methodName].toString();

    const loopMessage = "You appear to be using loops / builtin methods instead of recursion";
    expect(definition, loopMessage).to.not.match(/for|indexOf|while|do|\.forEach|\.map/)
  }
}

it("returns the index of the element in the array via binary search", () => {
  expect(lib.binarySearch([], 'a')).to.deep.equal(-1)
expect(lib.binarySearch(['a'], 'a')).to.deep.equal(0)
expect(lib.binarySearch(['a','b'], 'b')).to.deep.equal(1)
expect(lib.binarySearch(['a','b','c'], 'a')).to.deep.equal(0)
expect(lib.binarySearch(['a','b','c'], 'b')).to.deep.equal(1)
expect(lib.binarySearch(['a','b','c'], 'c')).to.deep.equal(2)
expect(lib.binarySearch(['a','b','c'], '0')).to.deep.equal(-1)
expect(lib.binarySearch(['a','b','c'], 'd')).to.deep.equal(-1)
})


})

})
*/



//
//
// const lib = require('../../lib/dbops/configs')
