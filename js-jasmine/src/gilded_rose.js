import ItemFactory from './item_factory'

class Shop {
  constructor(items = [], itemFactory = ItemFactory) {
    this.itemFactory = new itemFactory
    this.items = this.itemFactory.setupInventory(items);
  }

  updateStock() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].update()
    }

    return this.items
  }
}

module.exports = {
  Shop
}
