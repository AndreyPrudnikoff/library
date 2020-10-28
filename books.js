$(document).ready(() => {

    let edit_flag = false;

    //Добавляем книги
    const tdMaker = (data) => {
        $('td').remove();
        for (let i = 0; i < data.length; i++){
            let x = data[i];
            let tr = document.createElement('tr');
            $('tbody').append(tr);
            for (let k = 0; k < 7; k++ ){
                let td = document.createElement('td');
                let z = x[k].toLocaleString();
                td.innerHTML = z ;
                tr.appendChild(td);
            }
            const img = document.createElement('td');
            img.innerHTML = `<img class="edit" id="${x[0]}" src='./img/edit.png' width='25'><img class="delete" id="d${x[0]}" src='./img/del.png' width='25'>`;
            tr.appendChild(img);
        }
    }

    $('#addBooks').click(() => {
        for (let i = 0; i < 7; i++) {
            const arr_input = $('.create_book p input');
            arr_input[i].value = '';
        }
        $('.create_book').removeClass('hidden');
        edit_flag = false;
        if (edit_flag) {
            $('#create_book').html('Сохранить');
        }else {
            $('#create_book').html('Создать');
        }
    })
    $('#cross').click(() => {
        $('.create_book').addClass('hidden');
    })

    let data = [];

    if (localStorage.getItem('books' ) !== null){
        data = JSON.parse(localStorage.getItem('books'));
        tdMaker(data);
    }
    tdMaker(data);

    $('#create_book').click(() => {
        let arr_book = $('.create_book p input');
        let books = [];
        for (let i = 0; i < 7; i++) {
            books[i] = arr_book[i].value;
        }
        if (!edit_flag){
            data.push(books);
            localStorage.setItem('books', JSON.stringify(data));
        }else {
            let l = books[0] - 1;
            data.splice(l, 1, books);
            localStorage.setItem('books', JSON.stringify(data));
        }
        tdMaker(data)
        $('.create_book').addClass('hidden');
    })

    //Сортировка книг

    const bookSort = (arr,num) => {
        let y = arr.sort((a,b) => a[num] > b[num] ? 1 : -1);
        tdMaker(y);
    }
    $('#sort').click(() => {
        if($('select').val() == 1) {
            bookSort(data, 1);
        }else if($('select').val() == 2) {
            bookSort(data, 2);
        }else {
            bookSort(data, 5);
        }
    })

    //Редактирование
    $('td .edit').click((e) => {
        edit_flag = true;
        const k = $(e.target).attr('id');
        const edit_book = data[k - 1];
        $('.create_book').removeClass('hidden');
        for (let i = 0; i < 7; i++) {
            const arr_input = $('.create_book p input');
            arr_input[i].value = edit_book[i];
        }
        if (edit_flag) {
            $('#create_book').html('Сохранить');
        }else {
            $('#create_book').html('Создать');
        }
    })

    //Удаление
    $('td .delete').click((e) => {
        let del_flag = confirm('Вы действительно хотите удалить книгу?');
        const d = $(e.target).attr('id').slice(1) - 1;

        if(del_flag) {
            data.splice(d, 1);
            localStorage.setItem('books', JSON.stringify(data));
        }
        tdMaker(data)
    })

    //Поиск
    $('#search_btn').click(function (){
        let newData = [];
        for (let i = 0; i < data.length; i++) {
            const q = data[i];
            const search = $('#search').val();
            for (let i = 0; i < q.length; i++) {
                let d = q[i].toLowerCase();
                let f = search.toLowerCase();
                if(d === f) {
                    newData.push(data[q[0] - 1]);
                    tdMaker(newData);
                }else if(!search){
                    tdMaker(data);
                }
            }
        }
    });

    $('#reset_lib').click(() => {
        let flag = confirm('Вы хотите удалить все книги?');
        if(flag){
            localStorage.removeItem('books');
            alert('Библиотека очищена!');
            location.reload();
        }else return;
    })

})