#!/usr/bin/python3
"""FIFO caching"""
BaseCaching = __import__("base_caching").BaseCaching


class FIFOCache(BaseCaching):
    """FIFOCache class"""

    def __init__(self):
        """init function"""
        super().__init__()

    def put(self, key, item):
        """put function"""
        if key and item:
            if key in self.cache_data:
                self.cache_data[key] = item
                return

            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                item_discarded = self.key_indexes.pop(0)
                del self.cache_data[item_discarded]
                print("DISCARD:", item_discarded)

            self.cache_data[key] = item
            self.key_indexes.append(key)

    def get(self, key):
        """get function"""
        return self.cache_data.get(key)

