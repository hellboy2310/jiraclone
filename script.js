let addBtn  = document.querySelector(".addBtn");
let addModalContainter = document.querySelector(".tasks");
let flag = true;
let taskAreacontainer  = document.querySelector(".taskarea");

addBtn.addEventListener("click",function(){
    if(flag){
        addModalContainter.style.display = "none";
    }
   else{
    addModalContainter.style.display = "flex";
   }
   flag = !flag;
})

taskAreacontainer.addEventListener("keydown",function(e){
    let key = e.target.value;
    
   
})


