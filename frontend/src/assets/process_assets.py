from PIL import Image

# 1. Process transparent wordmark
wm = Image.open('src/assets/netra-wordmark.jpg').convert('RGBA')
datas = wm.getdata()
newData = []
for item in datas:
    # item is (r, g, b, a)
    brightness = (item[0] + item[1] + item[2]) / 3.0
    if brightness < 35:
        newData.append((0, 0, 0, 0))
    elif brightness < 70:
        alpha = int((brightness - 35) / 35.0 * 255)
        newData.append((item[0], item[1], item[2], alpha))
    else:
        newData.append((item[0], item[1], item[2], 255))

wm.putdata(newData)
wm.save('src/assets/netra-wordmark.png', 'PNG')
wm.save('public/netra-wordmark.png', 'PNG')
print("Saved netra-wordmark.png")

# 2. Also create a dark-theme and light-theme version of wordmark
# For light theme (e.g. on white frosted cards), dark letters:
wm_dark = Image.open('src/assets/netra-wordmark.jpg').convert('RGBA')
datas_dark = wm_dark.getdata()
newDataDark = []
for item in datas_dark:
    brightness = (item[0] + item[1] + item[2]) / 3.0
    if brightness < 35:
        newDataDark.append((0, 0, 0, 0))
    else:
        # Check if it's the blue/purple 'A' leg or white text
        # If blue/purple (more blue than red and green)
        if item[2] > item[0] + 30 or item[2] > item[1] + 30:
            newDataDark.append(item)
        else:
            # Map white to dark slate #0F172A
            alpha = min(255, int(brightness * 1.2))
            newDataDark.append((15, 23, 42, alpha))

wm_dark.putdata(newDataDark)
wm_dark.save('src/assets/netra-wordmark-dark.png', 'PNG')
wm_dark.save('public/netra-wordmark-dark.png', 'PNG')
print("Saved netra-wordmark-dark.png")

# 3. Logo icon
logo = Image.open('src/assets/netra-logo-icon.jpg')
logo.save('src/assets/netra-logo-icon.png', 'PNG')
logo.save('public/netra-logo-icon.png', 'PNG')
logo.resize((64, 64), Image.Resampling.LANCZOS).save('public/favicon.png', 'PNG')
print("Saved netra-logo-icon.png and favicon.png")
