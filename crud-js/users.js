//CRUD
//C--Create HTTP Methods--POST
//R--Read---GET
//U--Update----PUT
//D---Delete----DELETE

const addUserBtn=document.querySelector(".adduser-btn")
const getUserBtn=document.querySelector(".getuser-btn")
const updateUserBtn=document.querySelector(".updateuser-btn")

const nameTxt=document.querySelector("#name-txt")
const picTxt=document.querySelector("#pic-txt")

const userContainer=document.querySelector(".users-container")

let users=[]
let user={};

//Read operation
function getUsers()
{
    fetch("https://66cc16c84290b1c4f19bdcb0.mockapi.io/users",{method:'GET'})
.then(response=>response.json()).then(data=>{
    // console.log(data)
    users=data
}).then(()=>loadUsers())

}

//Create
addUserBtn.addEventListener('click',()=>{
let name=nameTxt.value
let pic=picTxt.value
// console.log(name,pic)
fetch("https://66cc16c84290b1c4f19bdcb0.mockapi.io/users", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name,pic}),
  }).then(()=>getUsers())
// users.push({name,pic})
})
getUserBtn.addEventListener('click',getUsers)

function deleteUser(id)
{
  fetch(`https://66cc16c84290b1c4f19bdcb0.mockapi.io/users/${id}`,{method:'DELETE'}).then(()=>getUsers())
}

function editUser(id)
{
fetch(`https://66cc16c84290b1c4f19bdcb0.mockapi.io/users/${id}`,{method:GET})
.then(data=>data.json()).then(data=>{
  user=data}).then(()=>{
  console.log(user)
  nameTxt.value=user.name
  picTxt.value=user.pic
})
}

updateUserBtn.addEventListener('click',()=>{
  user.name=nameTxt.value
  user.pic=picTxt.value
  fetch(`https://66cc16c84290b1c4f19bdcb0.mockapi.io/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name:user.name,pic:user.pic}),
  }).then(()=>getUsers())
})

function loadUsers()
{
console.log(users)
let card=""
users.map(user=>card+=`<div class='card'>
    <img src=${user.pic}>
    <h2>${user.name} <i class="bi bi-pencil-square" onclick="editUser(${user.id})"></i>
    <i class="bi bi-trash3" onclick="deleteUser(${user.id})"></i>
    </h2>
    </div>`)
    userContainer.innerHTML=card

}

