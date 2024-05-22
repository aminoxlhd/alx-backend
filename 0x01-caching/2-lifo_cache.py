#!/usr/bin/python3
"""LIFO Caching"""
BaseCaching = __import__("base_caching").BaseCaching


class LIFOCache(BaseCaching):
    """LIFOCache class"""

    def __init__(self):
        """init function"""
        super().__init__()

    def put(self, key, item):
        """put function"""
        if key and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                removed = list(self.cache_data.keys())[-1]
                self.cache_data.pop(removed)
                print("DISCARD: {}".format(removed))
            self.cache_data[key] = item

    def get(self, key):
        """get fucntion"""
        return self.cache_data.get(key)
