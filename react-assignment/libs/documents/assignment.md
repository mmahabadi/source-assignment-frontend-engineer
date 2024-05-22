
# Assignment: Cultivation team

The goal of this assignment is to verify that you can apply frontend engineering techniques in 
practice. To do so, we ask that you build a React app for a hypothetical part of our product.

## Instructions

To manage a cultivation in the greenhouse, users can be assigned to a cultivation. Depending on their role, they have certain permissions on the cultivation.

In the cultivation team settings, the company admins can manage which users have access to the cultivation with which role.

[<img src="./design/cultivation-team.png" width="200" align="right" style="margin-left: 20px" />](./design/cultivation-team.png)

When the user opens the cultivation team page, an overview of the assigned users with their role is shown. It shows a table with the name of the user, their role and a button to remove them from the cultivation.

(*Click the screenshot to enlarge*)

<br clear="right"/>
<br />

[<img src="./design/add-team-member.png" width="150" align="right" style="margin-left: 20px" />](./design/add-team-member.png)

Below the table we see an "Add teammember" button, with which we can add a user to this cultivation. When the button is clicked, a modal should open with a searchable list of all users. The user can select one or more users and add them to the cultivation team. When they are added, they automatically get the "Observer" role.

<br clear="right"/>
<br />

[<img src="./design/update-role.png" width="200" align="right" style="margin-left: 20px" />](./design/update-role.png)

The role of an existing cultivation team member can be changed by clicking on it. When the role is clicked, a dropdown with all roles opens. By selecting one of the roles, the user role will be updated.

<br clear="right"/>

## Data

We provide an API which will provide all data you need to complete this assignment, including endpoints to change the 
data. The link to this API has been shared in the assignment email.

### API

The provided API is a mock-API and as such has little to no data validation. Keep this in mind!

You can use the following endpoints:

#### Create cultivation

`POST /cultivations`: create a new cultivation. The ID this endpoint returns can be used for this assignment.

*Request body*
```
{
    "name": "Cultivation for assignment"
}
```

*Response*
```
{
    "id": "1",
    "name": "Cultivation for assignment"
}
```

#### List cultivations

`GET /cultivations`: list all known cultivations

*Response*
```
[
    {
        "id": "9ac45c32-64f1-4a27-b554-e3544cbbe001",
        "name": "Cultivation for assignment"
    },
    {
        "id": "9ac45c32-64f1-4a27-b554-e3544cbbe002",
        "name": "Cultivation for assignment 2"
    },
    ...
[
```

#### Cultivation users

`GET /cultivations/<cultivation_id>/users`: get a list of users with roles for the cultivation.

*Response*
```
[
    {
        "cultivation_id": "9ac45c32-64f1-4a27-b554-e3544cbbe001",
        "role": {
            "id": 1,
            "name": "Head grower"
        },
        "user": {
            "id": 48,
            "name": "Amaleta Brearton"
        }
    },
    ...
]
```

`POST /cultivations/<cultivation_id>/users`: add a user to the cultivation.

*Request body*
```
{
	"role": {
		"id": 2
	},
	"user": {
		"id": 1
	}
}
```

`PUT /cultivations/<cultivation_id>/users/<user_id>`: update the role of a user in the cultivation.

*Request body*
```
{
	"role": {
        "id": 3
    }
}
```

`DELETE /cultivations/<cultivation_id>/users/<user_id>`: remove a user from a cultivation

*No request body needed*

#### Users

`GET /users`: get a list of all users.

*Response*
```
[
    {
        "id": 1,
        "name": "Bruis McSkin"
    },
    ...
]
```

#### Cultivation roles

`GET /cultivation-roles`: get a list of cultivation roles.

*Response*
```
[
    {
        "id": 1,
        "name": "Head grower",
        "description": "Can view and edit everything of the cultivation and manage the team."
    },
    ...
]
```

## Requirements

Your solution should include the following functionality:

1. Consume the provided API to collect the data
2. Show a list of cultivation users
3. Have a modal to select users to add to the cultivation
4. Be able to update the role of a cultivation user
5. Have a button to delete the user from the cultivation

### Non-functional requirements

- Use Typescript to build your assignment
- Use the latest version of React
- This assignment was designed to be completed in 6-8h. The evaluation will take into account the 
  choices you make and what you focus on given the time you have. However, it's up to you if you spend less or more time on it.
- Please make sure the final commit to your repository is done at least 24 hours before the start of your interview

## Deliverables

This assignment should be delivered in the following way:

- All code is pushed to your private copy of this repository.
- Documentation is provided in the README.md on how the solution works, and how to run and test it.
- Any information, (dummy)-data, files, and other assets that are needed to run this project, are provided in this repository.

## Assessment Criteria

The solution will be assessed on the following criteria:

- How is your code structured? Is it easy to read and follow?
- How clear is the documentation?
- Are there any clear bugs in your code?
- How does the solution perform?
- Can you clearly and concisely describe the process you have followed and the choices you have made?
- Can you describe the biggest short-comings of your solution and which steps could be taken to improve on that?
