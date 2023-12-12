import time

def create_valid_card_query():
    current_time_epoch = int(time.time())
    query = "Card.timeofnextappearance <= " + str(current_time_epoch) + " and Card.timeincorrectlypicked < 10 and Card.userid = 1"
    return query

def create_later_card_query():
    query = "Card.timeincorrectlypicked < 10 and Card.userid = 1"
    return query

def create_user_card_query():
    query = "Card.userid = 1"
    return query

def get_word_query(userid, word):
    query = "Card.word = \'"+ word + "\'"
    return query