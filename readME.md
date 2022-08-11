# Full Stack OOP Playground Docs

This code along comes with a few predefined classes so here's a description of each class and how their functions work!

## `/backend`

### `/classes.js`

- UserData
  - This is a class that expects two inputs, a json of all the data (`userJson`) and the actual database reference (`db`) : `new UserData(json,db)`
  - `UserData.json()`
    - This function returns the data in `UserData` as a formatted json
  - `UserData.getUserRef()`
    - This function returns a reference of the user doc in our db (assuming it exists!) which means you can still use `.set()` `.get()` and other firestore functions
  - `UserData.getUser()`
    - This function returns a json of the actual user data from our database!
- NewUser 
  - This is a sub class of `UserData` meaning it can uses the functions of UserData and it can have extra properties! Just like how all vehicles have the same baseline stuff that goes to a car like engines, tires, etc.. but different vehicles have different features like a sunroof.
    - The following functions are taken directly from `UserData`
      - `new NewUser(json,db)`
      - `NewUser.json()`
      - `NewUser.getUser()`
  - `NewUser.setUser()` 
    - This function sends the data of the `NewUser` object to the database

- `ExistingUser`
  - This class works the same as `UserData`

- `userDataToJson(...)`
  - This function takes in the following parameters:
    - Username
    - Email
    - Password
    - First name
    - Last name
    - Age
    - Date Registered
    - Picture
- Returns a json with the data formatted

- `formatDBReturn(data)`
  - This function takes in data and formats the response as a json with a key of results and value of data
 
- `Users`
  - This is a class that controls the data flow of our users! It keeps track of where in the array of users you last left off (When getting data).
  - `new Users()`
    - Takes in single parameter of `db` (the database refernce)
  - `Users.loadUsers()`
    - An asynchronous function that gets all the docs that include a username field and adds them to our `userData` array as a json and `userArray` as an `ExistingUser`
  - `Users.deleteUsers()`
    - An asynchronous functino that takes in a parameter of `amount` and deletes that amount of users from our database. NOTE: This function does make sure that the amount request is within the range of the array (with your postion in the list in mind)
  - `Users.generateUsers()`
    - This function has a single parameter of `userData` which will be the an array containing all of the users (assuming the api in use is https://randomuser.me)
    - This function will use the `NewUser` class to `.setUser()` and then will add the `.json()` of this `NewUser` to the `Users.userData` array and add the `NewUser` to the `Users.userArray` array
    - Loop through the `userData` array and add this data to a temp array that you will later return
    - It will also return formatted response (using `formatDBReturn`)
        - You must return a json with the key of users and the value of the temp array created!
    - `Users.getUsers()`
      - Takes single parameter of `amount` and loops through the `Users.userArray` using the `.json()` function and returns a json with key of users and value of an array with all the users (the length is the amount given) NOTE: This function keeps track of your position in the array
      
 ## `/lib/js/component.js`

- `Component`
  - `new Component()` expects the following parameters:
    - `rootElement` 
      - Either the id of an existing element 
      - Or the id of a new element
    - `tag`
      - The tag of the element
    - `isNew`
      - `true` or `false` of whether is a new element or not
    - `parentIfNew` 
      - The id of an existing element to add the new element **only needed for new elements, can put null if existing compoment**
    - `isShowing`
      - Default of `true`, variable that takes care of hiding and showing the component
  - `Component.createNewComponet()`
    - Only for use inside the class however takes in the parent id and the id of the new component and creates the element and adds it to dom (if `isShowing == true`)
  - `Component.hide()`
    - Removes the element from the DOM
  - `Component.show()`
    - Adds the element to the DOM
  - `addText()`
    - Takes in parameters:
      - `text` :   string
      - `clearText` : boolean
    - Adds text to the element, replaces `clearText == true` otherwise it appends it!
  - You can access the DOM object of the parent through
    - `Component.parentElement` 
  - You can acces the DOM object of the actual element through
    - `Componet.rootElement`