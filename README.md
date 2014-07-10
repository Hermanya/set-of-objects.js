set-of-objects.js
=================
```
$ bower install set-of-objects.js --save
```
Set of objects per se in JavaScript
```
var mySet = new SetOfObjects();

```
You can invoke
  * `add`
  * `remove` by clone object, *not by index*
  * `has`
  * `getIterator`
    * `hasNextValue` or `hasNext`
    * `getNextValue` or `next`
    * `getIndex`
  * `getLength`
  * `setPrototype` of objects in the set , `null` by defult
