var app = require("../../express");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", isAdmin: true},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

// http handlers

app.post("/api/user", createUser);
app.get("/user", findUserByCredentials);
app.get("/api/user/:userId", findUserById);
app.put("/api/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

app.get("/api/users", getAllUsers);

//GET /api/user?username=username findUserByUsername

function createUser(request, response) {
    var user = request.query.user;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    return response.send(user);
}

function findUserByUsername(request, response) {
    var username = request.query.username;
    for (var u in users) {
        var _user = users[u];
        if (_user.username === username) {
            return response.send(_user);
        }
    }
    response.send("0");
}

function findUserByCredentials(request, response) {
    var username = request.query.username;
    var password = request.query.password;

    for (var u in users) {
        var _user = users[u];
        if (_user.username === username && _user.password === password) {
            response.send(_user);
        }
    }
    response.send("0");
}

function findUserById(request, response) {
    for (var u in users) {
        if (users[u]._id === request.params.userId) {
            response.send(users[u]);
        }
    }
}

function updateUser(request, response) {
    var user = request.query.user;
    var userId = request.query.userId;

    for (var u in users) {
        if (users[u]._id === userId) {
            user._id = userId;
            users[u] = user;
            response.send(user);
        }
    }
    response.send("0");
}

function deleteUser(userId) {
    for (var u in users) {
        if (users[u]._id === userId) {
            users.splice(u, 1);
            return;
        }
    }
    return null;
}

function getAllUsers(request, response) {
    response.send(users);
}
