export const calculate = (cant:Number) => {
    const array = [];
    for (let i = 0; i <= cant; i++) {
        let num:Number = Math.floor(Math.random()*10000)
        array.push(num)
      }
    return array;
};

process.on("message", (cant:Number) => {
    
    const array = calculate(cant);
    (<any>process).send(array)
    
  });