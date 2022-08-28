let addBtn = document.querySelector(".addBtn");
let isBtnPressed = false;
let body = document.querySelector('body');
let taskListsBtn = document.querySelector(".taskLists");
let todoArr = localStorage.getItem("todoArr");
let completedArr = localStorage.getItem("completedArr");
let completedBtn  = document.querySelector(".completed");


if(!completedArr){
    localStorage.setItem("completedArr","[]");
}

if(todoArr){

}

else{
    todoArr = [];
todoArr = JSON.stringify(todoArr);
localStorage.setItem("todoArr",todoArr);


}
//here we will add the functionality on the tasklists side

document.addEventListener('DOMContentLoaded', function() {
    // console.log('DOM fully loaded and parsed');
    taskListsBtn.click();
});



taskListsBtn.addEventListener("click",function(){
    if(!taskListsBtn.classList.contains("active")){
        taskListsBtn.classList.add("active");
        completedBtn.classList.remove("active");
    }

    let allTaskDiv = document.querySelectorAll(".oneTask");
    for(let i = 0;i<allTaskDiv.length;i++){
        allTaskDiv[i].remove();
    }

    todoArr = JSON.parse(localStorage.getItem("todoArr"));


    for(let i = 0;i<todoArr.length;i++)
    {
        let divEle = document.createElement("div");
        divEle.setAttribute("class","oneTask");
        divEle.innerHTML = `<i class = "material-icons done">done</i>
        <p>${todoArr[i]}</p>
        <i class = "material-icons delete">delete</i>`
        

        let deleteBtn = divEle.querySelector(".delete");
        deleteBtn.addEventListener("click",function(e){
            e.target.parentNode.remove();
            let allP = document.querySelectorAll(".oneTask p");
            let newArr = [];
            for(let i = 0;i<allP.length;i++){
                newArr.push(allP[i].innerHTML);
            }
            localStorage.setItem("todoArr",JSON.stringify(newArr));
            console.log(newArr);
        })
   
        let doneBtn = divEle.querySelector(".done");
        doneBtn.addEventListener("click",function(e){
            let taskValue = e.target.nextElementSibling.innerHTML;
            e.target.parentNode.remove();
            let allP = document.querySelectorAll(".oneTask p");
            let newArr = [];
            for(let i = 0;i<allP.length;i++){
                newArr.push(allP[i].innerHTML);
            }
          
            localStorage.setItem("todoArr",JSON.stringify(newArr));
            let completedArr =JSON.parse(localStorage.getItem("completedArr"));
            completedArr.push(taskValue);  
            console.log(completedArr);
            localStorage.setItem("completedArr",JSON.stringify(completedArr))
        })
        let parentDiv = document.querySelector(".tasks");
        parentDiv.appendChild(divEle);
   }
    //here we will get all the tasks which were present inside the tasklists section   
    console.log(todoArr);
})

completedBtn.addEventListener("click",function(){
    if(!completedBtn.classList.contains("active")){
        completedBtn.classList.add("active");
        taskListsBtn.classList.remove("active");
    }

    let allTaskDiv = document.querySelectorAll(".oneTask");
    for(let i = 0;i<allTaskDiv.length;i++){
        allTaskDiv[i].remove();
    }    
    let completedArr = JSON.parse(localStorage.getItem("completedArr"));
     for(let i = 0;i<completedArr.length;i++){
        let divEle = document.createElement("div");
        divEle.setAttribute("class","oneTask");
        divEle.innerHTML = `<p>${completedArr[i]}</p>
        <i class = "material-icons delete">delete</i>`
        
        
        let deleteBtn = divEle.querySelector(".delete");
        deleteBtn.addEventListener("click",function(e){
            e.target.parentNode.remove();
            let allP = document.querySelectorAll(".oneTask p");
            for(let i = 0;i<allP.length;i++){
                newArr.push(allP[i].innerHTML);
            }
            localStorage.setItem("completedArr",JSON.stringify(newArr));
        })
        

        let parentDiv = document.querySelector(".tasks");
        parentDiv.appendChild(divEle);
     }

})



addBtn.addEventListener("click",function(){
    if(isBtnPressed == false){
        let divToAdd = document.createElement("div");
        divToAdd.setAttribute("class","taskToDo");
        divToAdd.innerHTML = `<input type = "text" placeholder = "Enter A Task To ADD">`;
        body.appendChild(divToAdd);

        divToAdd.addEventListener("keypress",function(e){
            
            if(e.key == "Enter"){
                if(e.target.value.length == 0){
                    return;
                }
                let divEle = document.createElement("div");
                divEle.setAttribute("class","oneTask");
                divEle.innerHTML = `<i class = "material-icons done">done</i>
                <p>${e.target.value}</p>
                <i class = "material-icons delete">delete</i>`
                //this will add the task in the todo arr
                todoArr =JSON.parse(localStorage.getItem("todoArr"));
                todoArr.push(e.target.value);
                localStorage.setItem("todoArr",JSON.stringify(todoArr));
                divToAdd.textContent = "";
                // console.log(todoArr);
             
                //this will delete the task from ui
                let deleteBtn = divEle.querySelector(".delete");
                deleteBtn.addEventListener("click",function(e){
                    e.target.parentNode.remove();

                let allP = document.querySelectorAll(".oneTask p");
                let newArr = [];
                for(let i = 0 ;i<allP.length;i++)
                {
                    newArr.push(allP[i].innerHTML);
                }
                localStorage.setItem("todoArr",JSON.stringify(newArr));

                // console.log(newArr);
                
                })

                let doneBtn = divEle.querySelector(".done");
                doneBtn.addEventListener("click",function(e){
                    //this will give us the text which was written inside the p tag
                    let taskValue = e.target.nextElementSibling.innerHTML;
                    console.log(taskValue);
                    e.target.parentNode.remove();
                    let allP = document.querySelectorAll(".oneTask p");
                    let newArr = [];
                    for(let i = 0;i<allP.length;i++)
                    {
                        newArr.push(allP[i].innerHTML);
                    }
                    localStorage.setItem("todoArr",JSON.stringify(newArr));
                    let completedArr =JSON.parse(localStorage.getItem("completedArr"));
                    completedArr.push(taskValue);
                    localStorage.setItem("completedArr",JSON.stringify(completedArr));
                    // console.log(newArr);
                    // console.log(completedArr);

                })
                let parentDiv  = document.querySelector(".tasks");
                parentDiv.appendChild(divEle);
                taskListsBtn.click();
                addBtn.click(); 
            }
            
        })
        isBtnPressed = true;

    }
        else{
            let modal = document.querySelector(".taskToDo");
            modal.remove();
            isBtnPressed = false;
        }


})
