/**
 * Client side library that evaluates mathematical expression.
 * Consumers of the library can use the evaluate method to pass in a 
 * string mathematical expression and retrieve a floating evaluated value
 * 
 * Invalid expressions will result in "error"
 * 
 * Floating point is used as the mathematical operations can result in decimal value numbers.
 *  
 */

/*
  This is an internal method.
  Handles parsing of the input string expression and convert into an internal representation (Expression) which
  can be evaluated. The method uses two stacks to parse the string character by character distinguishing between
  operands such as numbers and operators such as (+/-*). One stack holds the numbers and upon pop performs operation on the numbers. 
  The second stack holds operators and upon popping performs the operation on the number stack. 
  */
 let parse = (exp) =>
 {
    exp = exp.toString();
    var i = 0;
    var check = false;
    var values = [];
    var operators = [];
   
   
    while (i < exp.length) {
       
        var start = i;
        var c = exp.charAt(i++); 
    
        if (c == ' ')
            continue;
 
        if (check) {
            if (c == ')') {
                var operator;
                while (!operators.length==0 && ((operator = operators.pop()) != '('))
                    TreeNode(operator, values);
                continue;
            }
            check = false;
            var operator = c;
           
            while (!operators.length==0  && (operators[operators.length-1] != ')') && order(operators[operators.length-1]) >= order(operator))
                TreeNode(operators.pop(), values);
            operators.push(operator);
            continue;
        }
 
        if (c == '(') {
        
            operators.push('(');
            continue;
        }
 
        check = true;
       
        while (i < exp.length) {
 
            c = exp.charAt(i);
          
            if (((c < '0') || (c > '9')) && (c != '.') && !c.match(/[a-z]/i))
                break;
 
             i++;
        }
   
        var op = exp.substring(start, i);
        if(!op.includes("sin") && !op.includes("cos") && !op.includes("tan"))
            values.push(parseFloat(op));
       else
          values.push(op);
    }
 
    while (!operators.length == 0) {
        var operator = operators.pop();
        if (operator == '(')
            throw "error";
        TreeNode(operator, values);
    }
 
    var exp = values.pop();
    if (!values.length == 0)
        throw "error";
    return exp;
 }
 
  /**
  * Parsed tree representation holding left and right node which itself can be evaluated and the operator on which
  * the two nodes are operated.
  */

class ParseTree  {
   constructor(leftNode,  operator,  rightNode) {
       this.leftNode = leftNode;
       this.operator = operator;
       this.rightNode = rightNode;
   }
      /**
      * Method checks if left / right node value is ParseTree or number and then either parses node further or evaluates expression 
      */
     eval () {
    
     var leftVal, rightVal;
     

      if(typeof(this.leftNode) == 'object')
         leftVal = parse(this.leftNode).eval();
      else
         leftVal = this.leftNode;
       if(typeof(this.rightNode) == 'object') 
      {
         var par =  parse(this.rightNode);
       
         if(par!=null)
         rightVal = par.eval();
       
      }
      else 
         rightVal = this.rightNode;
      return this.result(leftVal, rightVal);
   
   }

   /**
    * Method checks if current expression is trig function and evaluates
    * 
    */
   trigresult(value)
   {
        if(value.includes('sin'))
           {
            var val = value.split('sin')[1];
            value = Math.sin(val);
            return value;
           }
           else if (value.includes('cos'))
           {
            var val = value.split('cos')[1];
            value = Math.cos(val);
            return value;
           }
           else if(value.includes('tan'))
           {
              var val = value.split('tan')[1];
              value = Math.tan(val);
              return value;
           }
       
   }

   result (leftVal , rightVal)
   {
      
      if(leftVal ==  null)
         leftVal = this.leftNode;
      else if(typeof(leftVal)=='string')
      {
         leftVal = this.trigresult(leftVal);
      }
    
      if(rightVal == null)
         rightVal = this.rightNode;
      else if(typeof(rightVal)=='string')
         {
            rightVal = this.trigresult(rightVal);
         }
         

       switch(this.operator)
      {
         case '+' : return parseFloat(leftVal) + parseFloat(rightVal); 
         case '-' : return parseFloat(leftVal) - parseFloat(rightVal); 
         case '/' : return parseFloat(leftVal) / parseFloat(rightVal); 
         case '*' :  return parseFloat(leftVal) * parseFloat(rightVal);
      }
    
   }


    toString () {
       return "(" + this.leftNode + " " + this.operator + " " + this.rightNode + ")";
   }
}

/**
 * Specifies the order of evaluation of operators
 *  
 */
let order = (operator) =>{
  
   if(operator == '/')
      return 4;
   else if (operator == '*')
      return 3;
   else if (operator == '+')
      return 2; 
   else if (operator == '-')   
        return 1;

}
let TreeNode = (operator, values) => {
   var rightNode = values.pop();
   var leftNode = values.pop();
   values.push(new ParseTree(leftNode, operator, rightNode));
}

let evaluate = (exp) =>{
 
  if(exp == "")
     return "0";
   var expression = parse(exp);
   var e = expression.eval();
   return(e);
  
}
export default evaluate;
