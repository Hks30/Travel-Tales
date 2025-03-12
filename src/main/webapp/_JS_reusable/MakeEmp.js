"use strict";

function MakeEmp({
    name = "Unknown Employee",
    title = "Unassigned",
    salary = 0,
    imageUrl = "" 
} = {}) {
    const empObj = document.createElement("div");
    empObj.classList.add("emp");

    const empInfo = document.createElement("div");
    empObj.appendChild(empInfo);

    const display = () => {
        empInfo.innerHTML = `
            <img src="${imageUrl}" alt="${name}" class="emp-image">
            <h2>${name}</h2>
            <p>Title: ${title}</p>
            <p>Salary: ${formatCurrency(salary)}</p>
        `;
    };

    const setTitle = (newTitle) => {
        title = newTitle;
        display();
    };

    const changeSalary = (amount) => {
        const change = Number(amount); 
        if (!isNaN(change)) {
            salary += change; 
            display(); 
        } else {
            console.error("Invalid salary input amount");
        }
    };
    

    // Title change input and button
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    empObj.appendChild(titleInput);

    const titleButton = document.createElement("button");
    titleButton.textContent = "Change Title";
    titleButton.onclick = () => setTitle(titleInput.value);
    empObj.appendChild(titleButton);

    empObj.appendChild(document.createElement("br"));

    // Salary change input and button
    const salaryInput = document.createElement("input");
    salaryInput.type = "number";
    empObj.appendChild(salaryInput);

    const salaryButton = document.createElement("button");
    salaryButton.textContent = "Adjust Salary";
    salaryButton.onclick = () => changeSalary(salaryInput.value);
    empObj.appendChild(salaryButton);

    function formatCurrency(num) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(num);
    }

    display();
    return empObj;
}
