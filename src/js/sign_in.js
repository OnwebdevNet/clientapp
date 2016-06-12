var SignIn = {
    init: function () {
        this.initEvents();
        this.checkAuthorization();
    },
    initEvents: function () {
        if (document.getElementById('signInForm') != null) {
            document.getElementById('signInForm').addEventListener('submit', this.signInForm.bind(this));
        }
    },
    signInForm: function () {
        event.preventDefault();
        var userEmail = document.getElementById('exampleInputEmail1').value;
        var userPass = document.getElementById('exampleInputPassword1').value;
        var userData = {
            email: userEmail,
            password: userPass
        };
        this.authorizationUser(userData);
    },
    authorizationUser: function (userData) {
        $.ajax({
            type: 'POST',
            url: 'http://spalah-home.herokuapp.com/auth/sign_in.json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(userData),
            success: function (data, textStatus, request) {
                localStorage.setItem('Access-Token', request.getResponseHeader('Access-Token'));
                localStorage.setItem('Client', request.getResponseHeader('Client'));
                localStorage.setItem('Token-Type', request.getResponseHeader('Token-Type'));
                localStorage.setItem('Uid', request.getResponseHeader('Uid'));

                window.location.replace(window.location.protocol + '//' + window.location.host + '/' + 'index.html');
            },
            error: function (request, textStatus, errorThrown) {

            }
        });
    },
    checkAuthorization: function () {
        var currentLocation = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname;
        if (currentLocation === window.location.protocol + '//' + window.location.host + '/' + 'index.html') {
            if (!localStorage.getItem('Access-Token') || !localStorage.getItem('Client') || !localStorage.getItem('Token-Type') || !localStorage.getItem('Uid')){
                window.location.replace(window.location.protocol + '//' + window.location.host + '/' + 'sign_in.html');
            }
        } else if (currentLocation === window.location.protocol + '//' + window.location.host + '/' + 'sign_in.html') {
            if (localStorage.getItem('Access-Token') && localStorage.getItem('Client') && localStorage.getItem('Token-Type') && localStorage.getItem('Uid')){
                window.location.replace(window.location.protocol + '//' + window.location.host + '/' + 'index.html');
            }
        }
    }
};