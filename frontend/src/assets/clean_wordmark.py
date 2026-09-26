from PIL import Image, ImageFilter

wm = Image.open('src/assets/netra-wordmark.jpg')
w, h = wm.size

# The wordmark letters are from y=20 to y=118, x from 30 to 495
# Let's crop to exact bounding box
wm_cropped = wm.crop((25, 10, 495, 125))

# Convert to RGBA
rgba = wm_cropped.convert('RGBA')
datas = list(rgba.getdata())
newDataLight = []
newDataDark = []

for item in datas:
    r, g, b, a = item
    # background is dark
    brightness = (r + g + b) / 3.0
    if brightness < 45:
        newDataLight.append((0, 0, 0, 0))
        newDataDark.append((0, 0, 0, 0))
    else:
        # Check if it's the blue/purple 'A' leg
        is_colored = (b > r + 30) or (b > g + 30)
        alpha = min(255, int((brightness - 45) / (255 - 45) * 255 * 1.5))
        if is_colored:
            newDataLight.append((r, g, b, alpha))
            newDataDark.append((r, g, b, alpha))
        else:
            # For light text on dark bg
            newDataLight.append((255, 255, 255, alpha))
            # For dark text on light bg (#0F172A)
            newDataDark.append((15, 23, 42, alpha))

rgba_light = rgba.copy()
rgba_light.putdata(newDataLight)
rgba_light.save('src/assets/netra-wordmark-clean-white.png', 'PNG')
rgba_light.save('public/netra-wordmark-clean-white.png', 'PNG')

rgba_dark = rgba.copy()
rgba_dark.putdata(newDataDark)
rgba_dark.save('src/assets/netra-wordmark-clean-dark.png', 'PNG')
rgba_dark.save('public/netra-wordmark-clean-dark.png', 'PNG')

print("Saved clean wordmarks!")
