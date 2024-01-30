from pymongo import MongoClient
from bson import objectid



class Movies_db:
     # Database connection MongoDB - movies collection
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["SubscriptionsDB"]
        self.__collection = self.__db["movies"]

    def get_all_movies(self):
        movies = self.__collection.find({})
        return movies
    
    def get_all_movie_by_id(self):
        movie = self.__collection.find_one({"_id": objectid(id)})
        return movie
    
    def create_all_movies(self,movies):
        msg = self.__collection.insert_many(movies)
        return f"create_all_movies {msg}" 
