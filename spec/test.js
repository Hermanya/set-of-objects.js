/* global describe, it */

(function () {
  'use strict';
  describe('Set of objects.', function () {
    var mySet;
    describe('Create', function () {
      it('should create an empty set', function () {
        mySet = setOfObjects.create();
        assert.notEqual('undefined', typeof mySet);
      });
    });
    describe('Add', function () {
      it('should add new objects', function () {
        mySet.add({key: 'value', anotherKey: 1});
        assert.equal(1, mySet.getLength());
      });
      it('should not add repeating objects', function () {
        mySet.add({anotherKey: 1, key: 'value'});
        assert.equal(1, mySet.getLength());
      });
    });
    describe('Get', function () {
      var myIterator;
      it('should create an iterator', function () {
        myIterator = mySet.createIterator();
        assert.notEqual('undefined', typeof myIterator);
      });
      it('should iterate over objects in the set', function () {
        var values = [];
        while (myIterator.hasNextValue()){
          values.push(myIterator.getNextValue());
        }
        assert.equal(values.length, mySet.getLength());
      });
    });
    describe('Remove', function () {
      it('should remove an object from the set', function () {
        var object = {key: 'value', anotherKey: 1};
        assert.equal(true, mySet.has(object));
        mySet.remove(object);
        assert.equal(false, mySet.has(object));
      });
    });
  });
})();
