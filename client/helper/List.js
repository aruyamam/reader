class List {
   constructor(...list) {
      this._list = new WeakMap();
      this._list.set(this, []);
      this._list.get(this).push(...list);
   }

   add(...list) {
      this._list.get(this).push(...list);
   }

   set(...list) {
      this._list.set(this, [...list]);
   }

   remove(listName) {
      let list = this._list.get(this);
      list = list.filter(item => item !== listName);
      this._list.set(this, list);
   }

   get classList() {
      return this._list.get(this).join(' ');
   }

   get get() {
      return this._list.get(this);
   }
}

export default List;
