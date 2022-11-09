const changeDog=async()=>{
    const api= await fetch("https://dog.ceo/api/breeds/image/random");
    const response= await api.json();
    const div=document.querySelector("#imgeDog");
    div.innerHTML=`<img src="${response.message}">`

}
setInterval(changeDog,3000);
