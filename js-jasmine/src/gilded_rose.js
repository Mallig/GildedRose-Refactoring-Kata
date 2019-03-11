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
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i]
      if (item.name === 'Sulfuras, Hand of Ragnaros') { continue; }

      item.sellIn -= 1

      this.applyQualityModifier(item, this.calculateQualityModifier(item))
    }

    return this.items;
  }

  calculateQualityModifier(item) {
    let modifier
    switch (item.name.slice(0,16)) {
      case 'Aged Brie':
        modifier = -1
        break
      case 'Backstage passes':
        modifier = this.backstagePassQualityModifier(item)
        break
      default:
        modifier = 1 * this.qualityModifierMultiplier(item)
    }

    return modifier
  }

  qualityModifierMultiplier(item) {
    let multiplier = 1

    if (item.sellIn <= 0) { multiplier *= 2 }
    if (item.name.slice(0,8) === 'Conjured') { multiplier *= 2 }

    return multiplier
  }

  applyQualityModifier(item, modifier) {
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
    let modifier = -1

    if (item.sellIn <= 0) { modifier = item.quality }
    if (item.sellIn <= 10) { modifier -= 1; }
    if (item.sellIn <= 5) { modifier -= 1; }

    return modifier
  }
}

module.exports = {
  Item,
  Shop
}
