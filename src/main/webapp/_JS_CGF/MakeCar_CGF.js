function MakeCar_CGF() {

    var ele = document.createElement("div");

    var myCar = MakeCar({ condition: "awesome", price: 12500 });
    ele.appendChild(myCar);

    var yourCar = MakeCar({});
    ele.appendChild(yourCar);

    return ele;
}