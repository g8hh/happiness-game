function format(value){
  if(value.gte(1000)){
    exponent=value.e
    decimal1=value.d[0].toString()
    if(decimal1.length>1){
      decimal2=decimal1.substring(0,1)
      decimal3=decimal1.substring(1,3)
      formatted=decimal2+"."+decimal3+"e"+exponent
      return formatted
    }
    decimal2=value.d[1].toString()
    decimal2=decimal2.substring(0,2)
    formatted=decimal1+"."+decimal2+"e"+exponent
    return formatted
  } else {
    return value.toFixed(2)
  }
}