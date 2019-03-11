class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]) {
    this.items = items;
  }

  updateQuality() {
    const sellInModifier = 1
    
    for (var i = 0; i < this.items.length; i++) {
      var qualityModifier
      let item = this.items[i]
      if (item.name === 'Sulfuras, Hand of Ragnaros') { continue; }

      item.sellIn -= sellInModifier

      qualityModifier = this.calculateQualityModifier(item)
      this.adjustQuality(item, qualityModifier)
    }

    return this.items;
  }

  calculateQualityModifier(item) {
    let result
    switch (item.name.slice(0,16)) {
      case 'Aged Brie':
        item.sellIn <= 0 ? result = item.quality : result = -1
        break
      case 'Backstage passes':
        result = this.backstagePassQualityModifier(item)
        break
      default:
        result = 1
    }

    if (item.sellIn <= 0) {
      result *= 2
    }
    if (item.name.slice(0,8) === 'Conjured') {
      result *= 2
    }

    return result
  }

  adjustQuality(item, modifier) {
    while (modifier !== 0 && item.quality < 50 && item.quality > 0) {
      if (modifier < 0) {
        item.quality += 1
        modifier++
      } else {
        item.quality -= 1
        modifier--
      }
    }
  }

  backstagePassQualityModifier(item) {
    let result = 0

    if (item.sellIn <= 0) {
      result = item.quality
    } else if (item.quality < 50) {
      result -= 1;
      if (item.sellIn < 10) { result -= 1; }
      if (item.sellIn < 5) { result -= 1; }
    }
    return result
  }
}

module.exports = {
  Item,
  Shop
}
