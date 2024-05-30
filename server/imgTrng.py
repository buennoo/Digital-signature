import numpy as np
import io
import hashlib

class TRNG:
    byteStream = b''
    def get_random_bytes_from_IMG_TRNG(self, size: int, /) -> bytes:
        #print(size)
        if len(self.byteStream)<size:
             
            path = 'thechild.jpg'

            with open(path, 'rb') as f:
                image_data = f.read()
                
            bit_stream = ''.join(format(byte, '08b') for byte in image_data)
            bit_array = np.array([int(bit) for bit in bit_stream])
            flattened_bit_array = bit_array.flatten()
            #print(len(flattened_bit_array))

            for i in range(0, len(flattened_bit_array)):
                    if i % 200 == 0:
                        flattened_bit_array[i] = 1 if flattened_bit_array[i] == 0 else 0

            for i in range(1920, len(flattened_bit_array), 1920):
                block = flattened_bit_array[i -18750: i]
                md5_hash = hashlib.md5()
                md5_hash.update(block)
                hash_hex = md5_hash.hexdigest()
                self.byteStream+= bytes.fromhex(hash_hex)
            
        randomBytes = self.byteStream[:size]
        self.byteStream = self.byteStream[size:]
        # data = np.array(bytearray(byteStream))
        #print(len(randomBytes))
        return randomBytes