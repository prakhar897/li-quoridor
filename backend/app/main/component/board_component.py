from schema.card_schema import CardSchema
from service.db_service import create_row, get_row, update_row
from utils.query_utils import create_valid_card_query, create_user_card_query, get_word_query, create_later_card_query
from schema.request_schema import getValidCardRequestSchema, updateBinRequestSchema
from schema.response_schema import getValidCardResponseSchema, messageResponseSchema
from utils.misc_utils import get_new_time_to_appearance
from sqlalchemy.exc import IntegrityError

def get_valid_card_component(request: getValidCardRequestSchema) -> getValidCardResponseSchema:
    """
    Retrieves a valid card for the user to review.
    
    Args:
        request: An instance of getValidCardRequestSchema representing the request data.
        
    Returns:
        An instance of getValidCardResponseSchema representing the response data.
    """
    query = create_valid_card_query()
    cards = get_row(query)
    cards.sort(key=lambda x: x.currentbin, reverse=True)
    
    if len(cards) > 0:
        get_valid_card_response = getValidCardResponseSchema().dump(cards[0].to_json())
        return get_valid_card_response
    
    query = create_later_card_query()
    cards = get_row(query)

    if len(cards) > 0:
        get_valid_card_response = getValidCardResponseSchema().dump({"message": "You are temporarily done; please come back later to review more words."})
        return get_valid_card_response

    get_valid_card_response = getValidCardResponseSchema().dump({"message": "you have no more words to review; you are permanently done!"})
    return get_valid_card_response


def get_all_cards_component(request: getValidCardRequestSchema) -> getValidCardResponseSchema:
    """
    Retrieves all cards for the user.
    
    Args:
        request: An instance of getValidCardRequestSchema representing the request data.
        
    Returns:
        An instance of getValidCardResponseSchema representing the response data.
    """
    query = create_user_card_query()
    cards = get_row(query)
    get_all_cards_response = getValidCardResponseSchema(many=True).dump(cards)
    return get_all_cards_response

def create_card_component(request: getValidCardResponseSchema) -> messageResponseSchema:
    """
    Creates a new card.
    
    Args:
        request: An instance of getValidCardResponseSchema representing the request data.
        
    Returns:
        An instance of getValidCardResponseSchema representing the response data.
    """
    try:
        create_row(word=request["word"], definition=request["definition"], userid=1)
        create_card_response = messageResponseSchema().dump({'message': 'Card Created'})
        return create_card_response
    
    # Handles Request if word is already present.
    except IntegrityError as e:
        create_card_response = messageResponseSchema().dump({'message': 'Duplicate Card Found, Card Not Created'})
        return create_card_response
       

def update_bin_component(request: updateBinRequestSchema) -> messageResponseSchema:
    """
    Updates the bin of a card based on the user's response.
    
    Args:
        request: An instance of updateBinRequestSchema representing the request data.
        
    Returns:
        An instance of messageResponseSchema representing the response data.
    """
    try:
        query = get_word_query(userid=1, word=request["word"])
        card = get_row(query)
        card_json = card[0].to_json()

        if request["isCorrectAnswer"]:
            card_json["currentbin"] = card_json["currentbin"] + 1
        else:
            card_json["currentbin"] = 1
            card_json["timeincorrectlypicked"] = card_json["timeincorrectlypicked"] + 1

        card_json["timeofnextappearance"] = get_new_time_to_appearance(card_json["currentbin"])
        update_row(card_json)

        update_bin_response = messageResponseSchema().dump({'message': 'Bin Updated'})
        return update_bin_response

    # Handles Request if the word is not found 
    except IndexError as e:
        create_card_response = messageResponseSchema().dump({'message': 'Card Not Found, Bin Not Updated'})
        return create_card_response