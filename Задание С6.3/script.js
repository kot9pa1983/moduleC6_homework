let count = 1;
const btn = document.querySelector('.button');
const icon1 = document.querySelector('.icon1');
const icon2 = document.querySelector('.icon2');
btn.addEventListener ('click',() => {
  if (count == 1) {
    icon1.style = "display: none";
    icon2.style = "display: inline-block";
    count = 0;
  }
  else {
    icon2.style = "display: none";
    icon1.style = "display: inline-block";
    count = 1;
  }
})
