let main=document.getElementById("all_cart")
fetchdata()
async function fetchdata(){
    try {
        let res= await  fetch(`http://localhost:8080/admin/get`,{
            method:"GET",
            headers:{
                'Content-type':'application/json',
            },
    
          })
          let data= await res.json()
          console.log(data)
         
          display(data)
    } catch (error) {
        console.log(error)
    }
}

function display(data){
    if(data.length==0){
        console.log(data.length)
        main.innerHTML=`<div class="empty"><h1>Currently Order cart is Empty</h1>
        </div>`
    }else{
       
        main.innerHTML=""
        data.forEach(element => {
            let div=document.createElement("div")
            div.setAttribute("class","cart1")
            let imgdiv=document.createElement("div")
            imgdiv.setAttribute("class","imgdiv")
            let infodiv=document.createElement("div")
            infodiv.setAttribute("class","infodiv")
            let img=document.createElement("img")
            img.setAttribute("src",element.image)
            let title=document.createElement("h4")
            title.innerText=element.title
            let des=document.createElement("p")
            des.innerText=element.discription
            let price=document.createElement("h4")
            price.innerText="Price: ₹ "+element.price
            let btn=document.createElement("button")
            btn.innerText="DELETE"
            btn.addEventListener("click",async()=>{
                    try {
                       let res=await fetch(`http://localhost:8080/admin/delete/${element._id}`,{
                        method:"DELETE",
                        headers:{
                            'Content-type':'application/json',
                            'Authorization':`Bearer ${token}`
                        },
                       }) 
                       let data= await res.json()
                       alert(data.message)
                       window.location="admin_order.html"
                    } catch (error) {
                        console.log(error)
                    }
            })
           
            imgdiv.append(img)
            infodiv.append(title,price,des,btn)
            div.append(imgdiv,infodiv)
            main.append(div)
        });
    }
   
}