export class UI{
    constructor(employeesList,updateButton,nameInput,departmentInput,salaryInput){
        this.employeesList=employeesList;
        this.updateButton=updateButton;
        this.nameInput=nameInput;
        this.departmentInput=departmentInput;
        this.salaryInput=salaryInput;
    }
    getAllEmployeesToUi(emp){
        emp.forEach(element => {
            this.employeesList.innerHTML+=`
            <tr>
                                            
             <td>${element.name}</td>
             <td>${element.department}</td>
             <td>${element.salary}</td>
             <td>${element.id}</td>
             <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
             <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
           </tr>
            `;
        });
    }
    clearInputs(){
        this.nameInput.value="";
        this.departmentInput.value="";
        this.salaryInput.value="";
    }
    addToUi(emp){
        this.employeesList.innerHTML+=`
            <tr>
                                            
             <td>${emp.name}</td>
             <td>${emp.department}</td>
             <td>${emp.salary}</td>
             <td>${emp.id}</td>
             <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
             <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
           </tr>
            `;
    }
    deleteEmployeeFromUi(element){
        element.remove();
    }
    updateToUi(params){
        if(this.updateButton.style.display==="none"){
        this.updateButton.style.display="block";
        this.nameInput.value=params.children[0].textContent;
        this.departmentInput.value=params.children[1].textContent;
        this.salaryInput.value=params.children[2].textContent;
        }else{
            this.updateButton.style.display="none";
            this.clearInputs();
        }
    }
    updateEmployeeFromUi(employee,element){
        element.children[2].textContent=employee.salary;
        element.children[1].textContent=employee.department;
        element.children[0].textContent=employee.name;

        this.updateButton.style.display="none";
        this.clearInputs();
    }
}