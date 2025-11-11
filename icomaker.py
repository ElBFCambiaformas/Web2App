import os
from PIL import Image

# Ask for the image
input_image = input("Enter the path to your image (PNG/JPG): ").strip().strip('"')

# Check if file exists
if not os.path.isfile(input_image):
    print("❌ File not found. Make sure the path is correct.")
    exit()

# Output .ico path
output_icon = os.path.join(os.path.dirname(__file__), "icon.ico")

# Standard Windows icon sizes
sizes = [(16,16), (32,32), (48,48), (64,64), (128,128), (256,256)]

# Open the image
img = Image.open(input_image)

# Ensure image has alpha channel
if img.mode != "RGBA":
    img = img.convert("RGBA")

# Make sure the image is square by padding or cropping
max_size = max(img.size)
square_img = Image.new("RGBA", (max_size, max_size), (0,0,0,0))
square_img.paste(img, ((max_size - img.width)//2, (max_size - img.height)//2))

# Resize to each size and save as .ico
square_img.save(output_icon, format="ICO", sizes=sizes)

print(f"✅ Icon saved as {output_icon} with sizes: {sizes}")
