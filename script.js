$(document).ready(() => {

    //Авторизация

    $('#login').click(() => {
        let login = $('#in_login').val();
        let password = $('#in_password').val();
        let success = false;
        $.getJSON('users.json', (data) => {
            for (let item of data) {
                if (item.user === login && item.password === password) {
                    success = true;
                    sessionStorage.setItem('user', login);
                    break;
                }
            }
            !success ? $('h2').html('Вы не ввели логин/пароль (или ввели неправильно)!!!') : window.location = 'books.html';
        })
    })
    $('#reset').click(() => {
        $('#in_login').val('');
        $('#in_password').val('');
    })

    $('#guest').html(sessionStorage.getItem('user'));
    $('#loguot').click(() => {
        let flag = confirm('Вы уверены, что хотите выйти?');
        if (flag) {
            window.location = 'index.html';
            sessionStorage.removeItem('user')
        }else return;
    })
    $('ul li a').click((e) => {
        if (sessionStorage.getItem('user') === null){
            e.preventDefault();
            alert('Вы не ввели логин!');
        }
    })
})