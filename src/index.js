import { Request } from "./requests";
import { UI } from "./ui";

//elementleri seçme

const form=document.getElementById("employee-form");
const nameInput=document.getElementById("name");
const departmentInput=document.getElementById("department");
const salaryInput=document.getElementById("salary");
const employeesList=document.getElementById("employees");
const updateEmployeeButton=document.getElementById("update");

const request=new Request("http://localhost:3000/employees");
const ui=new UI(employeesList,updateEmployeeButton,nameInput,departmentInput,salaryInput);

eventListeners();
function eventListeners() {
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    form.addEventListener("submit",addEmployee);
    employeesList.addEventListener("click",UpdateOrDelete);
}
function getAllEmployees() {
    request.get()
    .then(emp=>ui.getAllEmployeesToUi(emp))
    .catch(err=>console.log(err));
}

function addEmployee(e) {
    if (nameInput.value.trim()===""||departmentInput.value.trim()===""||salaryInput.value.trim()==="") {
        alert("Lütfen tüm alanları doldurunuz.");
    } else {
        request.post({name:nameInput.value.trim(),department:departmentInput.value.trim(),salary:Number(salaryInput.value.trim())})
    .then(emp=>ui.addToUi(emp))
    .catch(err=>console.log(err));
    alert("Kişi başarıyla eklendi.");
    ui.clearInputs();
    }
    e.preventDefault();
}

function UpdateOrDelete(e) {
    if(e.target.id==="delete-employee"){
        deleteEmployee(e.target);
    }
    else if(e.target.id==="update-employee"){
        updateEmployee(e.target.parentElement.parentElement);
    } 
}

function deleteEmployee(params) {
    const id=params.parentElement.previousElementSibling.previousElementSibling.textContent;
    if(confirm("Emin misiniz?")){
        request.delete(id)
        .then(emp=>{
            console.log(emp);
            ui.deleteEmployeeFromUi(params.parentElement.parentElement);
        })
        .catch(err=>console.log(err));  
    }
}

function updateEmployee(params) {
    ui.updateToUi(params);
    const id=params.children[3].textContent;
    updateEmployeeButton.addEventListener("click",function () {
        request.put(id,{name:nameInput.value.trim(),department:departmentInput.value.trim(),salary:Number(salaryInput.value.trim())})
        .then(emp=>ui.updateEmployeeFromUi(emp,params))
        .catch(err=>console.log(err));
    });
}
