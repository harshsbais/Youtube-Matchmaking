import pymongo as mongo
import googleapiclient.discovery
import googleapiclient.errors
import numpy as np
import json
import shlex

yt_key=""
mongo_srv=""

class youtube:
    def __init__(self, db):
        self.yt=self.start_api(api_key=yt_key)
        self.db=db
    def start_api(self, api_key=yt_key):
        api_service_name = "youtube"
        api_version = "v3" 
        yt = googleapiclient.discovery.build(api_service_name, api_version, developerKey=api_key)
        return yt
    def channel_info(self, ids):
        infos = []
        info = self.yt.channels().list(part=["brandingSettings", "id", "statistics", "topicDetails", "snippet"], fields="items", id=ids)
        info = info.execute()
        infos += info["items"]
        response = []
        for json in infos:
            response.append(self.clean_channel_json(json))
        return response
    def clean_channel_json(self, json):
        new_json={}
        new_json["id"]=json["id"]
        new_json["collab"]=False
        new_json["title"]=json["brandingSettings"]["channel"]["title"]
        new_json["description"]=json["brandingSettings"]["channel"].get("description")
        new_json["keywords"]=json["brandingSettings"]["channel"].get("keywords")
        new_json["country"]=json["brandingSettings"]["channel"].get("country")
        new_json["viewCount"]=int(json["statistics"].get("viewCount", "0"))
        new_json["subscriberCount"]=int(json["statistics"].get("subscriberCount","0"))
        new_json["videoCount"]=int(json["statistics"].get("videoCount","0"))
        new_json["image"]=json["snippet"]["thumbnails"]["high"]["url"]
        new_json["topics"]=[]
        if json.get("topicDetails") != None:
            json_topics=json["topicDetails"].get("topicCategories",[])
            for i in range(len(json_topics)):
                new_json["topics"].append(json_topics[i].replace("https://en.wikipedia.org/wiki/",""))
        return new_json
    def channel_to_database(self, json):
        for channel in json:
            self.db.channels.update_one({"title":channel["title"]}, {"$set": channel}, upsert=True)
        return len(json)


class up_db:
    def __init__(self, db):
        self.db=db
        self.yt=youtube(db)
    def get_trends(self, date):
        response=self.yt.yt.videos().list(part=["brandingSettings", "id", "statistics", "topicDetails", "snippet"], chart="mostPopular").execute()