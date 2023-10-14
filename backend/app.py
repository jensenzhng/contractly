import os
import json
from dotenv import load_dotenv

from flask import Flask, request, jsonify
from flask_cors import CORS

from langchain.chat_models import ChatOpenAI
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from response import get_summary

import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import certifi
import re

load_dotenv()

app = Flask(__name__)
CORS(app) 
chat_model = ChatOpenAI(openai_api_key=os.environ.get('api-key'),
                        model_name='gpt-3.5-turbo-16k',
                        temperature = 0,
                        max_tokens=8000)

ca = certifi.where()
client = MongoClient(os.environ.get('mongo-uri'), tlsCAFile=ca)
db = client['Contractly']
collection = db['summaries']

def fetch_privacy_policy(link):
    try:
        response = requests.get(link)
        
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'html.parser')

        relevant_tags = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
        cleaned_texts = [tag.get_text().strip().replace('\n', ' ') for tag in relevant_tags]
        extracted_text = ' '.join(cleaned_texts)

        return extracted_text

    except requests.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"Error occurred: {err}")
        return None

def count_tokens(text):
    tokens = re.findall(r'\b\w+\b', text)
    return len(tokens) * 2

@app.route('/summarize-policy', methods=['POST'])
def summarize_policy():
    link_object = request.get_json()
    print(link_object['link'])

    summary = collection.find_one({'base_domain': link_object['baseDomain']})

    if (summary is None):
        privacy_text = fetch_privacy_policy(link_object['link'])
        print(privacy_text)
        print(count_tokens(privacy_text))
        if (count_tokens(privacy_text) > 15000):
            privacy_text = privacy_text[:40000]
        statement =  get_summary(chat_model=chat_model, privacy_policy=privacy_text)
        summary_object = {
            'base_domain': link_object['baseDomain'],
            'summary': statement
        }
        collection.insert_one(summary_object)
        return statement
    else:
        return summary['summary'];
    
    # collection.insert_one(summary_object)
    print('##')
    print(collection.find_one({'base_domain': link_object['baseDomain']}))
    
    return 'hi'
# TODO: 
# - implement getting privacy policy html within python backend
# - localstorage visited before
# - implement mongodb 
# - connect response from api to extension
# - host online if get the chance??

# - flow:
#     - has user visited before (localstorage)?
#         - yes -> don't show popup, done
#             - if user clicks on extension, then send request to database to get privacy rating
#         - no -> show popup
#             - has this website been visited before in the database?
#                 - yes -> return json of rating
#                 - no -> poll gpt api and get response, save response in database then return response

# - ideas:
#     - come up with own scoring system? we'll do our own calculation
#     - have website with same functionality
#     - strip html of unneeded charactes
#     - multiple user thingies in langchain 

#     return jsonify(langchain_summary)

if __name__ == '__main__':
    app.run(debug=True)
