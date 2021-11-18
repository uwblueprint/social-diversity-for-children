import json
import os
import requests

def lambda_handler(event, context):
    print("*** START MAILING CRON JOB ***")
    
    res = requests.post(os.environ.get("API_ENDPOINT"), data = { "key": os.environ.get("LAMBDA_SECRET_KEY") })
    print(res.text)

    print("*** END MAILING CRON JOB ***")
    
    
