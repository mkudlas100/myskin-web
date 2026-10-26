# Vyříznutí pozadí u vybraných fotek (spouští se v GitHub Actions, rembg + model u2net).
# Výsledek: PNG s průhledností vedle originálu. Hotové soubory přeskočí.
import os
from PIL import Image
from rembg import remove, new_session

OUT = 'src/assets/img/stock'
JOBS = [('k-portret-7.jpg', 'uvod-vyrez.png')]
session = new_session('isnet-general-use')
for src, dst in JOBS:
    target = os.path.join(OUT, dst)
    if os.path.exists(target):
        continue
    im = Image.open(os.path.join(OUT, src)).convert('RGB')
    im.thumbnail((1600, 2400))
    cut = remove(im, session=session, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=15)
    bbox = cut.getbbox()
    if bbox:
        cut = cut.crop(bbox)
    cut.save(target, optimize=True)
    print('OK', dst, cut.size)
