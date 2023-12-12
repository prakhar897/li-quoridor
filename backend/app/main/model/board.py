from extensions import db

class Card(db.Model):
    id = db.Column(db.String(120), primary_key=True)
    userid = db.Column(db.String(80), nullable=False)
    word = db.Column(db.String(120), nullable=False)
    definition = db.Column(db.String(1200), nullable=False)
    currentbin = db.Column(db.Integer, nullable=False)
    timeofnextappearance = db.Column(db.Integer, nullable=False)
    timeincorrectlypicked = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<CardId %r>' % self.id
    
    def to_json(self):
        return {
            'id': self.id,
            'userid': self.userid,
            'word': self.word,
            'definition': self.definition,
            'currentbin': self.currentbin,
            'timeofnextappearance': self.timeofnextappearance,
            'timeincorrectlypicked': self.timeincorrectlypicked,
        }