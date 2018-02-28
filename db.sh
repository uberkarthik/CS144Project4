use Blogserver;
db.createCollection("Posts");
db.createCollection("Users");

s = { "postid": 1, "username": "cs144", "created": 1518669344517, "modified": 1518669344517, "title": "Title 1", "body": "Hello, world!" };
t = { "postid": 2, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 2", "body": "I am here." };
u = { "username": "cs144", "password": "$2a$10$2DGJ96C77f/WwIwClPwSNuQRqjoSnDFj9GDKjg6X/PePgFdXoE4W6" };
v = { "username": "user2", "password": "$2a$10$kTaFlLbfY1nnHnjb3ZUP3OhfsfzduLwl2k/gKLXvHew9uX.1blwne" };

db.Posts.insert( s );
db.Posts.insert( t );
db.Users.insert( u );
db.Users.insert( v );
