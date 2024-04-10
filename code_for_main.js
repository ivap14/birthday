document.getElementById('generateButton').addEventListener('click', function() {
  const friendName = document.getElementById('friendName').value;
  const friendAge = document.getElementById('friendAge').value;

  const url = `happy_b.html?name=${encodeURIComponent(friendName)}&age=${encodeURIComponent(friendAge)}`;
  document.getElementById('urlField').value = url;

  document.getElementById('myModal').style.display = 'block';
  document.getElementById('viewButton').style.display = 'inline';
});

document.getElementsByClassName('close')[0].addEventListener('click', function() {
  document.getElementById('myModal').style.display = 'none';
});

window.addEventListener('click', function(event) {
  const modal = document.getElementById('myModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

function copyUrl() {
  const urlField = document.getElementById('urlField');
  urlField.select();
  document.execCommand('copy');
}

function openPage() {
  const url = document.getElementById('urlField').value;
  window.open(url, '_blank');
}
