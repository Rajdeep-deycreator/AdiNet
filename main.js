function sea(){
  window.location.href="search.html"
}
function check(){
var id=localStorage.getItem('i');
if (id===null){
  window.location.href="signup.html"
}else{
  console.log(id)
}
}
check()
function lgout(){
   localStorage.removeItem("i")
   check()
}
history.pushState(null ,"",location.href)
window.onpopstate = function (){
  history.pushState(null,"",location.href)
}
const parent=document.getElementById('recent')
const parent2=document.getElementById('result')

document.getElementById("se").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    var da=document.getElementById("se").value
    if(da !== null){
      let tomestamp= Date.now()
      let key="search@"+tomestamp;
      localStorage.setItem(key,da)
      fs.collection('users').doc(da).get().then((dc)=>{
        var prd=document.createElement('div')
  prd.style.margintop='15px';
  prd.style.color='#FFFFFF';
  prd.style.backgroundcolor=' #000000';
  prd.style.fontsize='16px';
        prd.innerHTML= "<img id=prph ><h6>"+dc.id+"</h6><div id=nan><p>"+dc.data().n+"</p><input type=button id=prb value='go to profile' ></input></div>"
        parent2.appendChild(prd)
        
      })
}
}
})

function display() {
  for(i=0; i < localStorage.length;i++){
    let key=localStorage.key(i)
    if(key.startsWith("search@")){
      
     let valu=localStorage.getItem(key)
    var his=document.createElement('button');
    his.type="button"
    his.value=valu
    his.innerText=valu
    his.setAttribute("id","sbu")
    parent.appendChild(his)
    his.onclick=function () {
      document.getElementById('se').value=this.value
      fs.collection('users').doc(this.value).get().then((dc) => {
      var prd=document.createElement('div')
        prd.style.margintop='15px';
  prd.style.color='#FFFFFF';
  prd.style.backgroundcolor=' #000000';
  prd.style.fontsize='6px';
        prd.innerHTML= "<img id=prph src=/resources/add.png ><h6>"+dc.id+"</h6><div id=nan><p>"+dc.data().n+"</p><input type=button id=prb value='Go to profile'></input></p></div>"
        parent2.appendChild(prd)
        

      })
    }

  }
}
}
display()