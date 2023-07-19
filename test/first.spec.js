let chai=require('chai');
let chaiHttp=require('chai-http');
const { doesNotThrow } = require('should');
let server=require("../index");

//assertion style
chai.should();

chai.use(chaiHttp);

describe('Task API',()=>{
  describe('get /api/seachItem',()=>{
    it("It should search an item",(done)=>{
      chai.request(server)
      .get('/api/seachItem')
      .end((err,response)=>{
        response.should.have.status(201);
        response.body.should.be.a('array');
        response.body.length.should.be.eq(0);
        
    })
    done();
    
         })
         describe('post /api/create/',()=>{
          it("It should Post a new  user",(done)=>{
            const user={
              
                  name:"ritik",
                  email:"panday.riitik@tftuus.com",
                  password:"pass1234",
                  password2:"pass1234"
                                };
           chai.request(server)
           .post('/api/create/')
            .send(user)
.end((err,response)=>{
              response.should.have.status(200);
              //response.body.should.be.a('array');
              
             
          })
          done()
        
          
               })

})
      

})
})