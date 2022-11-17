const opcionestriptomonedas=async()=>{
    const url="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

    const respuesta= await fetch(url);
    const resultado=await respuesta.json();

    console.log(resultado);
    let selectCripto=document.querySelector("#cryptomoneda");
    let opcionesHTML=`
    <option  value="">-Selecciona- </option>`;

    resultado.Data.map(option=>{
        opcionesHTML+=`<option value ="${option.CoinInfo.Name}"> ${option.CoinInfo.FullName}</option>`;

    });
    selectCripto.innerHTML=opcionesHTML;
}
    const CotizarMoneda=()=>{
        const moneda=document.querySelector("#moneda").value;
        const cripto=document.querySelector("#cryptomoneda").value;
 
        if(moneda=='' || cripto==''){
         mostrarError("msj-error","FALATA SELECCIONAR CAMPOS");
            return;
        }

        cotizar(moneda, cripto);
        }
   
    const mostrarError=(elemento, mensaje)=>{
        divError=document.querySelector(elemnto);
        divError.innerHTML=`<p class="red darken-4 error">${mensaje} </p>`;
        setTimeout(()=>{divError.innerHTML=``;},2000);
    }
    
    