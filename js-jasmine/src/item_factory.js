import { RegularItem, ConjuredItem, LegendaryItem, AgedBrieItem, BackstagePassItem } from './items'

export default class ItemFactory {
  setupInventory(items) {
    return items.map(function (item) {
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