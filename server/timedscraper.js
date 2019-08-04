const fetch = require('node-fetch');
const db = require('./pg');


var first = 563141
var second = first + 10000

function request() {
  console.log(first,second)
  for (let i = first;i<=second;i++){
    // console.log('fetch sent')
    fetch(`https://hacker-news.firebaseio.com/v0/item/${i}.json?print=pretty`)
    .then((res)=>res.json())
    .then((data)=>{
      let {id, by, text, descendants, kids, score, time, title, type } = data; // destructuring the incoming response
      const dataFields = [id, by, text, descendants, kids, score, time, title, type]; 
      if (!kids){ // if kids is undefined
        kids = []
      }
      // structure to obtain keys and values of valid data
      const unfilteredData = [{id:id},{by:by},{text:text},{descendants:descendants},{kids:kids.length},{score:score},{time:time},{title:title},{type:type}]; 
      const filteredData = unfilteredData.filter((data,index)=>{
        return dataFields[index] // filtering all undefined values
      })  
      const formattedData = filteredData.map((item)=>{
        let potentialString = Object.values(item)[0] 
        if (typeof potentialString === 'string'){
          return  "'" + potentialString.replace(/\W/g, ' ') + "'" // removing non-alphanumeric chars & wrapping SQL insert for strings in single quotes 
        } else {
          return potentialString
        }
      })
      // columns of values specified in the get request
      const columns = filteredData.map((datafield)=>{
        return Object.keys(datafield)[0]
      }) // obtaining keys from all valid data in our objects
      const columnString = columns.join(',')
      const valueString = formattedData.join(',')
      const testQuery = `INSERT INTO mastertable (${columnString}) VALUES (${valueString})`
        db.query(testQuery, (err,res)=>{
          if (err) {
            console.log(err)
            return err;
          } 
        })
    })
    .catch((err)=>{
    })
    }
    
    setTimeout(()=>{
      first = first + 10001
      second = second + 10000
      request()
    },25000)
}



request()