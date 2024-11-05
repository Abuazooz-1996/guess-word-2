//selectnumbers tries and boxes
let numberoftries=6;
let numberofboxes=6;
let currenttries=1;



///get elements from html
let tries=document.querySelector(".tries");
let message=document.querySelector(".message");
//create divs
for(let i=1;i<=numberoftries;i++){
    let trydiv=document.createElement("div");
    trydiv.className=`try try-${i}`;
    let label=document.createElement("label");
    label.textContent=`try${i}`
    trydiv.appendChild(label);
    //disabled trirs
    if( i !==1)trydiv.classList.add("disabled-try");
    for(let j=1;j<=numberofboxes;j++){
        let input=document.createElement("input"); 
        input.maxLength="1" 
        input.className="input"
        input.id=`try-${i}-input-${j}`
        if( i !==1)input.disabled=true
        trydiv.appendChild(input)    
    }
    tries.appendChild(trydiv);
}
//focus on first try
tries.children[0].children[1].focus();

///convert all inputs toUppercase and make focus on it
let allinputs=document.querySelectorAll(".input");
allinputs.forEach((input,index)=>{
    input.addEventListener("input",function(){
        // console.log("hello")
        this.value=this.value.toUpperCase();
        const nextindex=allinputs[index+1];
        if(nextindex)nextindex.focus();

    })
});

//set the words
const words=["create","update","delete","master","branch","Elzero","school"];
//random the words
let random_worsd=words[Math.floor(Math.random()*words.length)].toLowerCase();
// console.log(random_worsd);

let checkbuttons=document.querySelector(".check");
checkbuttons.addEventListener("click",getcheck);
console.log(random_worsd);
function getcheck(){
    let successful=true;
    // console.log("hello")
    for(let i=1; i<=numberofboxes;i++){
        const inputs=document.querySelector(`#try-${currenttries}-input-${i}`)
        const letter=inputs.value.toLowerCase()
        const currentletter=random_worsd[i-1];
        // console.log(letter);
        // console.log(inputs.value);
        ///check if letter right or false
        // console.log("right");
        if(letter===currentletter){
            inputs.classList.add("right");
        }else if(random_worsd.includes(letter)&&letter!==""){
            inputs.classList.add("not_right");
            successful=false;
        }else{
                inputs.classList.add("wrong");
                successful=false;
        }    
    }

    //check if you win or lose
    if(successful){
        console.log("you win");
        const currenttry=document.querySelector(".tries>div");
        currenttry.classList.add("disabled-try");
        checkbuttons.classList.add("disabled-try");
        // checkbuttons.disabled="true";
        message.innerHTML=`Congrats, You Win The Word Is <span>(${random_worsd.toUpperCase()})<span/>`
        // message.style.backaground="blue"
    }else{
        console.log("you lose");
        const currenttry=document.querySelector(`.try-${currenttries}`);
        currenttry.classList.add("disabled-try");
        currenttries++
        const nexttry=document.querySelector(`.try-${currenttries}`);
        const allnextinputs=document.querySelectorAll(`.try-${currenttries} .input`);
        nexttry.classList.remove("disabled-try");
        // allnextinputs.classList.remove("disabled-try")
        // console.log(nexttry);
        allnextinputs.forEach((nin)=>{
            nin.disabled=false;
        });
        message.innerHTML=`Sadly You Lose <span>Try again<span/>`
        console.log(`number of try ${numberoftries}`);
        if(nexttry){
            nexttry.children[1].focus();
        }else{
            checkbuttons.disabled=true;
        }
        // console.log(checkbuttons)

    }
}



////get alltries except first one
// let alltries=document.querySelectorAll(".try:not([disabled])");
// alltries.forEach((tr)=>console.log(tr));
function handleback(event){
    if(event.key==="Backspace"){
      let allinputsnotdiabled=document.querySelectorAll(".input:not([disabled])");
      currentindexofbox=Array.from(allinputsnotdiabled).indexOf(document.activeElement);
    //   allinputsnotdiabled.forEach((inp)=>{console.log(inp)});
    //   console.log(currentindex)
    if(currentindexofbox>0){
        const currentbox=allinputsnotdiabled[currentindexofbox];
        const prevbox=allinputsnotdiabled[currentindexofbox-1];
        currentbox.value="";
        prevbox.value="";
        prevbox.focus();
    }
    }
}
// function enter(ev){
//     if(ev.key==="Enter"){
//       checkbuttons.addEventListener("click",getcheck);
//     //   checkbuttons.disabled=true
//       console.log("enter")
//     }
// }

document.addEventListener("keydown",handleback);
// console.log(document.activeElement);
