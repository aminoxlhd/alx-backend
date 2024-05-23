#!/usr/bin/python3
"""LFU Caching"""
BaseCaching = __import__("base_caching").BaseCaching


class LFUCache(BaseCaching):
    """LFUCache function"""

    def __init__(self):
        """init function"""
        super().__init__()
        self.freq = {}

    def put(self, key, item):
        """put function"""
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key] = item
            self.frequency[key] += 1
            self.usage_order.move_to_end(key)
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                min_freq = min(self.frequency.values())
                least_freq_keys = [
                    k for k, v in self.frequency.items()
                    if v == min_freq
                ]
                if len(least_freq_keys) > 1:
                    for k in least_freq_keys:
                        if k in self.usage_order:
                            key_to_discard = k
                            break
                else:
                    key_to_discard = least_freq_keys[0]

                del self.cache_data[key_to_discard]
                del self.frequency[key_to_discard]
                del self.usage_order[key_to_discard]
                print(f"DISCARD: {key_to_discard}")

            self.cache_data[key] = item
            self.frequency[key] = 1
            self.usage_order[key] = True

    def get(self, key):
        """get function"""
        if key in self.cache_data:
            self.freq[key] += 1
            return self.cache_data.get(key)
