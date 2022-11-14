const loadBreed=async()=>{
    const url=await fetch("https://dog.ceo/api/breeds/list/all");
    const res=await url.json();
    let comboBreed=document.querySelector("#breed");
    data=res.message;
    Object.keys(data).forEach(key => {
        comboBreed.innerHTML+=`
        <option value="${key}">${key}</option>`
    });
}

const changeDog=async(breed)=>{
    const url=await fetch(`https://dog.ceo/api/breed/${breed}/images/random/5`);
    const res=await url.json();
    let comboDog=document.querySelector("#dog");
    data=res.message;
    comboDog.innerHTML="";
    data.map(imgDog=>{
        comboDog.innerHTML+=`
        <div class="card" style="width: 18rem;">
  <img src="${imgDog}" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">${breed}</p>
  </div>
</div>`
    })
}