# Backend-task-of-e-commerce


# Product APi

# add Functionality
POST /api/addProduct: Create a new product along with its variants.
# update Functionality
PATCH /api/productUpdate/:id: Update an existing product by its ID.
# delete Functionality
DELETE /api/productDelete/:id: Delete a product by its ID.
# Search Functionality
GET /api/seachItem?q={search_query}: Search for products by product name, description, or variant name.

# User APi

# register user Functionality
POST /api/register: Create a new new user
# login user Functionality
POST /api/login: login user
# update usaer Functionality
PATCH /api/edit/:id Update an existing user by its ID.
# delete Functionality
DELETE /api/delete/:id' Delete a user by its ID.
# Search Functionality
GET /api/getuser: get all the user.

# Used for  Testing mocha and chai

# used for validation joiValidator

# used jwt token 