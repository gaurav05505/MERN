# Array and object 

## Array 
--> To store the data with the index and in js arr can store the mult data type like number , string , bool , arr it self , function , object , etc. 

```
[1,2,true,function(){} , {} , "gaurav" ]

```

---

## here we need to learn about - 
1. forEach 
2. map 
3. filter
4. find 
5. indexOf 

### fotEach 
Think of forEach as a loop that goes through the array and does a specific task for each element—like logging a name to the console or saving a user to a database. It doesn't care about creating a result; it just "does the work."


### map 
Think of map as a factory assembly line. Raw materials go in, they get changed, and a brand new product comes out at the end. In backend dev, you’ll use this constantly to format data (e.g., taking a database object and converting it to JSON).

### Filter 
filter usually returns a shorter array. (Input 5 items → Output 0 to 5 items). It changes the number of items.

### Find 
find also uses a "predicate" function (a test that returns true or false).

It returns the actual element (not an array) of the first item that passes the test.

It exits early: As soon as it finds a match, it stops looping. This is great for performance.

It returns undefined if nothing matches.

### indexof 
indexOf uses strict equality (===). It’s like saying, "Tell me exactly where this specific value is sitting."


---

## Object 
An Object is a built-in data structure in JavaScript used to store collections of data as Key-Value pairs.

Key: A unique identifier (a string or symbol) that acts as a label.
Value: The data associated with that label (can be a string, number, array, another object, or even a function).

