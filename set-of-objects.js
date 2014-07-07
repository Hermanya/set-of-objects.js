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
        return internalStructure.indexOf(object) !== -1
      },
      createIterator: function (){
        var index = 0;
        return {
          getNextValue: function (){
            if (index < internalStructure.length){
              var string = internalStructure[index++];
              return that.objectify(string, objectPrototype);
            }
          },
          hasNextValue: function (){
            return index < internalStructure.length;
          },
          getIndex: function (){
            return index;
          }
        };
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
