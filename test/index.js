const assert = require("assert")
const path = require("path")
const fsdb = require("../lib")

const config = {
  data: path.join(__dirname, "data"),
  inheritFrom: "common"
}

describe("fsdb", () => {

  let db

  beforeEach(() => fsdb.default(config).then((data) => { db = data }))

  it("should construct full tree", () => {
    assert.deepEqual(db, [
      {
        title: "Sample",
        slug: "",
        path: [""]
      }, {
        slug: "authors",
        path: [""]
      }, {
        title: "Books",
        slug: "books",
        path: [""]
      }, {
        type: "book",
        slug: "goodbye",
        path: ["books"],
        title: "Goodbye",
        body: ""
      }, {
        title: "John Smith",
        body: "",
        slug: "john",
        path: ["authors"]
      }, {
        type: "book",
        slug: "something",
        path: ["books"],
        title: "Something"
      }
    ])
  })

})
