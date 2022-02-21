var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// function generateRandomColor(){
//     var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
//     return randomColor;
// }
// $('#h1').css('color', random_color);
