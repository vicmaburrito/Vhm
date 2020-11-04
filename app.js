const tabla = document.getElementById("tabla");

function abrir() {
    const ventanaAdd = document.querySelector('.addGasto');
    ventanaAdd.classList.toggle('show')
}

function save(){

    // INPUTS VALUE
    let titulo = document.getElementById("Titulo").value;
    let gasto = document.getElementById("Gasto").value;
    let descrip = document.getElementById("Descrip").value;

    //VERIFICAR
    if(titulo.length == 0 ){
        const tituloInput = document.getElementById('tituloInput');
        document.getElementById('Titulo').focus();
        tituloInput.classList.add("danger");
        return;
    }else{
        tituloInput.classList.remove("danger")
    }
    if(gasto.length == 0 ){
        console.log(gasto)
        const gastoInput = document.getElementById('gastoInput')
        document.getElementById('Gasto').focus();
        gastoInput.classList.add("danger");
        return;
    }else{
        tituloInput.classList.remove("danger")
    }
    if(descrip.length == 0 ){
        const descripInput = document.getElementById('descripInput')
        document.getElementById('Descrip').focus();
        descripInput.classList.add("danger");
        return;
    }else{
        descripInput.classList.remove("danger")
    }


    // JUNTAR TODO EN UN OBJETO
    const gastoValue = {
        titulo: titulo,
        gasto: gasto,
        descrip: descrip
    }

    if(localStorage.getItem("Gastos") == null){
        let gastos = [];
        gastos.push(gastoValue);
        localStorage.setItem("Gastos", JSON.stringify(gastos));
    }else{
        let gastos = JSON.parse(localStorage.getItem("Gastos"))
        gastos.push(gastoValue);
        localStorage.setItem("Gastos", JSON.stringify(gastos))
    }

    document.getElementById("Titulo").value = "";
    document.getElementById("Gasto").value = "";
    document.getElementById("Descrip").value = "";

    abrir();
    getTable();
}

function getTable(){

    if(!(localStorage.getItem("Gastos") == null)){
        
        let gastos = JSON.parse(localStorage.getItem("Gastos"))
        console.log(gastos)
        
        tabla.innerHTML = ``;
        for(x = 0; x < gastos.length; x++){
    
            let titulo = gastos[x].titulo;
            let gasto = gastos[x].gasto;
            let descrip = gastos[x].descrip;

            if(descrip.length > 10){
                let descripMin = gastos[x].descrip.split("").slice(0,8).join("");

                tabla.innerHTML += `
                <tr class="cuerpo">
                    <td class="move" onclick="modal('${titulo}', '${gasto}', '${descrip}')">${titulo}</td> 
                    <td class="move" onclick="modal('${titulo}', '${gasto}', '${descrip}')">S/${gasto}</td> 
                    <td class="move" onclick="modal('${titulo}', '${gasto}', '${descrip}')">${descripMin}...</td> 
                    <td onclick="removeTable('${titulo}')" class="icon" ><i class="far fa-trash-alt"></i></td>
                </tr>   
                `;
            }else{
                tabla.innerHTML += `
                <tr class="cuerpo">
                    <td class="move" onclick="modal('${titulo}', '${gasto}', '${descrip}')">${titulo}</td> 
                    <td class="move" onclick="modal('${titulo}', '${gasto}', '${descrip}')">S/${gasto}</td> 
                    <td class="move" onclick="modal('${titulo}', '${gasto}', '${descrip}')">${descrip}</td> 
                    <td onclick="removeTable('${titulo}')" class="icon" ><i class="far fa-trash-alt"></i></td>
                </tr>   `;
            }
    
        }
    }
    gastosTotales()
}

function removeTable(titulo){

    let gastos = JSON.parse(localStorage.getItem("Gastos"));
    console.log(gastos);

    for(x = 0; x < gastos.length; x++){
        if( gastos[x].titulo == titulo){
            gastos.splice(x, 1);
        }
    }

    localStorage.setItem("Gastos", JSON.stringify(gastos));
    getTable();
    gastosTotales();
}

function gastosTotales(){
    let tablaTotal = document.getElementById("Total");
    let dineros = JSON.parse(localStorage.getItem("Gastos"));
    console.log(dineros.length)
    let gastosTotal = 0;

    if(dineros.length == 0){
        tablaTotal.innerHTML = `<p>Gastos totales:</p> <span>S/ 0</span>`;
    }else{
        for(x = 0; x < dineros.length; x++ ){
    
            let dinero = Number(dineros[x].gasto);
            gastosTotal = gastosTotal + dinero;
            tablaTotal.innerHTML = `<p>Gastos totales:</p> <span>S/ ${gastosTotal}</span>`;
        }
    }
    
}
getTable()
gastosTotales()

function modal(titulo, gasto, descrip){

    const modal = document.getElementById("Modal");
    const modalContetn = document.getElementById("modalContetn");
    modal.classList.toggle("modalShow");

    modalContetn.innerHTML = `

    <header onclick="modal()">
        <i class="fas fa-times"></i>
    </header>

    <div class="titulo">Administrar tus gastos</div>
        <div class="textos">
            <div class="texto texto-cab">
            <p>Titulo: </p>
            <span>${titulo}</span>
        </div>
        <div class="texto texto-cab">
            <p>Monto: </p>
            <span>${gasto}</span>
        </div>
        <div class="texto">
            <p>Descripción: </p>
            <span>${descrip}</span>
    </div>
</div>
    
    `;
}