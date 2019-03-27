class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class RegularItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
    this.multiplier = 1
  }

  update() {
    this.updateSellIn()
    this.updateQuality()
  }

  updateQuality() {
    this.quality -= 1 * this.multiplier
    if (this.sellIn < 0) this.quality -= 1 * this.multiplier
    if (this.quality < 0) this.quality = 0
  }

  updateSellIn() {
    this.sellIn -= 1
  }
}

class ConjuredItem extends RegularItem {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
    this.multiplier = 2
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

module.exports = {
  Item,
  AgedBrieItem,
  BackstagePassItem,
  ConjuredItem,
  LegendaryItem,
  RegularItem
}