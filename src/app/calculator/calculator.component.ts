import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { CalculatorServiceService} from './calculator-service.service';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;
  clearNum=false;
  operatorClick=false;
 public memoryValue :number=0;
 public firstNum;
 public SecondNum;
 public result;
  public answer;
  public invoiceData: any[] ;
  public learnersData:  any = []; 
  public listUser:any
  public showHistoryList=false
  
  constructor( private service: CalculatorServiceService) { }

  ngOnInit() {
    
  }
  //function to get the history
  showHistory(){
    this.showHistoryList=true
    this.listUser=localStorage.getItem("History");
    

  }
//Function that get a passed number from input
  public getNumber(v: string){

    console.log(v);
    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
      this.clearNum=false
      this.SecondNum=v;
      this.operatorClick=false;
      
      console.log("second ",v);
      console.log("this is the second  NUmber after the operato ",this.SecondNum);
    }else{
      console.log("first",v);
     
      if (this.currentNumber && this.currentNumber.toString().length < 8){ 
        //if statement that checks if the length on the screen is less than 8 display 
        //either the user is entering number or the function is return the answer
        this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;
        this.firstNum=v;
        console.log("this is the first NUmber before the operator",this.firstNum);
  
      }else{
         this.currentNumber=this.currentNumber;
         this.firstNum=v;
         console.log("this is the first NUmber before the operator",this.firstNum);
      }
      
    }
 
    
   
  }

 

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }

  private doCalculation(op , secondOp){
    switch (op){
      case '+':
      return this.firstOperand += secondOp; 
      case '-': 
      return this.firstOperand -= secondOp; 
      case '*': 
      return this.firstOperand *= secondOp; 
      case '/': 
      return this.firstOperand /= secondOp; 
      case '=':
      return secondOp;
    }
  }
  //function to get the opperator
  public getOperation(op: string){
  
    
    if(this.firstOperand === null){
      this.firstOperand = Number(this.currentNumber);

    }else if(this.operator){

            if(this.operator==='+'){
              console.log("testing  add api ");
              console.log(this.firstNum,this.SecondNum)
           this.service.getAdditionAnswer(this.firstOperand ,Number(this.currentNumber)).subscribe(res => {
            console.log("testing  api anser",res);
            this.answer=res
            this.result=this.answer;
           
            if (String(res).length > 19) {
        
              this.currentNumber = String(res);
              
            } else {
            
            this.currentNumber=String(res).substring(0, 8);
        
              
            }
            let item = this.firstNum +"+"+ this.SecondNum +"=" +this.answer
            localStorage.setItem("History", item );
           // this.result= res
           // this.currentNumber = String(this.result);
           
            });
          }
          if(this.operator==='/'){
            console.log("testing  divide api ");
            this.service.getDivisionAnswer(this.firstOperand ,Number(this.currentNumber)).subscribe(res => {
              console.log("testing  api anser",res);
              this.answer=res
              this.result=this.answer;
              if (String(res).length > 19) {
        
                this.currentNumber = String(res);
                
              } else {
              
              this.currentNumber=String(res).substring(0, 8);
          
                
              }
              let item = this.firstNum +"/"+ this.SecondNum +"=" +this.answer
              localStorage.setItem("History", item );
              });
            }
            if(this.operator==='*'){
              console.log("testing  multiply api ");
              this.service.getMultiplyAnswer(this.firstOperand ,Number(this.currentNumber)).subscribe(res => {
                console.log("testing  api anser",res);
                this.answer=res
                this.result=this.answer;
                if (String(res).length > 19) {
        
                  this.currentNumber = String(res);
                  
                } else {
                
                this.currentNumber=String(res).substring(0, 8);
            
                  
                }
                let item = this.firstNum +"*"+ this.SecondNum +"=" +this.answer
                localStorage.setItem("History", item );
                });
              }
              if(this.operator==='-'){ 
                console.log("testing  mius api ");
                this.service.getSubstractAnswer(this.firstOperand ,Number(this.currentNumber)).subscribe(res => {
                  console.log("testing  api anser",res);
                  this.answer=res
                  this.result=this.answer;
                  if (String(res).length > 19) {
        
                    this.currentNumber = String(res);
                    
                  } else {
                  
                  this.currentNumber=String(res).substring(0, 8);
              
                    
                  }
                  let item = this.firstNum +"-"+ this.SecondNum +"=" +this.answer
                  localStorage.setItem("History", item );
                  });
                }
                console.log("testing  api  this.result", this.result);
            
      this.firstOperand = this.result;
     // alert(this.currentNumber)
      let historyData = {
        num1:this.firstNum,
        oprator: this.operator,
        num2: this.SecondNum,
        answer: this.answer
        
      }
     
      localStorage.setItem("Data", JSON.stringify(historyData));
     
      let invoiceData = JSON.parse(localStorage.getItem("Data"));
      console.log("history you have",invoiceData )

    }
    this.operator = op;
    this.waitForSecondNumber = true;
    this.operatorClick=true;
    
   
   
 
  }

//function to Clear on the Memory Screen using 'AC' Button
  public clear(){
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
    this.operatorClick=false;
  }

  
//Function to clear the new added number from the string of numbers on the calculator screen using 'C' button
  public clearEntry()
  {
   
    if(this.currentNumber === null || this.currentNumber === '')
      {
      
        this.currentNumber = '0';
        this.firstOperand = null;
       this.operator = null;
       this.waitForSecondNumber = false;
      }
      
      if(this.currentNumber !== null || this.currentNumber !== '') {
       
        this.currentNumber=this.currentNumber.slice(0, -1)

      }
    
   
  }
  //function to add on the Memory using 'M+' Button
  addToMemory(currentValue: number): void {
    console.log("value to add on addToMemory",currentValue)
    this.memoryValue   =  this.memoryValue +Number(currentValue);
    console.log("value added on addToMemory",this.memoryValue )
  }
  //function to substract on the Memory using 'M-' Button
  subtractFromMemory(currentValue: number): void {
    this.memoryValue  -= currentValue;
    console.log("value on addToMemory",this.memoryValue )
  }
  //function to recall on the Memory using 'MR' Button
  recallMemory(): number {
  
  this.currentNumber=String(this.memoryValue ) 
  
  
 
    return  this.memoryValue  ;
  }
  
  clearMemory(): void {
    this.memoryValue   = 0;
    console.log("value on recallMemory", this.memoryValue )
  }
  
  
}
