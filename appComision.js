// Cargar el archivo JSON (puedes usar una solicitud HTTP o cargarlo localmente)
const url = "comision.json"; // Ruta al archivo JSON
let grupos = [];
//cargo las listas en los uls
function cargarListaCom(){
    fetch(url)
      .then(response => response.json()) // Analizar el JSON
      .then(data => {
        // Paso 2: Recorrer los elementos y crear la lista
        let ulFaltaExp = document.querySelector(".listaComisiones"); // Crea una lista desordenada
        let ulYaExpuso = document.querySelector(".listaComisionesExpu"); // Crea una lista desordenada
        grupos=data; //cargo el objeto json al array

        data.forEach(item=> {

          const liSinExpo = document.createElement("li"); // Crea un elemento de lista
          liSinExpo.className="listaSinExponer";
          const liYaExpuso = document.createElement("li"); // Crea un elemento de lista
          liYaExpuso.className="listaYaExpuso";
          
          if (item.expocicion =='false') {

            liSinExpo.textContent = item.grupo; // Establece el contenido del elemento de lista que falta exponer
            liSinExpo.appendChild(agregaBoton());
            ulFaltaExp.appendChild(liSinExpo); // Agrega el elemento de lista a la lista desordenado
          } else {
            liYaExpuso.textContent = item.grupo; // Establece el contenido del elemento de lista que ya expuso
            
            ulYaExpuso.appendChild(liYaExpuso); // Agrega el elemento de lista a la lista desordenada
          }
          
        }); 
      })
      .catch(error => {
        console.error("Error al cargar el archivo JSON:", error);
    });
};
cargarListaCom();

let ulFaltaExp = document.querySelector(".listaComisiones"); 
let ulYaExpuso = document.querySelector(".listaNueva");
function agregaBoton(){
  const btoBorrar = document.createElement("button");
  btoBorrar.textContent="X";
  btoBorrar.className ="btn-borrar";

  btoBorrar.addEventListener("click", (e)=>{
    const item = e.target.parentElement;
    console.log(item.textContent);
    const itemLIdDelBtn = item.textContent.slice(0, -1);

    modificarJson(itemLIdDelBtn);
    // console.log(itemLIdDelBtn.slice(0, -1));
    
    ulFaltaExp.removeChild(item);

  });
  return btoBorrar;
};

// Acá debemos modificar el json pero desde el front no podemos debemos desde el back
function modificarJson(itemLIdDelBtn){
 
  fetch(url)
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      // Modificar la exposicion a true
      if (item.grupo === itemLIdDelBtn) {
        console.log("estoy en if " + item.grupo);
        item.expocicion = "true"; //acá debería cambiar el atributo pero no lo hace
      }   
    });

  })
  .catch(error => console.error('Error al cargar el archivo JSON', error));

};
const botonRan = document.getElementById("btnRan");
const valorRandomGrupo = document.getElementById("tituloRan");

botonRan.addEventListener("click", () => {
    // e.preventDefault();
    //recorrer la lista ul y elegir un número
    const listaUl = document.querySelector(".listaComisiones");
    const arrayNuevo = [];
    for (let node of listaUl.childNodes) {
        arrayNuevo.push(node.textContent);
    }
    const indiceAleatorio = Math.floor(Math.random() * (arrayNuevo.length - 1) + 1);
    valorRandomGrupo.innerHTML=indiceAleatorio;
});
