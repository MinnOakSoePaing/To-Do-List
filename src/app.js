const app = document.querySelector("#app");

const textInput = document.querySelector("#textInput")
const addBtn = document.querySelector("#addBtn")
const doneCount = document.querySelector("#doneCount")
const totalCount = document.querySelector("#totalCount")
const listGroup = document.querySelector("#listGroup")
const listTemplate = document.querySelector("#listTemplate")


const updateCount = () => {
     totalCount.innerText = countListTotal();
     doneCount.innerText = countDoneList();
}

const countListTotal = () => {
     return document.querySelectorAll(".list").length
}

const countDoneList = () => {
     return document.querySelectorAll(".list .checkBox:checked").length
}

const createList = (inputValue) => {
     const list = listTemplate.content.cloneNode(true);
     const listText = list.querySelector(".listText")
     const delBtn = list.querySelector(".list-del-btn")
     const editBtn = list.querySelector(".list-edit-btn")
     const checkBox = list.querySelector(".checkBox")

     listText.innerText = inputValue;





     // delBtn.addEventListener("click", deleteList)
     // checkBox.addEventListener("change", checkList)
     // editBtn.addEventListener("click", editList)

     // editBtn.addEventListener("click", () => {
     //      const input = document.createElement("input")
     //      input.type = "text";
     //      input.className = "border border-zinc-700 px-3 focus-visible:outline-none"
     //      listText.after(input)
     //      input.value = listText.innerText;
     //      input.focus();
     //      listText.classList.toggle("hidden")

     //      input.addEventListener("blur", () => {
     //           listText.innerText = input.value;
     //           listText.classList.toggle("hidden")
     //           input.remove();
     //      })
     // })

     //check
     // checkBox.addEventListener("click", () => {
     //      console.log("Checked");
     //      listText.classList.toggle("line-through");
     //      updateCount();
     // })

     //delete
     // delBtn.addEventListener("click", () => {
     //      // if (confirm("Are you sure you want to delete this item?")) {list.remove(); }
     //      // confirm("Are you sure you want to delete?") ? list.remove():""

     //      confirm("Are you sure you want to delete?") && list.remove();
     //      updateCount();

     // })

     // delBtn.addEventListener("click", delFunction)
     // editBtn.addEventListener("click", editFunction)

     return list;
}

//handler
const addList = () => {
     console.log("Clicked");
     listGroup.append(createList(textInput.value))
     updateCount();
     textInput.value = null
}

const deleteList = (event) => {
     // console.log(event.target);
     // console.log(event.parentElement.parentElement.parentElement);
     const list = event.target.closest(".list")
     if (confirm("Are you sure you want to delete?")) {
          list.classList.remove("animate__fadeInUp")
          list.classList.add("animate__shakeX")
          list.addEventListener("animationend", () => {
               list.remove();
               updateCount();
          })

     }

}

const checkList = (event) => {
     const listText = event.target.nextElementSibling;
     listText.classList.toggle("line-through")
     console.log(event.target);
     updateCount();
}

const editList = (event) => {
     const list = event.target.closest(".list")
     const listText = list.querySelector(".listText")

     const input = document.createElement("input")
     input.type = "text";
     input.className = "border border-zinc-700 px-3 focus-visible:outline-none"
     input.value = listText.innerText;
     listText.after(input)
     input.focus()
     listText.classList.toggle("hidden")

     input.addEventListener("blur", updateList)
}

const updateList = (event) => {
     //console.log(event.target); //input
     const list = event.target.closest(".list")
     const listText = list.querySelector(".listText")
     listText.innerText = event.target.value
     event.target.remove();
     listText.classList.toggle("hidden")
}

const listGroupHandler = (event) => {
     // console.log(event.target);
     if (event.target.classList.contains("list-del-btn")) {
          deleteList(event)
     }
     else if (event.target.classList.contains("list-edit-btn")) {
          editList(event)

     }
     else if (event.target.classList.contains("checkBox")) {
          checkList(event)

     }
}



//listener
addBtn.addEventListener("click", addList);

textInput.addEventListener("keyup", (event) => {
     event.key === "Enter" && addList();
})

listGroup.addEventListener("click", listGroupHandler)