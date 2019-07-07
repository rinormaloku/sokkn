function shuffle(array) {
    var counter = array.length;

    while (counter > 0) {
        var index = Math.floor(Math.random() * counter);

        counter--;

        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

var images = shuffle([
    "boy-1.jpeg",         
    "girl4.png",
    "group2.png",
    "boy1.png",
    "girl6.png",
    "group3.png",
    "pair.png",
    "entertainment.png",
    "girl8.png",
    "group4.png",
    "photographer.png",
    "girl1.png",
    "girl9.png",
    "group5.png",
    "girl3.png",
    "group1.png",
    "kids.png"
]);

var img = document.getElementById("uploader");
var map = { cl1: "cl2", cl2: "cl1" }

function displayImage(x) {
    img.style.backgroundImage = "url(../images/" + images[x] + ")";
}

function startTimer() {
    var x = 0;
    displayImage(x);
    setInterval(function() {
        x = x + 1 >= images.length ? 0 : x + 1;
        displayImage(x);
    }, 9000);
}

startTimer();