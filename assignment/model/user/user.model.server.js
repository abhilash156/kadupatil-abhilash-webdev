var mongoose = require("mongoose");
var userSchema = require("user.schema.server");
mongoose.Promise = require("q").Promise;

var userModel = mongoose.model("UserModel", userSchema);

function createUser(user) {
    userModel.create(user, function (error, doc) {
        if (error) {
            return null;
        } else {
            return doc;
        }
    });
}

function findAllUsers() {
    return userModel.find(function (error, documents) {
        if (error) {
            return null;
        } else {
            return documents;
        }
    });
}

function findUserById(userId) {

    return userModel.findById(userId, function (error, documents) {
        if (error) {
            return null;
        } else {
            return documents;
        }
    });
}

function findUserByUsername(username) {

    return userModel.findOne({"username": username}, function (error, documents) {
        if (error) {
            return null;
        } else {
            return documents;
        }
    });
}

function findUserByCredentials(username, password) {

    return userModel.findOne({"username": username, "password": password}, function (error, documents) {
        if (error) {
            return null;
        } else {
            return documents;
        }
    });
}

function updateUser(userId, user) {

    return userModel.update({_id: userId}, {
        $set: {
            "password": user.password,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "phone": user.phone,
            //websites: user.websites,
            "dob": user.dob
        }
    });
}

function deleteUser(userId) {

    return userModel.remove({_id: userId}, function (error, documents) {
        if (error) {
            return null;
        } else {
            return documents;
        }
    });
}

user = {
    "username": "alice",
    "password": "alice",
    "firstName": "Alice",
    "lastName": "Wonder",
    "email": "alice@wonderland.com",
    "phone": 123456789
};

user2 = {
    "username": "af",
    "password": "af",
    "firstName": "Alafaice",
    "lastName": "Wonder",
    "email": "aliafafafce@wonderland.com",
    "phone": 123455666
};

//createUser(user2);

findAllUsers()
    .then(function (users) {
        console.log(users);
    });


/*findUserById("5988ace4bb2b232eacbac94c")
    .then(function (users) {
        console.log(users);
    });*/

/*
updateUser("5988ace4bb2b232eacbac94c", user)
    .then(function (users) {
        console.log(users);
    });*/


//deleteUser("5988c1541ddeec12005addec");