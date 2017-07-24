(function () {
    angular.module("WebAppMaker").factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
                {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
                {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
                {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
                {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
                {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
                {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
                {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
            ]
        ;

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };

        createWebsite(userId, website)
        findWebsitesByUser(userId)
        findWebsiteById(websiteId)
        updateWebsite(websiteId, website)
        deleteWebsite(websiteId)

        return api;

        function createWebsite(userId, website) {
        }

        function findWebsitesByUser(userId) {
            for (var u in websites) {
                var _website = websites[u];
                if (_website.developerId === userId) {
                    return _website;
                }
            }
            return null;
        }

        function findWebsiteById(websiteId) {
            for (var u in websites) {
                var _website = websites[u];
                if (_website._id === websiteId) {
                    return _website;
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
        }

        function deleteWebsite(websiteId) {
        }
    }
})();