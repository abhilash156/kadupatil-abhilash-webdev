var app = require("../../express");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"},
    {
        _id: "156", username: "desmond", password: "desmond", firstName: "Desmond", lastName: "Miles",
        email: "desmond@assassins.com"
    }
];

// http handlers

app.post("/api/user", createUser);
app.get("/api/user", findUserByCredentials);
app.get("/api/user/:userId", findUserById);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

app.get("/api/users", getAllUsers);

//GET /api/user?username=username findUserByUsername

function createUser(request, response) {
    var user = request.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    response.send(user);
}

function findUserByUsername(request, response) {
    var username = request.query.username;
    for (var u in users) {
        var _user = users[u];
        if (_user.username === username) {
            return response.json(_user);
        }
    }
    response.sendStatus(404);
}

function findUserByCredentials(request, response) {
    var username = request.query.username;
    var password = request.query.password;
    if (username && password) {
        for (var u in users) {
            var _user = users[u];
            if (_user.username === username && _user.password === password) {
                response.json(_user);
            }
        }
    } else if (username) {
        for (var u in users) {
            _user = users[u];
            if (_user.username === username) {
                response.json(_user);
            }
        }
    }
    response.sendStatus(404);
}

function findUserById(request, response) {
    for (var u in users) {
        if (users[u]._id === request.params.userId) {
            response.json(users[u]);
        }
    }
    response.sendStatus(404);
}

function updateUser(request, response) {
    var user = request.body;
    var userId = request.params.userId;

    for (var u in users) {
        if (users[u]._id === userId) {
            user._id = userId;
            users[u] = user;
            response.send(user);
        }
    }
    response.sendStatus(404);
}

function deleteUser(request, response) {
    var userId = request.params.userId;

    for (var u in users) {
        if (users[u]._id === userId) {
            users.splice(u, 1);
            response.sendStatus(200);
        }
    }
    response.sendStatus(404);
}

function getAllUsers(request, response) {
    response.send(users);
}
