from PIL import Image

img = Image.open('src/assets/netra-login-hero.jpg')
w, h = img.size
print(f"Total size: {w}x{h}")

# Eyes crop
eyes_crop = img.crop((480, 270, 640, 370))
eyes_crop.save('src/assets/eyes_crop.jpg')

# Collar crop
collar_crop = img.crop((530, 390, 615, 460))
collar_crop.save('src/assets/collar_crop.jpg')

print("Saved eyes_crop.jpg and collar_crop.jpg successfully")
