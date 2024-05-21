#!/usr/bin/python3
""" Basic dictionary """
BaseCaching = __import__("base_caching").BaseCaching


class BasicCache(BaseCaching):
    """BasicCache class"""

    def put(self, key, item):
        """put function"""
        if key and item:
            self.cache_data

    def get(self, key):
        """get function"""
        return self.cache_data(key)
