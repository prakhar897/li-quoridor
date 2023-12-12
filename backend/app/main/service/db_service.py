from model.card import Card
from extensions import db
from sqlalchemy.sql import text
import time

def create_row(word, definition, userid):
    current_time_epoch = int(time.time())
    new_card = Card(id=str(userid) + "-" + word, userid=userid, word=word, definition=definition, currentbin=0, timeofnextappearance=current_time_epoch, timeincorrectlypicked=0)
    print(new_card)
    db.session.add(new_card)
    db.session.commit()


def get_row(query):
    result = db.session.query(Card).filter(text(query)).all()
    return result
    

#TODO: Create Proper Transactions.
def update_row(updated_card):
    row = db.session.query(Card).filter_by(id=updated_card["id"]).first()

    row.currentbin = updated_card["currentbin"]
    row.timeofnextappearance = updated_card["timeofnextappearance"]
    row.timeincorrectlypicked = updated_card["timeincorrectlypicked"]

    db.session.commit()
    
