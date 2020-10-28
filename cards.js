$(document).ready(() => {

    //Создание карточек
    const tdMaker = (datab) => {
        $('td').remove();
        for (let i = 0; i < datab.length; i++){
            let x = datab[i];
            let tr = document.createElement('tr');
            $('tbody').append(tr);
            for (let k = 0; k < 3; k++ ){
                let td = document.createElement('td');
                let z = x[k].toLocaleString();
                td.innerHTML = z ;
                tr.appendChild(td);
            }
            const b_date = document.createElement('td');
            const r_date = document.createElement('td');
            b_date.innerHTML = new Date().toLocaleDateString();
            if (!x[4]) {
                r_date.innerHTML = `<img class="return" id="${x[0]}" src='./img/return.png' width='25' alt="возврат">`;
            }else {
                r_date.innerHTML = new Date().toLocaleDateString();
            }
            tr.appendChild(b_date);
            tr.appendChild(r_date);
        }
        window.localStorage.setItem('cards', JSON.stringify(datab));
    }

    let data = [];
    if (localStorage.getItem('cards' ) !== null){
        data = JSON.parse(localStorage.getItem('cards'));
        tdMaker(data);
    }
    tdMaker(data);

    $('#addBooks').click(() => {
        //Удаляем существующие значения
        $('#idc').val('');
        let arr_b = $('#book option');
        if (arr_b != null) {
            for (let i = 0; i < arr_b.length; i++) {
                arr_b[i].remove();
            }
        }
        let arr_option = $('#visitor option');
        if (arr_option != null) {
            for (let i = 0; i < arr_option.length; i++) {
                arr_option[i].remove();
            }
        }
        //Доступ к книгам
        let arr_books = JSON.parse(localStorage.getItem('books'));
        for (let i = 0; i < arr_books.length; i++){
            let h = arr_books[i];
            let optionBook = document.createElement('option');
            for(let j = 0; j < h.length; j++) {
                optionBook.innerHTML = h[1];
            }
            let books = document.getElementById('book');
            books.appendChild(optionBook);
        }

        //Доступ к посетителям
        let arr_visitors = JSON.parse(localStorage.getItem('people'));
        for (let i = 0; i < arr_visitors.length; i++){
            let v = arr_visitors[i];
            let optionVisitors = document.createElement('option');
            for(let j = 0; j < v.length; j++) {
                optionVisitors.innerHTML = v[1];
            }
            let vis = document.getElementById('visitor');
            vis.appendChild(optionVisitors);
        }
        $('.create_book p input').value = '';
        $('.create_book').removeClass('hidden');
        $('#create_book').html('Сохранить');
    })
    $('#cross').click(() => {
        $('.create_book').addClass('hidden');
    })
    //Возврат книги
    $('.return').click((e) => {
        let p = e.target.id - 1;
        let new_el = data[p];
        new_el.push(new Date().toLocaleDateString());
        data.splice(p, 1, new_el)
        tdMaker(data);
        let booksStocks = JSON.parse(localStorage.getItem('books'));
        for (let i = 0; i < booksStocks.length; i++) {
            let k = booksStocks[i];//отдельная книга(массив)
            let ind = k[0] - 1;//индекс книги
            let cardsArray = JSON.parse(localStorage.getItem('cards'));
            let card = cardsArray[p];
            if (card[1] === k[1]) {
                k[6] = Number(k[6]) + 1 + "";
                booksStocks.splice(ind, 1, k);
                window.localStorage.setItem('books', JSON.stringify(booksStocks));
            }
        }
    })

    $('#create_book').click(() => {
        let arr_book = $('.cards_value');
        let books = [];
        for (let i = 0; i < 3; i++) {
            books[i] = arr_book[i].value;
        }
        books.push(new Date().toLocaleDateString())
        data.push(books);
        localStorage.setItem('cards', JSON.stringify(data));
        tdMaker(data)
        $('.create_book').addClass('hidden');

        let booksStocks = JSON.parse(localStorage.getItem('books'));
        for (let i = 0; i < booksStocks.length; i++) {
            let k = booksStocks[i];//отдельная книга - массив
            let book = k[1];//название книги
            let ind = k[0] - 1;//индекс книги
            if (book == $('#book').val()) {
                k[6] = k[6] - 1;
                booksStocks.splice(ind, 1, k)
                window.localStorage.setItem('books', JSON.stringify(booksStocks));
            }
        }
    })

    //Сортировка карточек
    const bookSort = (arr,num) => {
        let y = arr.sort((a,b) => a[num] > b[num] ? 1 : -1);
        tdMaker(y);
    }
    $('#sort').click(() => {
        const select = $('select').val();
        if(select === "1") {
            bookSort(data, 2);
        }else if(select === "2") {
            bookSort(data, 1);
        }else if(select === "4") {
            bookSort(data, 0);
        }else {
            bookSort(data, 4);
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