var SignIn = {
    init: function () {
        User.loadUser();
        //console.log('true');
        if (User.authorized) {
            window.location.replace(window.location.protocol + '//' + window.location.host + '/' + 'index.html');
        }
        this.emailInput = document.getElementById('exampleInputEmail2');
        this.passInput = document.getElementById('exampleInputPassword2');
        this.initEvents();

    },
    initEvents: function () {
        document.getElementById('signInUser').addEventListener('click', this.signInUser.bind(this));
    },
    signInUser: function () {
        event.preventDefault();
        console.log('true');
        var userData = {
            email: this.emailInput.value,
            password: this.passInput.value
        };

        $.ajax({
            type: 'POST',
            url: 'http://spalah-home.herokuapp.com/auth/sign_in.json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(userData),
            success: function (data, textStatus, request) {
                console.log(data);
                var accessHeaders = {
                    'Access-Token': request.getResponseHeader('Access-Token'),
                    'Client': request.getResponseHeader('Client'),
                    'Uid': request.getResponseHeader('Uid'),
                    'Token-Type': request.getResponseHeader('Token-Type')
                };
                User.authorize(data, accessHeaders);

                window.location.replace(window.location.protocol + '//' + window.location.host + '/' + 'index.html');
            }
        });
    }
};