let addBtn  = document.querySelector(".addBtn");
let addModalContainter = document.querySelector(".tasks");
let flag = true;
let taskAreacontainer  = document.querySelector(".taskarea");
let mainCont = document.querySelector(".container");



addBtn.addEventListener("click",function(){
    if(flag){
        addModalContainter.style.display = "none";
    }
   else{
    addModalContainter.style.display = "flex";
   }
   flag = !flag;
})

addModalContainter.addEventListener("keydown",function(e){
    let key = e.key;
    if(key == "Enter"){
        createTicket(taskAreacontainer.value);
        taskAreacontainer.value = "";
        addModalContainter.style.display = 'none';
        flag = !flag;
    }


function  createTicket(task){
        let ticketCont = document.createElement('div');
        ticketCont.setAttribute('class','ticket-cont');
        ticketCont.innerHTML = `<i class = "material-icons done">done</i>
           <div class = "task-area">${task}</div>
           <i class = "material-icons delete">delete</i>`

           mainCont.appendChild(ticketCont);
    }
    
  
   
})


