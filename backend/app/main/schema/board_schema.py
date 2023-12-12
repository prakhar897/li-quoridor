from marshmallow import Schema, fields

class CardSchema(Schema):
    userid = fields.Integer()
    id = fields.Str()
    word = fields.Str()
    definition = fields.Str()
    currentbin = fields.Integer()
    timeofnextappearance = fields.Integer()
    timeincorrectlypicked = fields.Integer()