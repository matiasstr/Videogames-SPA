const { Videogame, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Videogame model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Videogame.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should not work when its a only a valid name", async () => {
        await Videogame.create({ name: "Super Mario Bros" }).catch((err) => {
          expect(err.errors[0].message).to.be.equal(
            "videogame.description cannot be null"
          );
          expect(err.errors[1].message).to.be.equal(
            "videogame.parent_plataform cannot be null"
          );
        });
      });

      it("should not work when its a only a valid description", async () => {
        await Videogame.create({
          description: "Super Mario Bros descripcion",
        }).catch((err) => {
          expect(err.errors[0].message).to.be.equal(
            "videogame.name cannot be null"
          );
          expect(err.errors[1].message).to.be.equal(
            "videogame.parent_plataform cannot be null"
          );
        });
      });

      it("should not work when its a only a valid platform", async () => {
        await Videogame.create({
          parent_plataform: ["pc", "xbox"],
        }).catch((err) => {
          expect(err.errors[0].message).to.be.equal(
            "videogame.name cannot be null"
          );
          expect(err.errors[1].message).to.be.equal(
            "videogame.description cannot be null"
          );
        });
      });
      it("It should work given a valid name, platform and description", async () => {
        await Videogame.create({
          name: "Super Mario Bros",
          description: "Super Mario Bros descripcion",
          parent_plataform: ["pc", "xbox"],
        }).then((res) => {
          expect(res.dataValues.name).to.be.equal("Super Mario Bros");
          expect(res.dataValues.created).to.be.equal(true);
          expect(res.dataValues.description).to.be.equal(
            "Super Mario Bros descripcion"
          );
          expect(res.dataValues.released).to.be.equal(null);
          expect(res.dataValues.rating).to.be.equal(null);
          expect(res.dataValues.background_image).to.be.equal(null);
        });
      });
    });
  });
});
