const request = require("supertest")
const assert = require("chai").assert
const server = require("../index.js")
const router = require("../router.js")

const mockReq = {location:"台北市新店區寶中路119號"}
const errMsg = "Calendar Destination is illegal"
const mockAttendee = [{name: "Taco",age: 20,self: true},{name: "Benson",age: 25},{name: "Peter",age: 30}]
const mockAttendee2 = [{name: "Taco",age: 20},{name: "Benson",age: 25},{name: "Peter",age: 30}]

describe("POST /getDestination", () => {
  it("should return latlng from google api", (done) => {
    request(server)
      .post("/getDestination")
      .send(mockReq)
      .expect(200)
      .end((err,res)=>{
        assert.notExists(err)
        assert.exists(res.body.position.lat)
        assert.isNumber(res.body.position.lat)
        assert.exists(res.body.position.lng)
        assert.isNumber(res.body.position.lng)
        done();
      })
  })
  it("should deny empty mockreq", (done) => {
    request(server)
    .post("/getDestination")
    .send({})
    .expect(200)
    .end((err,res)=>{
      assert.notExists(err)
      assert.equal(res.body.errMsg,errMsg)
      done();
    })
  })
})

describe("check findMe function", () => {
  it("should find correct person info", (done) => {
    assert.equal(router.findMe(mockAttendee),0)
    assert.isFalse(router.findMe(mockAttendee2))
    done()
  })
})