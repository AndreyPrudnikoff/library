$(document).ready(() => {

    let edit_flag = false;

    //Добавляем книги
    const tdMaker = (data) => {
        $('td').remove();
        for (let i = 0; i < data.length; i++){
            let x = data[i];
            let tr = document.createElement('tr');
            $('tbody').append(tr);
            for (let k = 0; k < 3; k++ ){
                let td = document.createElement('td');
                let z = x[k].toLocaleString();
                td.innerHTML = z ;
                tr.appendChild(td);
            }
            const img = document.createElement('td');
            img.innerHTML = `<img class="edit" id="${x[0]}" src='./img/edit.png' width='25'>`;
            tr.appendChild(img);
        }
    }

    $('#addVisitor').click(() => {
        for (let i = 0; i < 3; i++) {
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

    if (localStorage.getItem('people' ) !== null){
        data = JSON.parse(localStorage.getItem('people'));
        tdMaker(data);
    }
    tdMaker(data);

    $('#create_book').click(() => {
        let arr_book = $('.create_book p input');
        let items = [];
        for (let i = 0; i < 3; i++) {
            items[i] = arr_book[i].value;
        }
        if (!edit_flag){
            data.push(items);
            localStorage.setItem('people', JSON.stringify(data));
        }else {
            let l = items[0] - 1;
            data.splice(l, 1, items);
            localStorage.setItem('people', JSON.stringify(data));
        }
        tdMaker(data)
        $('.create_book').addClass('hidden');
    })

    //Сортировка посетителей
    const bookSort = (arr,num) => {
        let y = arr.sort((a,b) => a[num] > b[num] ? 1 : -1);
        tdMaker(y);
    }
    $('#sort').click(() => {
        if($('select').val() == 1) {
            bookSort(data, 0);
        }else if($('select').val() == 2) {
            bookSort(data, 1);
        }
    })

    //Редактирование
    $('td .edit').click((e) => {
        edit_flag = true;
        const k = $(e.target).attr('id');
        const edit_book = data[k - 1];
        $('.create_book').removeClass('hidden');
        for (let i = 0; i < 3; i++) {
            const arr_input = $('.create_book p input');
            arr_input[i].value = edit_book[i];
        }
        if (edit_flag) {
            $('#create_book').html('Сохранить');
        }else {
            $('#create_book').html('Создать');
        }
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
})