document.getElementById('bookmarkForm').addEventListener('submit', addBookmark);

function addBookmark(e) {
    e.preventDefault();

    const siteName = document.getElementById('siteName').value;
    const bookmarkName = document.getElementById('bookmarkName').value;
    const siteUrl = document.getElementById('siteUrl').value;

    const bookmark = {
        siteName,
        bookmarkName,
        siteUrl
    };

    if (localStorage.getItem('bookmarks') === null) {
        const bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('bookmarkForm').reset();

    fetchBookmarks();
}

function deleteBookmark(index) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

function fetchBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    const bookmarksTable = document.getElementById('bookmarksTable').getElementsByTagName('tbody')[0];

    bookmarksTable.innerHTML = '';

    bookmarks.forEach((bookmark, index) => {
        const row = bookmarksTable.insertRow();
        const cellIndex = row.insertCell(0);
        const cellSiteName = row.insertCell(1);
        const cellVisit = row.insertCell(2);
        const cellDelete = row.insertCell(3);

        cellIndex.innerText = index + 1;
        cellSiteName.innerText = bookmark.bookmarkName;
        cellVisit.innerHTML = `<a href="${bookmark.siteUrl}" target="_blank">Visit</a>`;
        cellDelete.innerHTML = `<button class="delete" onclick="deleteBookmark(${index})">Delete</button>`;
    });
}

document.addEventListener('DOMContentLoaded', fetchBookmarks);
