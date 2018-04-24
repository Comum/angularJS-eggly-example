angular.module('Eggly', [
    'ui.router',
    'categories',
    'categories.bookmarks'
])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('eggly', {
            url:'',
            abstract: true
        })
    ;

    $urlRouterProvider.otherwise('/');
})
.controller('MainCtrl', function($scope, $state) {
    $scope.categories = [
        {"id": 0, "name": "Development"},
        {"id": 1, "name": "Design"},
        {"id": 2, "name": "Exercise"},
        {"id": 3, "name": "Humor"}
    ];

    $scope.bookmarks = [
        {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
        {"id": 1, "title": "Egghead.io", "url": "http://egghead.io", "category": "Development" },
        {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
        {"id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
        {"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
        {"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
        {"id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
        {"id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
        {"id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
    ];

    $scope.currentCategory = null;

    function setCurrentCategory(category) {
        $scope.currentCategory = category;

        cancelCreating();
        cancelEditing();
    }

    function isCurrentCategory(category) {
        return $scope.currentCategory !== null && $scope.currentCategory.name === category.name;
    }

    $scope.setCurrentCategory = setCurrentCategory;
    $scope.isCurrentCategory = isCurrentCategory;

    $scope.isCreating = false;
    $scope.isEditing = false;

    /** CRUD */

    function resetCreateForm() {
        $scope.newBookmark = {
            name: '',
            url: '',
            category: $scope.currentCategory.name
        }
    }

    function createBookmark(bookmark) {
        if (bookmark) {
            bookmark.id = $scope.bookmarks.length;
            $scope.bookmarks.push(bookmark);

            resetCreateForm();
        }
    }

    $scope.createBookmark = createBookmark;

    $scope.editedBookmark = null;

    function setEditedBookmark(bookmark) {
        $scope.editedBookmark = angular.copy(bookmark);
    }

    function updateBookmark(bookmark) {
        var index = _.findIndex($scope.bookmarks, function (b) {
            return b.id === bookmark.id;
        });

        $scope.bookmarks[index] = bookmark;
        $scope.editedBookmark = null;
        $scope.isEditing = false;
    }

    function isSelectedBookmark(bookmarkId) {
        return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
    }

    $scope.setEditedBookmark = setEditedBookmark;
    $scope.updateBookmark = updateBookmark;
    $scope.isSelectedBookmark = isSelectedBookmark;

    function deleteBookmark(bookmark) {
        _.remove($scope.bookmarks, function (b) {
            return b.id === bookmark.id;
        });
    }

    $scope.deleteBookmark = deleteBookmark;

    /** Create and editing */

    function startCreating() {
        $scope.isCreating = true;
        $scope.isEditing = false;

        resetCreateForm();
    }

    function cancelCreating() {
        $scope.isCreating = false;
    }

    function startEditing() {
        $scope.isCreating = false;
        $scope.isEditing = true;
    }

    function cancelEditing() {
        $scope.isEditing = false;
        $scope.editedBookmark = null;
    }

    function shouldShowCreating() {
        return $scope.currentCategory && !$scope.isEditing;
    }

    function shouldShowEditing() {
        return $scope.isEditing && !$scope.isCreating;
    }

    $scope.startCreating = startCreating;
    $scope.cancelCreating = cancelCreating;
    $scope.startEditing = startEditing;
    $scope.cancelEditing = cancelEditing;
    $scope.shouldShowCreating = shouldShowCreating;
    $scope.shouldShowEditing = shouldShowEditing;
})