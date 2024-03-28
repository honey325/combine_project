// var header = document.getElementById('header');
var tbl = document.getElementById('tbl')
var result;
var current = 1;
var records = 10
var current_data;
var next = document.getElementById('next');
var last = document.getElementById('last');
var prev = document.getElementById('prev');
var first = document.getElementById('first');


function search() {
    var str = document.getElementById('search').value;

    filteredPost = result.filter((post) => { return (post.title.includes(str) || post.body.includes(str) ) });

    current = 1;
    current_data = filteredPost;
    total = Math.ceil(current_data.length / records)
    cal_curr();
}



function pagination(btn) {

    if (btn == 'first') {
        current = 1;
        cal_curr();
    }
    else if (btn == 'prev' && current != 1) {
        current--;
        cal_curr();
    }
    else if (btn == 'next' && current != total) {
        current++;
        cal_curr();
    }
    else if (btn == 'last') {
        current = total;
        cal_curr();
    }
}




function cal_curr() {

    document.getElementsByClassName('current')[0].innerHTML = `page = ${current}`;
    current_result = current_data.slice(((current - 1) * records), current * records);
    print(current_result);



}


function print(current_result) {
    let trs = document.querySelectorAll('tr');
    trs.forEach(element => {
        element.remove();
    });

    let header = document.createElement('tr');
    keys.forEach(key => {


        let td = document.createElement('td');
        let node = document.createTextNode(key);
        td.appendChild(node);
        header.appendChild(td);

    });
    tbl.appendChild(header);

    current_result.forEach(data => {

        let tr = document.createElement('tr');

        keys.forEach(key => {
            let td = document.createElement('td');
            if (key == 'image' || key == 'thumbnail') {
                // console.log(key);

                let img = document.createElement('img');
                img.setAttribute('src', `${data[key]}`);
                td.appendChild(img);
            }
            else if (key == "content") {
                let p = document.createElement('p');
                let node = document.createTextNode(`${data[key]}`);
                p.appendChild(node);
                td.appendChild(p);

            }
            else {
                let node = document.createTextNode(`${data[key]}`);
                td.appendChild(node);
            }
            tr.appendChild(td);
        });
        let td = document.createElement('td');
        let a = document.createElement('a');
        let node = document.createTextNode(`View More`);
        a.appendChild(node);
        a.setAttribute('onclick', 'view(event)');
        td.appendChild(a);
        tr.appendChild(td);
        tbl.appendChild(tr);



        if (current == total) {
            next.setAttribute("href","javascript:void(0)");
            last.setAttribute("href","javascript:void(0)");
        }
        if (current == 1) {
            prev.setAttribute("href","javascript:void(0)");
            first.setAttribute("href","javascript:void(0)");
        }
    });
}

async function fetching() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    result = await response.json();
    // console.log(Object.keys(result[0]));
    keys = Object.keys(result[0]);
    total = Math.ceil(result.length / records);
    current_data = result
    cal_curr();
}
fetching();

function view(event) {
    // console.log(event.target.parentNode.parentNode.children[0].innerHTML);
    let id = event.target.parentNode.parentNode.children[0].innerHTML;
    window.location.href = `/fetch_post/post-details?id=${id}`;
}


