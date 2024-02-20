from pymongo import MongoClient
from bson import ObjectId






class Subscriptions_db:
     # Database connection MongoDB - subscriptions collection
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["SubscriptionsDB"]
        self.__collection = self.__db["subscriptions"]

    def get_all_subscriptions(self):
        subscriptions = list(self.__collection.find({}))
        return subscriptions
    
    def get_subscription_by_id(self, id):
        subscriptions = self.__collection.find_one({"_id": ObjectId(id)})
        return subscriptions
     
    def create_subscription(self,subscription):
        msg = self.__collection.insert_one(subscription)
        return f"create_subscriptions {msg}" 
    
    def update_subscription(self,id, subscription):
        msg = self.__collection.update_one({"_id": ObjectId(id)},{"$set": subscription})
        return f"Update subscription {msg}"
    
    def delete_subscriptions(self,id):
        msg = self.__collection.delete_one({"_id": ObjectId(id)})
        return f"Delete subscriptions {msg}"
 