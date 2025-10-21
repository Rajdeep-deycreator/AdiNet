var i;
var emai;
var dp;

function log(a,b) {
 auth.signInWithEmailAndPassword(a,b).then(()=>{
   console.log("loged in")
 }
 ).catch((error)=>{
   alert("could not login because:"+error.message)
  
 })
}
function check(){
 id=localStorage.getItem('i');
 emai=localStorage.getItem('e')
if (id===null || emai===null){
  window.location.href="signup.html"
}else{
  var checkEmail=localStorage.getItem("e")
  var checkPass=localStorage.getItem('pass')
  log(checkEmail,checkPass)
  console.log(id)
  console.log(emai)
  fs.collection(emai).doc("personal_data").get().then((pdata)=>{
  dp=pdata.data().dp
console.log(dp)
sessionStorage.setItem("d",dp)
sdp()
prdp()
}).catch((error)=>{
  console.log(error.message)
}
)

}

}
check()
function lgout(){
   localStorage.clear()
   check()
}
const parent=document.getElementById('recent')
const parent2=document.getElementById('result')

document.getElementById("se").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    parent2.innerHTML=""
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
      parent2.innerHTML=""
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
var topcred=document.getElementById('top')
topcred.innerHTML += emai
}
display()

function sea(){
  window.location.href="search.html"
}
var downloadlink;

function subb(param) {
  var fil=document.getElementById('pi').files[0]
  var upn=document.getElementById('upn')
  var upnvalue=upn.value
  if(fil){
    console.log(fil.name)
    const storgref=stor.ref(emai+'/'+'dp/'+fil.name)
    const metadata={
      contentType:'image/jpeg'
    }
    
    // Start the file upload
        const uptask = storgref.put(fil, metadata);

        // Listen for state changes, errors, and completion
        uptask.on('state_changed', (snap) => {
          // Progress updates
          const prog = (snap.bytesTransferred / snap.totalBytes) * 100;
          const sr = document.createElement('div');
          sr.innerHTML = prog + '% uploaded';
          document.body.appendChild(sr);
        }, (error) => {
          // Handle upload errors
          alert('Upload error: ' + error.message);
        }, () => {
          // Upload completed successfully, get download URL
         uptask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);;
            downloadlink=downloadURL;
            console.log(emai)
            if(upnvalue !==""){
  const creden={
    n:document.getElementById('upn').value,
    dp:downloadlink
  }
  fs.collection(emai).doc('personal_data').update(creden).then(()=>{
    alert("sucess")
  }).catch((error)=>{
    alert(error.message)
  })
            }else{
              const creden={
    dp:downloadlink
  }
  fs.collection(emai).doc('personal_data').update(creden).then(()=>{
    alert("sucess")
  }).catch((error)=>{
    alert(error.message)
  })
  
            }
          }).catch((error) => {
            console.error('Error getting download URL:', error);
          });
         
        
  })
  }else{
    const creden={
      n:document.getElementById('upn').value
    }
    fs.collection(emai).doc('personal_data').update(creden).then(()=>{
      alert('sucess')
    }
    ).catch((error)=>{
      alert(error.message)
    }
    )
  }
  
  
  
}
fs.collection(emai).doc("personal_data").get().then((pdata)=>{
  dp=pdata.data().dp
}).catch((error)=>{
  alert(error.message)
}
)
function sdp() {
  var prbu=document.getElementById('prpic')
  
  var dpp=sessionStorage.getItem("d")
  console.log("prpic="+dpp)
  prbu.src=dpp
  prbu.style.height="100px";
  prbu.style.width= "100px";
  prbu.style.borderRadius= "50%";
  prbu.style.display= "block";
  prbu.style.objectFit= "cover";
  


}
async function prdp() {
  try {
    // Wait for #prof element to be loaded
    await new Promise(resolve => {
      const intervalId = setInterval(() => {
        const prof = document.getElementById('prof');
        if (prof) {
          clearInterval(intervalId);
          resolve();
        }
      }, 100); // Check every 100ms
    });

    var dp = await sessionStorage.getItem('d');
    console.log("display" + dp);
    var prof = document.getElementById('prof');
    prof.style.width = '20px';
    prof.style.height = '20px';
    prof.style.borderRadius = '50%';
    prof.style.borderWidth = '0';
    prof.style.marginLeft = '50px';
    prof.style.marginTop = '2px';
    prof.style.backgroundImage = `url(${dp})`;
  } catch (error) {
    alert(error.message);
  }
}
prdp()
check()
