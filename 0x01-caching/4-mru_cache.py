#!/usr/bin/python3
"""MRU Caching"""
BaseCaching = __import__("base_caching").BaseCaching


class MRUCache(BaseCaching):
    """class MRUCache"""

    def __init__(self):
        """init function"""
        super().__init__()
        self.order = []

    def put(self, key, item):
        """put function"""
        if key and item is None:
            pass
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                removed = self.order.pop()
                self.cache_data.pop(removed)
                print("DISCARD: {}".format(removed))
            self.cache_data[key] = item
            self.order.append(key)

    def get(self, key):
        """get function"""
        if key in self.cache_data:
            self.order.remove(key)
            self.order.append(key)
            return self.cache_data.get(key)
