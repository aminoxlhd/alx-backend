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
            if key and item:
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    removed = next(iter(self.cache_data))
                    self.cache_data.pop(removed)
                    print("DISCARD: {}".format(removed))
                self.cache_data[key] = item

    def get(self, key):
        """get function"""
        return self.cache_data.get(key)

