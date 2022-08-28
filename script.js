let addBtn = document.querySelector(".addBtn");
let isBtnPressed = false;
let body = document.querySelector('body');
let taskListsBtn = document.querySelector(".taskLists");
let todoArr = [];
let completedArr = [];





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
                todoArr.push(e.target.value);

                divToAdd.textContent = "";
                console.log(todoArr);
             
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
                console.log(newArr);
                
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
                    completedArr.push(taskValue);
                    console.log(newArr);
                    console.log(completedArr);

                })


                let parentDiv  = document.querySelector(".tasks");
                parentDiv.appendChild(divEle);
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