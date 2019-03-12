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
    let stockList = []
    for (var i=0; i < items.length; i++) {
      stockList.push(this.create(items[i].name, items[i].sellIn, items[i].quality))
    }
    return stockList
  }

  create(name, sellIn, quality) {
    if (name.startsWith("Backstage passes")) { 
      return new BackstagePassItem(name, sellIn, quality)
    } else if (name.startsWith("Aged Brie")) {
      return new AgedBrieItem(name, sellIn, quality)
    } else if (name.startsWith("Conjured")) {
      return new ConjuredItem(name, sellIn, quality)
    } else if (name.startsWith("Sulfuras")) {
      return new LegendaryItem(name, sellIn, quality)
    } else {
      return new RegularItem(name, sellIn, quality)
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
