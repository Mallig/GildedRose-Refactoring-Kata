var {Shop} = require('../src/gilded_rose.js');
var {Item} = require('../src/items.js')
describe("Gilded Rose", function() {
  var gildedRose, items

  describe("updateQuality", function() {
    it("should not decrease quality below zero", function() {
      gildedRose = new Shop([ new Item("foo", 0, 0) ]);
      items = gildedRose.updateStock();
      expect(items[0].quality).toBeGreaterThanOrEqual(0);
    });

    it("should decrease sellIn by 1 day", function() {
      gildedRose = new Shop([ new Item("foo", 0, 0) ]);
      items = gildedRose.updateStock();
      expect(items[0].sellIn).toEqual(-1);
    });

    describe("for regular items", function() {
      describe("when sellIn value greater than zero", function() {
        it("should decrease item quality by 1", function() {
          gildedRose = new Shop([ new Item("foo", 2, 10) ]);
          items = gildedRose.updateStock();
          expect(items[0].quality).toEqual(9);
        });
      });

      describe("when sellIn value less than or equal to zero", function() {
        it("should decrease item quality by 2", function() {
          gildedRose = new Shop([ new Item("foo", 0, 10) ]);
          items = gildedRose.updateStock();
          expect(items[0].quality).toEqual(8);
        });
      });
    });

    describe("for Sulfuras, Hand of Ragnaros", function() {
      gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 80) ]);
      var sulfuras = gildedRose.updateStock()[0];

      it("should not decrease sellIn value", function() {
        expect(sulfuras.sellIn).toEqual(0);
      });

      it("should not decrease quality", function() {
        expect(sulfuras.quality).toEqual(80);
      });
    });

    describe("for 'Backstage Pass'", function() {
      describe("when sellIn value is greater than 10", function() {
        it("should increase quality by 1", function() {
          gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 12, 10) ]);
          items = gildedRose.updateStock();
          expect(items[0].quality).toEqual(11);
        });
      });

      describe("when sellIn value between 6 and 10 inclusive", function() {
        it("should increase quality by 2", function() {
          gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10) ]);
          items = gildedRose.updateStock();
          expect(items[0].quality).toEqual(12)
        });
      });

      describe("when sellIn value between 1 and 5 inclusive", function() {
        it("should increase quality by 3", function() {
          gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 2, 10) ]);
          items = gildedRose.updateStock();
          expect(items[0].quality).toEqual(13);
        });
      });
    });

    describe("For Aged Brie", function() {
      it("should increase quality by 1", function() {
        gildedRose = new Shop([ new Item("Aged Brie", 3, 10) ]);
        items = gildedRose.updateStock();
        expect(items[0].quality).toEqual(11);
      });

      it("should not increase quality past 50", function() {
        gildedRose = new Shop([ new Item("Aged Brie", 2, 50) ]);
        items = gildedRose.updateStock();
        expect(items[0].quality).toEqual(50);
      });

      describe("when sellIn value reaches zero", function() {
        it("quality should continue to increase", function() {
          gildedRose = new Shop([ new Item("Aged Brie", 1, 10) ]);
          items = gildedRose.updateStock();
          expect(items[0].quality).toEqual(11);
        });
      });
    });

    describe("for 'Conjured' items", function() {
      it("should decrease quality by 2", function() {
        gildedRose = new Shop([ new Item("Conjured Tennis Racket", 5, 20) ]);
        items = gildedRose.updateStock();
        expect(items[0].quality).toEqual(18)
      })
    })
  });
});
