
function sayHello(num){
    let newNum = num*2
    return newNum;
}

function add(num1,num2){
    let result = sayHello(num1);
    let sum = result + num2;
    return sum;
}
add(2,4)

module.exports = {add,sayHello: sayHello};

