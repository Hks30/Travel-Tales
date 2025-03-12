
function MakeEmp_CGF() {
    const employeesDiv = document.createElement("div");
    
    const employees = [

    {
        name: "Bob Smith",
        title: "Product Manager",
        salary: 120000,
        imageUrl: "alex.jpeg"
    },
    {
        // name: "John Doe",
        // title: "UX Designer",
        // salary: 75000,
        // imageUrl: "download.jpeg"
    }
];

employees.forEach(emp => {
    const employeeObj = MakeEmp(emp);
    employeesDiv.appendChild(employeeObj);
});

return employeesDiv; }
