const delay = (ms=1000)=> new Promise( (res, rej) => setTimeout(res,ms))

export default delay
