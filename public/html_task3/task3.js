var cur_slide= 0
console.log(123123);

function slideshow_r(){
    
var slides = document.getElementsByClassName("slide");

cur_slide = (cur_slide+1)%3;

for(let i=0;i<slides.length; i++){
    slides[i].style.display = "none";
}
slides[cur_slide].style.display = "block";
slides[cur_slide].style.animation = "animate 1s";
}

function slideshow_l(){
    
    // console.log("1")
    var slides = document.getElementsByClassName("slide");
    
    cur_slide =(cur_slide+2)%3;
    console.log(cur_slide)
    for(let i=0;i<slides.length; i++){
        slides[i].style.display = "none";
    }
    slides[cur_slide].style.display = "block";
    slides[cur_slide].style.animation = "animate2 1s";
    }

   