import json
import os

path = "./data/"

headers = ["id", "age", "gender", "totalIncome", "relationshipStatus", "latitude", "longitude"]
# headers = ["id", "age", "gender", "totalIncome", "addresses.principalResidence.latitude", "addresses.principalResidence.longitude"]

with open('result.csv', 'w') as the_file:
    the_file.write(",".join(headers)+"\n")

with open('result.csv', 'a') as the_file:
    batch = 0
    for filename in os.listdir(path):
        if filename.endswith('.json'):
            print(f"Batch:  {batch}")
            with open(os.path.join(path, filename)) as f:
                content = f.read()
                customers = json.loads(content)
                for customer in customers:
                    data = [
                        customer["id"],
                        customer["age"],
                        customer["gender"],
                        customer["totalIncome"],
                        customer["relationshipStatus"],
                        customer["addresses"]["principalResidence"]["latitude"],
                        customer["addresses"]["principalResidence"]["longitude"],
                    ]
                    the_file.write(",".join(map(str, data))+"\n")

            batch += 1

        

        