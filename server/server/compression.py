from io import BytesIO
from PIL import Image
from django.core.files import File
 
 
class ImageCompression():
 
   @staticmethod
   def compress(image, resize=None):
       if image is None:
           return image
       try:
           im = Image.open(image)
           im = im.convert('RGB')
           new_name = image.name.split('.')[0] + '.jpg'
          
           # create a BytesIO object
           im_io = BytesIO()
          
           # resize image
           if resize:
               w, h = im.size
               im = im.resize((resize['width'], resize['height']), Image.ANTIALIAS)
           im.save(im_io, 'JPEG', quality=70)
           # save image to BytesIO object
           new_image = File(im_io, name=new_name)
           return new_image
       except Exception:
           return image