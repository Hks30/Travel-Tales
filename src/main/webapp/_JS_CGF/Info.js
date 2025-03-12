function Info() {

  var ele = document.createElement("div");
  ele.classList.add('info'); // see styling in this file, above...
  ele.innerHTML = `
    <div class="info">
      <h3>Info</h3>
      <p>Hello, I am Himanshi, a senior. I am from India</p>
    </div>
  `;

  return ele;
}