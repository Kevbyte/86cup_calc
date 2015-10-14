angular.module('86cup.main', [])
  .controller('TodoListController', function ($scope) {
    $scope.todoList = {};
    $scope.todoList.todos = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}
    ];

    $scope.add = function() {
      $scope.todoList.todos.push({text: $scope.todoList.todoText, done:false})
      $scope.todoList.todoText = '';
    }
  });