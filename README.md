# B13-Assignment-05

## 1️⃣ What is the difference between var, let, and const?

var, let, and const are used to declare variables in JavaScript.

**Var**:

- var is the older way to declare variables.
- var is hoisted.
- redeclare with same name by var.
- reassigned allowed by var.
- var maintain only function scope.

**Let**:

- let is the modern way to declare variables.
- let is hoisted but in temporal dead zone.
- can not redeclare with same name by let.
- reassigned allowed by let.
- let maintain all scope (function, block, global).

**Const**:

- const is used for variables whose value should not change.
- const is also hoisted but in temporal dead zone.
- can not redeclare with same name by const.
- reassigned not allowed by const.
- const maintain all scope (function, block, global).


## 2️⃣ What is the spread operator (...)?

- The spread operator (...) is used to expand or spread the elements of an array or object. 
- It helps work with arrays and objects more easily. With the spread operator, copying or combining data becomes simpler and cleaner.

## 3️⃣ What is the difference between map(), filter(), and forEach()?

These three methods are commonly used to work with arrays.

**map()**

- map() is used when we want to perform an operation on every element of an array and create a new array with the modified values.

**filter()**

- filter() is used to select specific elements from an array based on a condition.
- It returns a new array that contains only the elements that match the condition.

**forEach()**

- forEach() runs a function on every element of an array, but it does not return a new array.
- It is usually used when we just want to perform an action for each element.

## 4️⃣ What is an arrow function?

- An arrow function is a shorter and more modern way to write functions in JavaScript. 
- It helps make the code cleaner and easier to read. Arrow functions are widely used in modern JavaScript development.

## 5️⃣ What are template literals?

- Template literals are a way to create strings in JavaScript using backticks instead of single or double quotes. 
- They allow to easily include variables or expressions inside a string, which makes writing strings more flexible and readable and also helps to create dynamic strings in JavaScript.