const express = require('express');
const fetch = require('node-fetch');
const db = require('./pg');
const router = express.Router();




router.get('/', (req, res) => {
  fetch('https://hacker-news.firebaseio.com/v0/item/160705.json?print=pretty')
  .then((res)=>res.json())
  .then((data)=>{
    let {id, by, text, descendants, kids, score, time, title, type } = data; // destructuring the incoming response
    const dataFields = [id, by, text, descendants, kids, score, time, title, type]; 
    if (!kids){
      kids = []
    }
    // structure to obtain keys and values of valid data
    const dataFilter = [{id:id},{by:by},{text:text},{descendants:descendants},{kids:kids.length},{score:score},{time:time},{title:title},{type:type}]; 
    const newData = dataFilter.filter((data,index)=>{
      return dataFields[index]
    })  // filtering all undefined values


    // removing all nonalphanumeric characters from strings for SQL Insert Query

    const formattedData = newData.map((item)=>{
      let potentialString = Object.values(item)[0] // removing all nonalphanumeric characters from strings
      if (typeof potentialString === 'string'){
        return  "'" + potentialString.replace(/\W/g, ' ') + "'" // wrapping SQL insert for strings in single quotes 
      } else {
        return potentialString
      }
    })

    // columns of values specified in the get request
    const columns = newData.map((datafield)=>{
      return Object.keys(datafield)[0]
    }) // obtaining keys from all valid data in our objects
  
    const params = columns.join(',')
    const vals = formattedData.join(',')
    console.log(newData)
    console.log(params)
    console.log(vals)

    // const dynamicQuery = `INSERT INTO mastertable (${params}) VALUES (${vals})`
    const testQuery = `INSERT INTO mastertable (${params}) VALUES (${vals})`

      db.query(testQuery, (err,res)=>{
        if (err) {
          console.log(err)
          return err;
        } 
        return res
      })
    // res.status(200).send('success')
  })
  // .catch((err)=>{
  //   console.log(err)
  // })
})

module.exports = router;