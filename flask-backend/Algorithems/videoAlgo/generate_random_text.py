import random
import string

def generate_random_text(min_length=5, max_length=20):


 
  characters = string.ascii_letters + string.digits + string.punctuation

  # Generate a random   
 
  length = random.randint(min_length, max_length)

  # Generate the random text
  random_text = ''.join(random.choice(characters) for i in range(length))
  return random_text

