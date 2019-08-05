const fs = require('fs');
const path = require("path");
const db = require('../server/pg.js');

// const testJsonFile = path to database
const testJsonFile = path.resolve(__dirname, '../server/db/database.test.json');

describe('database unit tests', () =>{
/**
   * Jest runs the "beforeAll" function once, before any tests are executed.
   * Here, we write to the file and then reset our database model. Then, we
   * invoke the "done" callback to tell Jest our async operations have
   * completed. This way, the tests won't start until the "database" has been
   * reset to an empty Array!
   */
  //beforeAll: function initiating the test state.  Resets the test 
  beforeAll((done) => {
    fs.writeFile(testJsonFile, JSON.stringify([]), () => {
      db.reset();
      done();
    });
  });

  afterAll((done) => {
    fs.writeFile(testJsonFile, JSON.stringify([]), done);
  });

  describe('#sync', () => {
    it('writes a valid entry to the JSON file', () => {
      //create test entry
      // const entry = ..a valid object to test with database goes here;


      //db.sync sends the marketList where it is passed into db.write, which 
      const result = db.sync(entry);
      // market either returns an error or nothing else?
      expect(result).not.toBeInstanceOf(Error);
      // pulls table from reading the contents and parsing the variable, defined above with a absolute path
      const table = JSON.parse(fs.readFileSync(testJsonFile));
      //compare the post and pre, expect them to be equal
      expect(table).toEqual(entry;
    });

    it('ignores already entered id fields on refresh of db', () => {
      // creat test conditionof an id that has already been entered
      // const entry = 
      const initialInput = db.sync(entry);

      expect(initialInput).not.toBeInstanceOf(Error);
      db.sync([]); //replace current data inside of the json file with empty arr
      const marketData = JSON.parse(fs.readFileSync(testJsonFile));
      expect(marketData).not.toEqual(marketList);
    });

    it('does not returns an error when something is wrong with the database input', () => {
      const testCases = [{cards: 1}, {location: 'here'}];

      //f
      
    });


    //NOT SURE IF WE NEED THESE BECAUSE WE'RE SCRAPING FOR DATA,NOT HAVING USER INPUT EXCEPT ON SEARCH TERM

    it('returns an error when input value is blank', () => {
      const testCase = [''];
      const result = db.sync(testCase);
      expect(result).toBeInstanceOf(Error);
    });
}

