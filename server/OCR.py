import PIL.Image
import google.generativeai as genai
from query import queryAnalysis

from dotenv import load_dotenv
import os
load_dotenv()
api_key_ = os.getenv('API_KEY')

genai.configure(api_key=api_key_)
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

def OCR(img, prompt):
    imgFile = PIL.Image.open(img)
    baseprompt = "Extract all the text from the image in a clear and well defined manner."
    response = model.generate_content([baseprompt, imgFile])
    output = queryAnalysis(response.text + prompt)
    return output

