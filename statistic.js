$(document).ready(() => {

    const tdMaker = (data, parent, element) => {
        element.remove();
        for (let i = 0; i < 5; i++){
            let x = data[i];
            let tr = document.createElement('tr');
            parent.append(tr);
            for (let k = 0; k < 2; k++ ){
                let td = document.createElement('td');
                let z = x[k].toLocaleString();
                td.innerHTML = z ;
                tr.appendChild(td);
            }

        }
    }

    const sortTop = (arr, num) => {
        arr.sort((a,b) => a[num] > b[num] ? -1 : 1);
    }

    let data = [];

    if (localStorage.getItem('cards' ) !== null) {
        data = JSON.parse(localStorage.getItem('cards'));
        let nb_array = [];
        let nv_array = [];
        for (let i = 0; i < data.length; i++) {
            let x = data[i];
            nb_array.push(x[1]);
            nv_array.push(x[2]);
        }
        let top_books = {};
        let top_visitors = {};
        for (let i in nb_array) {
            top_books[nb_array[i]] !== undefined ? top_books[nb_array[i]]++ : top_books[nb_array[i]] = 1
        }
        for (let i = 0; i < nv_array.length; i++) {
            top_visitors[nv_array[i]] !== undefined ? top_visitors[nv_array[i]]++ : top_visitors[nv_array[i]] = 1
        }


        let arrTopic = [];
        for (let i in top_books) {
            let arrTopBooks = [];
            arrTopBooks.push(i);
            arrTopBooks.push(top_books[i]);
            arrTopic.push(arrTopBooks);
        }
        sortTop(arrTopic, 1);
        tdMaker(arrTopic, $('#t_book'), $('#t_book td'));

        let arrTop = [];
        for (let i in top_visitors) {
            let arrTopVisitors = [];
            arrTopVisitors.push(i);
            arrTopVisitors.push(top_visitors[i]);
            arrTop.push(arrTopVisitors);
        }
        sortTop(arrTop, 1);
        tdMaker(arrTop, $('#t_vis'), $('#t_vis td'));
    }
})
