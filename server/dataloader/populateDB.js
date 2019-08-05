const fetch = require('node-fetch');
const db = require('../pg');

// declaring variables outside of function scope so they can be incremented at each recursive call
var first = 2916618
var second = first + 12000

// 12k requests every 25 seconds to HN API  & writing to our database

function request() {
  console.log(first,second)
  for (let i = first;i<=second;i++){
    // console.log('fetch sent')
    fetch(`https://hacker-news.firebaseio.com/v0/item/${i}.json?print=pretty`)
    .then((res)=>res.json())
    .then((data)=>{
      let {id, by, text, descendants, kids, score, time, title, type } = data; // destructuring the incoming response
      const dataFields = [id, by, text, descendants, kids, score, time, title, type]; 
      if (!kids){ // if kids is undefined -- usually an array
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
            return err;
          } 
        })
    })
    .catch((err)=>{
    })
    }
    
    setTimeout(()=>{
      first = first + 12001
      second = second + 12000
      request()
    },25000)
}



request()