/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const { connect } = require("../../src/app.js");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);

const videogame = {
  name: "Juan martin del potro",
  description: "juego de mario",
  released: "12-12-12",
  rating: 4,
  parent_plataform: ["pc"],
  background_image:
    "https://i.pinimg.com/564x/17/93/7c/17937c5624135c85cae6f10f58e2f496.jpg",
  genre: ["Educational", "Card"],
  created: true,
};
const videogameError_name = {
  // name: "Juan martin del potro",
  description: "juego de mario",
  released: "12-12-12",
  rating: 4,
  parent_plataform: ["pc"],
  background_image:
    "https://i.pinimg.com/564x/17/93/7c/17937c5624135c85cae6f10f58e2f496.jpg",
  genre: ["Educational", "Card"],
  created: true,
};
const videogameError_parent_plataform = {
  name: "Juan martin del potro",
  description: "juego de mario",
  released: "12-12-12",
  rating: 4,
  // parent_plataform: [ 'pc' ],
  background_image:
    "https://i.pinimg.com/564x/17/93/7c/17937c5624135c85cae6f10f58e2f496.jpg",
  genre: ["Educational", "Card"],
  created: true,
};
const videogameError_description = {
  name: "Juan martin del potro",
  // description: "juego de mario",
  released: "12-12-12",
  rating: 4,
  parent_plataform: ["pc"],
  background_image:
    "https://i.pinimg.com/564x/17/93/7c/17937c5624135c85cae6f10f58e2f496.jpg",
  genre: ["Educational", "Card"],
  created: true,
};

describe("Videogame routes", function () {
  before(function () {
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  });

  describe("POST /videogames", function () {
    beforeEach(function (done) {
      Videogame.sync({ force: true })
        // .then(() => Videogame.create(videogame))
        .then(() => done());
    });
    
    it("responds with 200", () =>
      agent.post("/videogames").then((res) => {
        expect(200);
      })).timeout(10000);



    it("responds with an array", () =>
      agent
        .post("/videogames")
        .send(videogame)
        .then((res) => {
          expect(typeof res.body).to.be.equal("object");
          expect(res.body.description).to.be.equal(videogame.description);
          expect(res.body.name).to.be.equal(videogame.name);
          expect(res.body.released).to.be.equal(videogame.released);
          expect(res.body.rating).to.be.equal(videogame.rating);
          expect(res.body.parent_plataform).to.be.eql(
            videogame.parent_plataform
          );
          expect(res.body.background_image).to.be.equal(
            videogame.background_image
          );
          expect(res.body.created).to.be.equal(videogame.created);
        }));

    it("Throw error if name is missing", () =>
      agent
        .post("/videogames")
        .send(videogameError_name)
        .then(
          () => {},
          (err) => {
            expect(err.body).to.be.equal(
              "notNull Violation: videogame.name cannot be null"
            );
          }
        ));

    it("Throw error if parent_plataform is missing", () =>
      agent
        .post("/videogames")
        .send(videogameError_parent_plataform)
        .then(
          () => {},
          (err) => {
            expect(err.body).to.be.equal(
              "notNull Violation: videogame.parent_plataform cannot be null"
            );
          }
        ));

    it("Throw error if description is missing", () =>
      agent
        .post("/videogames")
        .send(videogameError_description)
        .then(
          () => {},
          (err) => {
            expect(err.body).to.be.equal(
              "notNull Violation: videogame.description cannot be null"
            );
          }
        ));
  });
});
