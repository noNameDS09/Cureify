from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

from dotenv import load_dotenv
import os
load_dotenv()
api_key_ = os.getenv('API_KEY')

def queryAnalysis(prompt):
    llm = ChatGoogleGenerativeAI(
        model='gemini-1.5-flash',
        temperature=0,
        api_key=api_key_,
        max_tokens=None,
        timeout=30,
        max_retries=2
    )
    
    input_prompt = ChatPromptTemplate.from_messages([
        (
            'system', "You're a medical specialist and your task is to provide a detailed answer for the given query. The answer should be in depth and approx about 300 words also simplify all the techincal words for the normal user and be as precise as possible.Also the response should contains the paragrapghs and Bold and Italic texts also."
        ),
        ('user', "{input}")
    ])

    chain = input_prompt | llm
    response = chain.invoke({'input':prompt})

    return response.content

