(function () {
    angular.module("WebAppMaker").factory("pageService", pageService);

    function pageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
            {"_id": "333", "name": "Horizon Zero Dawn", "websiteId": "222", "description": "Horizon Zero Dawn is an " +
            "action role-playing video game developed by Guerrilla Games and published by Sony Interactive " +
            "Entertainment for PlayStation 4 and released in early 2017. The plot revolves around Aloy, a hunter " +
            "and archer living in a world overrun by robots. Having been an outcast her whole life, she sets out to " +
            "discover the dangers that kept her sheltered. The character uses ranged weapons and a spear and stealth " +
            "tactics to combat the mechanised creatures, whose remains can be looted for resources."}
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        function findPageByWebsiteId(websiteId) {
            var currentPages = [];
            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    currentPages.push(pages[p]);
                }
            }
            return currentPages;
        }

        function findPageById(pageId) {
            for (var u in pages) {
                var _page = pages[u];
                if (_page._id === pageId) {
                    return angular.copy(_page);
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var u in pages) {
                if (pages[u]._id === pageId) {
                    page._id = pageId;
                    pages[u] = page;
                    return page;
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages.splice(p, 1);
                    return;
                }
            }
            return null;
        }
    }
})();