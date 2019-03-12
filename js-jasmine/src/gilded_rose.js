class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class RegularItem extends Item {
  update() {
    this.updateSellIn()
    this.updateQuality()
  }

  updateQuality() {
    this.quality -= 1
    if (this.sellIn < 0) this.quality -= 1
    if (this.quality < 0) this.quality = 0
  }

  updateSellIn() {
    this.sellIn -= 1
  }
}

class ConjuredItem extends RegularItem {
  updateQuality() {
    this.quality -= 2
    if (this.sellIn < 0) this.quality -= 2
    if (this.quality < 0) this.quality = 0
  }
}

class LegendaryItem extends RegularItem {
  update() { }
}

class BackstagePassItem extends RegularItem {
  updateQuality() {
    this.quality += 1
    if (this.sellIn <= 10) this.quality += 1
    if (this.sellIn <= 5) this.quality += 1
    if (this.sellIn < 0) this.quality = 0
    if (this.quality > 50) this.quality = 50
  }
}

class AgedBrieItem extends RegularItem {
  updateQuality() {
    this.quality += 1
    if (this.quality > 50) this.quality = 50
  }
}

class ItemFactory {
  setupInventory(items) {
    return items.map(function(item) {
      let constructor = this.itemConstructor(item.name)
      return new constructor(item.name, item.sellIn, item.quality)
    }, this)
  }

  itemConstructor(name) {
    if (name.startsWith("Backstage passes")) { 
      return BackstagePassItem
    } else if (name.startsWith("Aged Brie")) {
      return AgedBrieItem
    } else if (name.startsWith("Conjured")) {
      return ConjuredItem
    } else if (name.startsWith("Sulfuras")) {
      return LegendaryItem
    } else {
      return RegularItem
    }
  }
}

class Shop {
  constructor(items=[]) {
    this.itemFactory = new ItemFactory
    this.items = this.itemFactory.setupInventory(items);
  }

  updateStock() {
    for (var i=0; i < this.items.length; i++) {
      this.items[i].update()
    }

    return this.items
  }
}

module.exports = {
  Item,
  Shop
}
