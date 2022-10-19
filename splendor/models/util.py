"""static resources and functions"""

BASE_CARDS = 'splendor/cards.json'
BASE_NOBLES = 'splendor/nobles.json'

CARD_COLORS = {
    "white": 1,
    "blue": 2,
    "green": 3,
    "red": 4,
    "black": 5,
}


def toString(arr):
    return ''.join([str(num) + ',' for num in arr])[:-1]


def toArray(str):
    return [int(num_str)for num_str in str.split(',')]
