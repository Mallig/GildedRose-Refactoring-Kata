class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[], backstageItems = ['Backstage passes to a TAFKAL80ETC concert', 'Aged Brie'], legendaryItems = ['Sulfuras, Hand of Ragnaros']) {
    this.items = items;
    this.backstageItems = backstageItems
    this.legendaryItems = legendaryItems
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.legendaryItems.includes(this.items[i].name)) { continue }

      this.items[i].sellIn -= 1

      if (!this.backstageItems.includes(this.items[i].name)) {
        this.updateRegular(this.items[i])
        this.items[i].name.slice(0, 8) === "Conjured" ? this.updateRegular(this.items[i]) : false
      } else {
        this.updateBackstage(this.items[i])
      }
    }

    return this.items;
  }

  updateRegular(item) {
    if (item.sellIn < 0 && item.quality > 1) {
      item.quality -= 2
    } else if (item.quality > 0) {
      item.quality -= 1
    }
  }

  updateBackstage(item) {
    if (item.sellIn <= 0) {
      item.quality = 0
    } else if (item.quality < 50) {
      item.quality += 1;
      if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sellIn < 10 && item.quality < 50) {
            item.quality += 1;
        }
        if (item.sellIn < 5 && item.quality < 50) {
            item.quality += 1;
        }
      }
    }
  }
}

module.exports = {
  Item,
  Shop
}
