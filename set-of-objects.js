SetOfObjects = function (){
  var _set = setOfObjects.create();
  if (this !== window){
    for (var key in _set){
      this[key] = _set[key];
    }
  }else{
    return _set;
  }
}
setOfObjects = {
  create: function (){
    var that = this,
    internalStructure = [],
    objectPrototype = null,
    api = {
      add: function (object){
        object = that.stringify(object);
        if (internalStructure.indexOf(object) === -1)
          internalStructure.push(object);
      },
      has: function (object){
        object = that.stringify(object);
        return internalStructure.indexOf(object) !== -1;
      },
      createIterator: function (){
        var _index = 0;
        var _api = {
          getNextValue: function (){
            if (_index < internalStructure.length){
              var string = internalStructure[_index++];
              return that.objectify(string, objectPrototype);
            }
          },
          hasNextValue: function (){
            return _index < internalStructure.length;
          },
          getIndex: function (){
            return _index;
          }
        };
        _api.next = _api.getNextValue;
        _api.hasNext = _api.hasNextValue;
        return _api;
      },
      remove: function (object){
        object = that.stringify(object);
        var index = internalStructure.indexOf(object);
        if (index !== -1)
          internalStructure.splice(index,1);
      },
      setPrototype: function (object){
        objectPrototype = object;
      },
      getLength: function (){
        return internalStructure.length;
      }
    }
    return api;
  },
  stringify: function (object){
    var keys = [], key, sortedObject = {};
    for (key in object) {
      if (object.hasOwnProperty(key) && typeof object[key] != 'function')
        keys.push(key);
    }
    keys.sort();
    for (var i = keys.length - 1; i < -1; i--){
      key = keys[i];
      sortedObject[key] = object[key];
    }
    return JSON.stringify(sortedObject);
  },
  objectify: function (string, maybePrototype){
    var object = Object.create(maybePrototype),
    properties = JSON.parse(string);
    for (var key in properties){
      object[key] = properties[key];
    }
    return object;
  }
};
