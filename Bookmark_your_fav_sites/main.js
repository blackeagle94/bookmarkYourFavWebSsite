//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark)

function saveBookmark (e) {
    let siteName =document.getElementById('siteName').value;
    let siteUrl =document.getElementById('siteUrl').value;
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (siteName === '' || siteUrl === '') {
        let fill = document.getElementById('fill')
        fill.className = 'list-group-item list-group-item-danger p-3'
        fill.style.marginTop = '10px'
        fill.style.display = 'block'
     
    } else  if (!siteUrl.match(regex)) {
        let fillText = document.getElementById('fillText');
        fill.className = 'list-group-item list-group-item-danger p-3'
        fill.style.marginTop = '10px'
        fillText.innerHTML = 'Please enter valid URL.';
        fill.style.display = 'block'
    } else {
        fill.style.display = 'none'
        let bookmark = {
            name : siteName,
            url : siteUrl
        }
        /*
        localStorage.setItem('test', 'Hello World')
        console.log(localStorage.getItem('test'))
        */
        
        //validation
       
       


        //test if bookmark is null
       if (localStorage.getItem('bookmarks') === null) {
        let bookmarks = [];
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
       } else {
           //get bookmarks from localstorage
           let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
           // add bookmark to array
           bookmarks.push(bookmark)
           // re-set back to localstorage
           localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
          
          document.getElementById('myForm').reset()
       }
       fetchBookmarks();

       e.preventDefault();
    }
    

}

//delete bookmarks
function deleteBookmark (url) {
    //get bookmarks from localstorag
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

    //loop throught bookmarks
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1)
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re=fetch bookmarks
    fetchBookmarks();
}


// fetch bookmark
function fetchBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output id
    let bookmarksResults = document.getElementById('bookmarksResults');
    // build output
    bookmarksResults.innerHTML= '';
    for (let i = 0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="list-group-item-dark">' + 
        '<h3 class = "p-2">' + name + '  ' +
        '<a class="btn btn-success mr-2" target= "_blank" href="'+url+'">Visit</a>' +
        '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger "  href="#">Delete</a>' +
        '</h3>' + 
        '</div>'
    }
}