function showAlert(message) {
    document.getElementById("modal-message").innerHTML = message;
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
    myModal.show();
  }