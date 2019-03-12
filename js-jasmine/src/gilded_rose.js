import ItemFactory from './item_factory'

class Shop {
  constructor(items = []) {
    this.itemFactory = new ItemFactory
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
