var IndexPage = {
  tasks: [],

  init: function() {
    User.loadUser();
    if (!User.authorized) {
      window.location.replace(window.location.protocol + '//' + window.location.host + '/' + 'sign_in.html');
    }
    this.loadTasks();
    this.taskInput = document.getElementById('task-name');
    this.taskContent = document.getElementById('tasks-list');
    document.getElementById('add-task-btn').addEventListener('click', this.sendCreateRequest.bind(this));
  },

  loadTasks: function() {
    // Обьявляем функцию колбек
    var loadTasksCallback = function(data) {
      this.tasks = data;

      for(var i=0; i < data.length; i++){
        var listItem = document.createElement('p');
        listItem.innerHTML = data[i].name;
        this.taskContent.appendChild(listItem);
      }
    };

    $.ajax({
      url: 'http://spalah-home.herokuapp.com/tasks.json',
      method: 'GET',
      headers: User.accessHeaders,
      // Оборачиваем колбек функцию с помощью refreshTokenAndRunCallback. Смотри user.js
      success: User.refreshTokenAndRunCallback(loadTasksCallback.bind(this))
    });  
  },

  sendCreateRequest: function(event) {
    event.preventDefault();
    
    var requestHeaders = User.accessHeaders;
    requestHeaders['Content-Type'] = 'application/json';
    
    // Обьявляем функцию колбек
    var successCallback = function(data) { 
      this.tasks.push({ name: this.taskInput.value });
      var listItem = document.createElement('p');
      listItem.innerHTML = this.taskInput.value;
      this.taskContent.appendChild(listItem);
    };

    $.ajax({
      url: 'http://spalah-home.herokuapp.com/tasks.json',
      method: 'POST',
      headers: requestHeaders,
      data: JSON.stringify({ name: this.taskInput.value }),

      // Оборачиваем колбек функцию с помощью refreshTokenAndRunCallback. Смотри user.js
      success: User.refreshTokenAndRunCallback(successCallback.bind(this))
    }); 
  }
};