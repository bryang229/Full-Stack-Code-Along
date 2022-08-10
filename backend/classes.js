// Start here :)
// Below are predefined classes that we will be using to make our backend easier to use!
// All classes need some stuff added to it! (try to complete it in the below order)
// 1) Look at UserData's getUser() function
// 2) Look at both of the Classes NewUser and ExistingUser (extends what is that ?)
// 3) Look at Users' generateUsers function

class UserData {
    constructor(userJson,db) {
        this.username = userJson.username;
        this.email = userJson.email;
        this.password = userJson.password;
        this.firstName = userJson.firstName;
        this.lastName = userJson.lastName;
        this.age = userJson.age;
        this.dateRegistered = userJson.dateRegistered;
        this.picture = userJson.picture;
        this.db = db;
    }

    json() {
        return {
            "username": this.username,
            "email": this.email,
            "password": this.password,
            "firstName": this.firstName,
            "lastName": this.lastName,
            "age": this.age,
            "dateRegistered": this.dateRegistered,
            "picture": this.picture

        }
    }


    getUserRef() {
        //Get reference of user from DB (includes methods)
        let ref =this.db.collection("Users").doc(this.username);
        return ref;
    }

    getUser(){
        //TODO #1
        //We want to get a reference similar to the way we do it in getUserRef but we want use the 
        // .get() function (firestore built-in) on ref to get the data !

    }
}

class Users {
    constructor(db) {
        this.db = db;
        //Users as JSONs
        this.userData = [];
        //Users as user class
        this.userArray = [];
        //Amount of users in total
        this.usersAmount = 0;
        //Last user shown
        this.index = 0;
        //Function to load all our users from our DB
        this.loadUsers();
        
    }

    async loadUsers() {
        //Getting out Users collection
        let collectionRef = this.db.collection("Users");
        //Getting all the docs in our collection with a username property
        let collectionJson = await collectionRef.where("username", "!=", null).get();
        //Using Firestore builtin for loop on our data
        collectionJson.forEach(doc => {
            this.usersAmount++;  //Inc usersAmount
            doc = doc['_fieldsProto'] //Getting all the data out our doc
            //Using our userDataToJson function to get a JSON of our data
            let tempJson = userDataToJson(doc.username['stringValue'], doc.email['stringValue'], doc.password['stringValue'], doc.firstName['stringValue'],
                doc.lastName['stringValue'], doc.age['integerValue'], doc.dateRegistered['stringValue'], doc.picture['stringValue']);
            //Creating an ExistingUser Obj and updating our arrays
            let tempUser = new ExistingUser(tempJson);
            this.userArray.push(tempUser);
            this.userData.push(doc);
         });
    }


    async deleteUsers(amount) {
        //Getting "Users" collection reference 
        let collectionRef = this.db.collection("Users");
        let i = 0;  //Index variable
        for (let user of this.userArray) {
            //Only deleting the amount of users input
            if (++i < amount) {
                this.usersAmount--;
                await collectionRef.doc(user.username).delete()
                this.userArray.splice(0, 1);
                this.userData.splice(0, 1);
            }
        }
        return formatDBReturn({"amount" : i})
    }

    //Function for making users based off api input
    generateUsers(userData) {
        // TODO 3
        // You want a temp array to hold your users
        // For loop through the results of the userData (will be an array)
            // Create data json using userDataToJson()
            // Create a temp user of NewUser
            // Use the .setUser() function
            // Create a ExistingUser out of the NewUser
            // Push this ExistingUser.json() to our temp array
            // add data to our userArray (users class) and userData (jsons)
            // increment the usersAmount
        // Return the temp array using the formatDBReturn function:
        // formatDBReturn({"users" : tempArray} )
    }

    getUsers(amount){
        //Checking to see if we have enough users in our list (Keeping our last place in the list in mind!)
        let range = this.usersAmount - this.index;
        let intial = this.index;
        if(amount > range){
            return formatDBReturn("Error: Out of range");
        }

        let tempArr = []
        //Adding users into a temp array based off input and our position in array
        for(this.index ; this.index < intial + amount; this.index++){
            //returning a user from our userArray as a JSON
            tempArr.push(this.userArray[this.index].json());
        }

        //Making our index wrap around
        if(this.index >= this.usersAmount)
            this.index = 0;
        //returing our array of users (data)
        return formatDBReturn({
            "users" : tempArr
        });

    }

}

//Returns a formatted JSON useful for our express app!
function formatDBReturn(data){
    return {
        "results" : data
    }
}

//Function that allows us to get json out of info
function userDataToJson(username, email, password, firstName, lastName, age, dateRegistered, picture) {
    return {
        "username": username,
        "email": email,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "age": age,
        "dateRegistered": dateRegistered,
        "picture": picture

    }
}

// Class for handling our new users
// extends makes NewUser a subclass of UserData meaning it can use it's functions and more!
// Think of how all Lambos is a car but not all cars are Lambos
class NewUser extends UserData {
    constructor(userDataJson) {
        super(userDataJson)
        // super is the UserData class, class super() is the same as calling the constructor of UserData
    }
    // TODO 2a
    // Use the super key word to create a getUser and json function here!
    // Note: both getUser and json are predefined in UserData
    // These functions return data so calling
    // json(){}
    // getUser(){}
    
}

class ExistingUser extends UserData {
    constructor(userDataJson) {
        super(userDataJson)
    }
    // TODO 2b
    // Use the super key word to create a getUser and json function here!
    // Note: both getUser and json are predefined in UserData
    // These functions return data so calling
    // json(){}
    // getUser(){}
    // Create the setUser function, it will get a doc ref and use the .set() function
    // .set() expects a json!
    // setUser(){}
}


export {Users, formatDBReturn}    