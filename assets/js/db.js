'use strict'

const DB_VERSION = 2,
      DB_NAME = 'Vinisync'

class DB {
  constructor(){
    this.db = null
    this.connected = null
  }

  open(){
    if (!window.indexedDB)
      throw new Error('indexedDB is not supported')

    this.connected = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION)
      request.onerror = event => {
        reject(event.target.errorCode)
      }
      request.onsuccess = event => {
        this.db = event.target.result
        resolve()
      }
      request.onupgradeneeded = async event => {
        this.db = event.target.result
        await this._defineSchema()
        resolve()
      }
    })
    return this.connected
  }

  _defineSchema(){
    console.debug(`upgrade needed, version ${DB_VERSION}`)
    return new Promise((resolve, reject) => {
      var objectStore = this.db.createObjectStore('vins', { keyPath: 'id', autoIncrement: true })
      objectStore.transaction.oncomplete = resolve
    })
  }

  getEntry(id){
    return new Promise((resolve, reject) => {
      const t = typeof id
      switch(t){
        case 'string': id = parseInt(id, 10); break
        case 'number': break
        default: return reject(new Error('invalid id')); break
      }

      var transaction = this.db.transaction(['vins'], 'readonly'),
          coll = transaction.objectStore('vins'),
          req = coll.get(id),
          entry

      req.onsuccess = (e) => {
        entry = e.target.result
      }
      transaction.oncomplete = (e) => { resolve(entry) }
      transaction.onerror = reject
    })
  }

  getEntries(){
    return new Promise((resolve, reject) => {
      var entries = []
      var objectStore = this.db.transaction('vins').objectStore('vins')
      objectStore.openCursor().onsuccess = event => {
        var cursor = event.target.result
        if (cursor) {
          entries.push(cursor.value)
          cursor.continue()
        }
        else {
          console.debug('cursor finished')
          resolve(entries)
        }
      }
    })
  }

  saveEntry(entry){
    if (!entry) return Promise.reject(new Error('entry is undefined'))

    var transaction = this.db.transaction(['vins'], 'readwrite'),
        collection = transaction.objectStore('vins'),
        req = collection.add(entry),
        newKey

    req.onsuccess = (e) => {
      newKey = e.target.result
      console.log('success, new key: ' + newKey)
      // console.log(e)
    }
    req.onerror = (e) => {
      console.error('add request error: ')
      console.error(e)
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {resolve(newKey)}
      transaction.onerror = reject
    })
  }

  updateEntry(entry){
    if (!entry) return Promise.reject(new Error('entry is undefined'))

    return new Promise(async (resolve, reject) => {
      var transaction = this.db.transaction(['vins'], 'readwrite'),
          coll = transaction.objectStore('vins'),
          req = coll.get(entry.id),
          result

      await new Promise((resolve, reject) => {
        req.onsuccess = resolve
        req.onerror = reject
      })
      // result.target.result = entry

       coll.put(entry)
       transaction.oncomplete = (e) => {resolve(entry)}
       transaction.onerror = reject
    })
  }

}
