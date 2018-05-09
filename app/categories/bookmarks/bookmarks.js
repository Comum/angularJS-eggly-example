angular.module('categories.bookmarks', [
    'categories.bookmarks.create',
    'categories.bookmarks.edit',
    'eggly.models.categories',
    'eggly.models.bookmarks'
])
.config(function ($stateProvider) {
    $stateProvider
        .state('eggly.categories.bookmarks', {
            url: 'categories/:category',
            views: {
                'bookmarks@': {
                    templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html',
                    controller: 'bookmarksListCtrl as bookmarks'
                }
            }
        })
})
.controller('bookmarksListCtrl', function ($stateParams, BookmarksModel) {
    var bookmarksListCtrl = this;

    bookmarksListCtrl.currentCategoryName = $stateParams.category;
    bookmarksListCtrl.bookmarks = BookmarksModel.getBookmarks();
});