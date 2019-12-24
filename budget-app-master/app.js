




//****************************************************************************** */
// ................BUDGETCONTROLLER MODULE......................................
var BudgetController=(function(){
    var Expenses=function(id,description,value){
        console.log("value"+value)
        this.id=id
        this.description=description
        this.value=value
        this.percentage=-1
      // console.log("ttttttttttttttttt"+this.value)

    } 
    Expenses.prototype.calcpercentage=function(totalvalue){
     if(totalvalue>0){
       // console.log("this.value is :"+this.value)
     this.percentage=Math.round((this.value/totalvalue)*100)
     }
     else{
        this.percentage=-1
     }
     Expenses.prototype.getpercentage=function(){
         
         return this.percentage
     }


    }
    var Incomes=function(id,description,value){
        this.id=id
        this.description=description
        this.value=value

    } 
// DATASTURCTURE OBJECT
    var data={
        alldata:{
        exp:[],
        inc:[]
        },
        totaldata:{
            exp:0,
            inc:0
        },

        budget:0,
        percentage:-1

    
    }
    var sumcalculation=function(type){

        

            var sum=0;
            data.alldata[type].forEach(function(cur){
                sum+=cur.value
                
            })
            data.totaldata[type]=sum;
             
       
    }

     

    return {
    
        addnewitem: function(type,des,val){
            var id;
            var NewItem;
            // CALCULATING ID VALUE 
            if((data.alldata[type].length)>0){


            id=data.alldata[type][data.alldata[type].length-1].id+1
        }else{
            id=0
        }
        // CHECKING WETHER INPUT IS INC OR EXP

            if(type==='inc'){
               NewItem=new Incomes(id,des,val) 
            }

            else if(type==='exp'){
                NewItem=new Expenses(id,des,val)
            }
  +
           // PUSHING THE VALUES TO DATA STURCTURE 

           data.alldata[type].push(NewItem)
           return NewItem
            
        },
        test: function(){
            return(data)
          
        },
        calculatepercentage: function(){
            data.alldata.exp.forEach(function(cur){
                cur.calcpercentage(data.totaldata.inc)
            })
        

        },
        getpercentages: function(){
            var allpercents=data.alldata.exp.map(function(cur){
                return cur.getpercentage()
            })
            //console.log(allpercents)
            return allpercents
        },
        budgetcalculation: function(){
        
            sumcalculation('inc')
            sumcalculation('exp')
            // if(!data.alldata['inc'].length){
            //     data.totaldata.inc = 0                
            // }
            // if(!data.alldata['exp'].length){
            //     data.totaldata.exp = 0                
            // }
              
            data.budget=data.totaldata.inc-data.totaldata.exp
            console.log(data.totaldata.inc)

            if(data.totaldata.inc>0){
             data.percentage=Math.round((data.totaldata.exp/data.totaldata.inc)*100)
            }
            else{
                data.percentage=-1;
            }
             // console.log(percentage)
            //  return{getbudget: function(){
            //       bude
              
            //     //totalinc: data.totaldata.inc,
            //            // totalexp: data.totaldata.exp,
            //         //    {
            //         //     budget: data.budget,
            //         //     percents: percentage
            //         //    }

            //  }}



        //    return {getbudget: function(){ { 
        //    {
                
        // }
        // } 
        // }
        // return { getbudget: function(){
        //     totalinc: data.totaldata.inc,
        //         totalexp: data.totaldata.exp,
        //         budget: data.budget,
        //         percent: percentage,
        //     }
       // }

        //}

  

        },

        getbudget: function(){
            return {
                budget: data.budget,
                //percentage: data.percentage,
                totinc: data.totaldata.inc,
                totalexp: data.totaldata.exp,
                percenta:data.percentage,
                budget: data.budget

            }
        },
        deleteitem: function(type, id){
            // we can't select id with respect to position bcz the might not be order so
            // trying tricking to know the index of the element
            var ids,index
            //console.log(type)
            //console.log(id)
            //******************* trying to get the existing id  */
            ids= data.alldata[type].map(function(current){
                // console.log(current+"&"+current.id)
                //console.log("hiiiiii")
                return current.id
            })
            //console.log(ids)
            //*********************among that id's find the id of element that we want to delete */
            var index=ids.indexOf(id)
            if(index!==-1){
                data.alldata[type].splice(index,1)
                console.log(data.alldata[type])
            }
            
        },


    }
    
})();
//.........................UI CONTROLLER MODULE.............................
var UIController=(function(){
    // MAKING LOCAL COPIES OF HTML VARIABLES 

    var DOMstrings={

        type:'.add__type',
        description:'.add__description',
        value:'.add__value',
        button:'.add__btn',
        expensecontainer:'.expenses',
        incomecontainer:'.income',
        budgetvalue:'.budget__value',
        incomevalue:'.budget__income--value',
        incomepercent:'.budget__income--percentage',
        expensevalue:'.budget__expenses--value',
        expensepercentage: '.budget__expenses--percentage',
        container:'.container',
        percntageselement:'.item__percentage',
        dateLabel:'.budget__title--month'



    }

  var formatNumber=function(num,type){


var num,dec,int,numsplit,type
num=Math.abs(num);
num=num.toFixed(2)
numsplit=num.split(".")
int=numsplit[0]
if(int.length>3){
int= int.substr(0,int.length-3)+","+int.substr(int.length-3,3)
}
dec=numsplit[1]


return ((type==="exp")?"-":"+")+""+int+"."+dec





 }
 function foreachfunc(fields,callback){
    //  console.log(fields)
          //console.log(fields.length,)
         for(i=0;i<fields.length;i++){
         // console.log("hiiiiii")
             callback(fields[i],i) 
         }

      }
    
     return {
         getinputdata: function(){
         return {
             // GETTING INPUT
            type:document.querySelector(DOMstrings.type).value,
            description: document.querySelector(DOMstrings.description).value,
          value: parseFloat(document.querySelector(DOMstrings.value).value),
         }

         },

         getdomstring: function(){
          return { DOMstrings }
         },
         addnewitemui: function(obj,type){
             // creating html string with placeholder text
            var html;
            if(type==='inc'){
            element=DOMstrings.incomecontainer
            html= '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if(type==='exp') {
                element=DOMstrings.expensecontainer

            html= '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">10%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } 
            //replacing the placeholder text with some actual data
            
            newhtml=html.replace('%id%',obj.id)
            newhtml=newhtml.replace('%description%',obj.description)
            newhtml=newhtml.replace('%value%',formatNumber(obj.value,type))
            //inserting the html in the dom
            document.querySelector(element).insertAdjacentHTML('beforeend',newhtml)
            
         },
         deletelistitems: function(selectorId){
             var el=document.getElementById(selectorId)
             el.parentElement.removeChild(el)
         },

         displaybudget: function(obje){
              if(obje.budget>0){
                  type="inc"
              }else{
                  type="exp"
              }
            document.querySelector(DOMstrings.budgetvalue).textContent=formatNumber(obje.budget,type) 
            document.querySelector(DOMstrings.incomevalue).textContent=formatNumber(obje.totinc,"inc")
           // document.querySelector(DOMstrings.incomepercent).textContent=
            document.querySelector(DOMstrings.expensevalue).textContent=formatNumber(obje.totalexp,"exp")
           

            if(obje.totinc>0){
                document.querySelector(DOMstrings.expensepercentage).textContent=obje.percenta+'%'
            }
            else{
                document.querySelector(DOMstrings.expensepercentage).textContent='--'
            }
           


         },
          

         uppercentages: function(percentagess){
            //console.log("hello")
            var nodevalues= document.querySelectorAll(".item__percentage")
                //onsole.log("..............."+nodevalues)
            

            foreachfunc(nodevalues,function(item,index){
                //console.log("wwwwwwwwwwwwwwwwww"+item+index)
                if(index>=0){



                    //console.log(item)
                    //console.log("@@@@@"+item)
                    item.textContent=percentagess[index]+'%'
                }
                else{
                    item.textContent='--'
                }
        
            })  

           

         },
         displaydate: function(){
          
            var month,months,year,now;
            now=new Date()
            months=["January","Febraury", "March","April","May","June","July","Agust","September","October","November","December"]
            year=now.getFullYear()
            //console.log(year)
            month=now.getMonth()
            // console.log(month)
            // console.log(months[month])
            document.querySelector(DOMstrings.dateLabel).textContent=months[month] +" "+year


         },
         change: function(){
            
        var fields=document.querySelectorAll(DOMstrings.type+","+DOMstrings.value+","+DOMstrings.description)
        console.log(fields)
        foreachfunc(fields,function(cur){
            //console.log(cur)
           cur.classList.toggle('red-focus')
        })
        document.querySelector(DOMstrings.button).classList.toggle('red')
        
    
    },


         clearvariables: function(){

           fields= document.querySelectorAll(DOMstrings.description+','+DOMstrings.value)
           fieldarr=Array.prototype.slice.call(fields)
            fieldarr.forEach(function(current,index,array){
                current.value=""

                
            });

            fieldarr[0].focus()
         },
         

         
     }
     
})()

//........................CONTROLLER MODULE.......................................

var Controller=(function(bdgcntrl,uicntrl){



    //PRACTICE CODE
    // var z=BudgetController.publictest(100)
    // return {anotherpublictest: function(){

    //     console.log(z)

    // }}
    // WRAPPING ALL EVENT LISTERNER IN EVENTLISNERS FUNCTION

    var eventlisternerss=function(){
        var domstrings=uicntrl.getdomstring();
        //console.log(domstrings)
    //console.log("application has started ")
    console.log(domstrings)
        
       // document.querySelector('.add__btn').addEventListener('click',additem)
    
    document.querySelector(domstrings.DOMstrings.button).addEventListener('click',additem)
    document.querySelector(domstrings.DOMstrings.container).addEventListener('click',ctrldeleteitem)
   document.querySelector(domstrings.DOMstrings.type).addEventListener('change',uicntrl.change)
    document.addEventListener('keypress',function(event){
        
        if(event.keyCode===13||event.which===13)
        additem()
        //console.log("it works")
    })
    
    

    }
    // controlling the deletion of items 
var ctrldeleteitem=function(event){
    var itemID,splitID,type,Ids
     itemID = event.target.parentNode.parentNode.parentNode.parentNode.id
     if(itemID){
         splitID=itemID.split('-')
         type=splitID[0]
         Ids=parseInt((splitID[1]))
         console.log(type+'&'+Ids)

// delete the element from datastucture
bdgcntrl.deleteitem(type,Ids)

//delete the ui of the element
uicntrl.deletelistitems(itemID)

// update budget and ui 
updatebudget()
upadatepercentage()






     }
},
 upadatepercentage=function(){
    //calculate the percentage
    bdgcntrl.calculatepercentage()
    // read the percenrages from the budget controller
    var percentages=bdgcntrl.getpercentages()
    console.log(percentages)
    // update the ui with new percentages
      uicntrl.uppercentages(percentages)
}
    

var updatebudget=function(){
    // calucate budget
    bdgcntrl.budgetcalculation()
    var budget=bdgcntrl.getbudget()
    console.log(budget)
// var budgets=BudgetController.getbudget()
// console.log(budgets)
    // retrn budget
    //update ui
    uicntrl.displaybudget(budget)










}

// var calcbudget=function(){
//     // calculate budget
//updatebudget()
     

//     // return budget 


//     // update the budget ui

// }













// ADD ITEM FUNCTION 
    var  additem=function(){
        //console.log(" it works")
        var newitem, userinput



        // filtering the wrong inputs//

        
//,,,,,,,,,,,,,,,,,,,,,,,,,,,,, get the field input,,,,,,,,,,,,,,,,,,,
     userinput=uicntrl.getinputdata()

     if(userinput.description!==0&&!isNaN(userinput.value)&& userinput.value>0)
     {
        console.log(userinput)
        // var domstrings=uicntrl.getdomstring();
       // console.log(domstrings)
       //,,,,,,,,,,,,,,,,,,,,,,,,add the item to budget controller,,,,,,,,,,
      newitem=bdgcntrl.addnewitem(userinput.type,userinput.description,userinput.value)
      //,,,,,,,,,,,,,,,,,,,,,,,,,,adding the new item to ui,,,,,,,,,,,,,,,,,  
      uicntrl.addnewitemui(newitem,userinput.type)

      updatebudget()

      // updating the percenatges
      upadatepercentage()
   //clearing fields
     // ,,,,,,,,,,,,,,,,,,,,,,,,,,,clearing the input,,,,,,,,,,,,,,,,,,,,,,,,,,
   uicntrl.clearvariables()
      //console.log(newitem)
     }
    }
    // PRACTICE CODE 
    // document.querySelector('button').addEventListener('click',additem)



    // document.addEventListener('keypress',function(event){
    //     if(event.keyCode===13||event.which===13)
    //     additem()
    //     //console.log("it works")
    // })
    //,,,,,,,,,,,,,,,,,,,,,,,calculate and update ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,


    return {
        init: function(){
            console.log("application has started")
            uicntrl.displaybudget({totinc: 0,
                totalexp: 0,
                percenta:-1,
                budget: 0

            })
            eventlisternerss()
            uicntrl.displaydate()
        }
    }

})(BudgetController,UIController)
// CALLING INIT FUNCTION TO START APPLICATION 
Controller.init();


