import json
from typing import List, Optional, Tuple


def get_data(filename: str) -> List[dict]:
    with open(filename) as in_f:
        return json.load(in_f)


def add_data(filename: str, body: dict) -> None:
    existing_data = get_data(filename)
    existing_data.append(body)

    with open(filename, "w") as ou_f:
        json.dump(existing_data, ou_f, indent=4)


def overwrite_data(filename: str, new_data: List[dict]) -> None:
    with open(filename, "w") as ou_f:
        json.dump(new_data, ou_f, indent=4)


def validate_user_data(user_data: dict) -> Tuple[Optional[int], Optional[int]]:
    try:
        user_id = user_data["user"]["id"]
        role_id = user_data["role"]["id"]
    except KeyError:
        return None, None

    if role_id > 5 or role_id < 1:
        return user_id, None

    return user_id, role_id
