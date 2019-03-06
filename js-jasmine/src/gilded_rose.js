class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name === 'Sulfuras, Hand of Ragnaros') { continue }

      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateRegular(this.items[i])
      } else {
        this.updateBackstage(this.items[i])
      }
    }

    return this.items;
  }

  updateRegular(item) {
    if (item.quality > 0) {
      item.quality -= 1
    }
    item.sellIn -= 1
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 1
    }
  }

  updateBackstage(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sellIn < 11) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
        if (item.sellIn < 6) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }
    item.sellIn -= 1
    if (item.sellIn <= 0) {
      item.quality = 0
    }
  }

}

module.exports = {
  Item,
  Shop
}
