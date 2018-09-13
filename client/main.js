//User List

let currentname, starList;

$(function () {

    let $users = $('#userlist')

    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3000/api/victory-fox-2018',
        dataType: 'json'
    })
    .done (function (result) {
        let index = 0
        
        result.data.forEach(item => {
            let name = item.login
            $('ul').append(`<li><a href="#" onclick="showRepo('${name}')">${name}</a></li>`)
          index++
        });
        
    })
    .fail(function(result, textStatus, xhr){
        alert(`error: ${result.status}
        STATUS: ${xhr}`);
    });
})

//Repo List
function showRepo(name) {

    let $lists = $('#repolist')

    $.ajax({
        type: 'GET',
        url: `http://127.0.0.1:3000/api/starred/${name}`,
        dataType: 'json'
    })
    .done (function (result) {

        currentname = name
        starList = result

        $('.card-body').remove();
        
        let index = 0
        
        result.data.forEach(item => {
            let name = item.name,
                url = item.html_url,
                author = item.owner.login,
                desc = item.description,
                stars = item.stargazers_count;

            if (!desc) desc = 'No description'

            $lists.append(`<div class="card-body">
            <h5 class="card-title">
              <a href="#" onclick="showDetail('${name}', '${url}', '${author}', '${desc}')">${name}</a>
            </h4>
            <p class="card-text">description of repo ${index+1} : ${desc}</p>
            <p class="card-text">${stars}</p>
          </div>`)

          index++
        });
        
    })
    .fail(function(result, textStatus, xhr){
        alert(`error: ${result.status}
        STATUS: ${xhr}`);
    });
}

$(function () {

    let $lists = $('#repolist')

    $.ajax({
        type: 'GET',
        url: `http://127.0.0.1:3000/api/starred/aliyanamu`,
        dataType: 'json'
    })
    .done (function (result) {
        
        currentname = 'aliyanamu'
        starList = result
        
        $('.card-body').remove();
        
        let index = 0
        
        result.data.forEach(item => {
            let name = item.name,
                url = item.html_url,
                author = item.owner.login,
                desc = item.description,
                stars = item.stargazers_count;

            if (!desc) desc = 'No description'

            $lists.append(`<div class="card-body">
            <h5 class="card-title">
              <a href="#" onclick="showDetail('${name}', '${url}', '${author}', '${desc}')">${name}</a>
            </h4>
            <p class="card-text">description of repo ${index+1} : ${desc}</p>
            <p class="card-text">${stars}</p>
          </div>`)

          index++
        });
        
    })
    .fail(function(result, textStatus, xhr){
        alert(`error: ${result.status}
        STATUS: ${xhr}`);
    });
})

function showDetail(name, url, author, desc) {
    console.log(name, url, author, desc)
    
    let $details = $('#detail')
    $('.repodet').remove();
    $details.append(`<div class="repodet"><h1>${name}</h1>
    <p class="lead">
        by
        <a href="${url}">${author}</a>
    </p>
    <hr>
    <p class="lead">${desc}</p>`)
}

$('button').first().click(function () {
    
    let val = $('.search').val();

    if (val) {
        searchLike(starList, val)
    } else {
        showRepo(currentname)
    }
});

function searchLike(starList, val) {

    var regex = new RegExp(val, 'i')
    
    let $lists = $('#repolist')
    let index = 0
    $('.card-body').remove();
    
    starList.data.forEach(item => {
        let name = item.name,
            url = item.html_url,
            author = item.owner.login,
            desc = item.description,
            stars = item.stargazers_count;

        if (!desc) desc = 'No description'

        if (name.match(val, 'i') || desc.match(val, 'i')) {

            $lists.append(`<div class="card-body">
            <h5 class="card-title">
                <a href="#" onclick="showDetail('${name}', '${url}', '${author}', '${desc}')">${name}</a>
            </h4>
            <p class="card-text">description of repo ${index+1} : ${desc}</p>
            <p class="card-text">${stars}</p>
            </div>`)
        }
        index++
    });
}