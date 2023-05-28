if (localStorage.getItem('token') != null) {
    document.getElementById('overlayUser').style.display = 'block';
    document.getElementById('overlayHome').style.display = 'none';
} else {
    document.getElementById('overlayUser').style.display = 'none';
    document.getElementById('overlayHome').style.display = 'block';
}   