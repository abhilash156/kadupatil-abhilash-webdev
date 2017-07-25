(function () {
    angular.module("WebAppMaker").factory("PageService", PageService);

    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
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
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    currentPages.push(pages[p]);
                }
            }
            return currentPages;
        }

        function findPageById(pageId) {
            for (var u in pages) {
                var _page = pages[u];
                if (_page._id === pageId) {
                    return _page;
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var u in pages) {
                if(pages[u]._id === pageId) {
                    page._id = pageId;
                    pages[u] = page;
                    return page;
                }
            }
            return null;
        }

        function deletePage(pageId) {
        }
    }
})();