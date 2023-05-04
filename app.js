
const btn = document.querySelector('#btn');
const date = new Date();

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let fullDate=date.getDate()+"-"+month[date.getMonth()]+"-"+date.getFullYear();

displayData()

btn.addEventListener('click',function(){

     const title = document.querySelectorAll('.inputs')[0]
     const note = document.querySelectorAll('.inputs')[1]
   

     const titleValue = title.value;
     const noteValue = note.value;
      

     const Student = localStorage.getItem('Student');
       
     if(Student === '' || Student=== null ){
        studentData =[]
     }else{
       studentData = JSON.parse(Student)
      //  console.log(studentData)
     }

     const itemObj = {
        sTitle:titleValue,
        sNote:noteValue,
        sTime:fullDate.toString(),
      }

    if (titleValue === '' || noteValue === ''){
        alert('Please enter a valid input')
      }else{
        studentData.push(itemObj);
      }


      localStorage.setItem('Student',JSON.stringify( studentData) );


      title.value='';
      note.value='';



      displayData();


})


function displayData(){
    let studentInfo = localStorage.getItem('Student')
     const divUi = document.querySelector('.display-Container')  
  
     if(studentInfo === ''|| studentInfo === null){
      studentArr= []
     }else{
        studentArr = JSON.parse(studentInfo)
      
     }
  
     let DataUi = ' ';

     studentArr.forEach(function(value){
        DataUi +=`

        
        <div class="box">
        <br>
          <p> ${value.sTitle} </p>
          <p> ${value.sNote}  </p>
         <button class='deleteBtn' type="submit">Delete</button>
         <button class='editBtn' type="submit">Edit</button>
         <p style="text-align:right;margin-top:10%;"> ${value.sTime}  </p>
            
        </div>

        `
     });
  
   
     if(studentArr.length !=0){
      divUi.innerHTML =DataUi
     }else{
        divUi.innerHTML=`<h1>NO    DATA <br><br>    PLEASE     ADD    NOTES</h1>`;
     }
  
     deleteStudent();
     updateStudent();

  }


  function deleteStudent(){
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    let studentInfoDel= localStorage.getItem('Student');

 
   deleteBtn.forEach(function(dBtn,index){
     dBtn.addEventListener('click',function(){

      
   
      if(studentInfoDel !== ''|| studentInfoDel !== null){
         let studentArrDel = JSON.parse(studentInfoDel) ;

          if(studentArrDel.length>1){
            studentArrDel.splice(index, 1);
          }else if(studentArrDel.length==1){
            studentArrDel.shift();
          }

          localStorage.setItem('Student',JSON.stringify( studentArrDel) );
       }
      //
     
          
      displayData();

     })
   })
 }



 function updateStudent(){
  const deleteBtn = document.querySelectorAll('.editBtn');
  let studentInfoDel= localStorage.getItem('Student');


  deleteBtn.forEach(function(uBtn,index){
    uBtn.addEventListener('click',function(){
     
      //  alert("re enter your deatil in application");
      const title = document.querySelectorAll('.inputs')[0]
      const note = document.querySelectorAll('.inputs')[1]
    
 
      const titleValue = title.value;
      const noteValue = note.value;

      if(titleValue !=='' && noteValue !==''){

              if(studentInfoDel !== ''|| studentInfoDel !== null){
               let  studentArrDel = JSON.parse(studentInfoDel) ;
        
                if(studentArrDel.length>=1){
                  studentArrDel.splice(index, 1,{ sTitle:titleValue,sNote:noteValue,sTime:fullDate.toString()});  
                  
                }
                
                localStorage.setItem('Student',JSON.stringify( studentArrDel));
                title.value='';
                note.value='';
             }

       }else{
        alert("To Update the Note Enter Title and Note In the Input Fileds and Then Click Edit button")
       }
   
        
   
    displayData();

     
    })
  })


  


 }