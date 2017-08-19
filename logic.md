### Variables
#### Server
* `numOnlineUsers`
* `numUsers`
 
#### Client
* `messages`

### Socket events
#### Server
* `emit('num_read_updated', [{message_id: 11, num_read}])`
* `emit('new_message', (newMessage))`: Create a new message

#### Client
* `on('num_read_updated', (changes))`: Find corresponding message by `message_id` and override `num_read`
* `on('new_message', {user: user_object, message: user_input})`

### DB Schema
#### User
- user_id: ObjectId
- name: String
- userrname: String
- thumbnail_url: String
- logoff_at: Date
- created_at: Date

#### Message
- message_id: ObjectId
- sender: ObjectId
- message: String
- num_read: Integer
- sent_at: Date
- created_at: Date


### User lands on logic
#### No user in localStorage
1. (Client) Do POST `/api/users`
2. (Server) Create a user object
3. (Server) Increment `numOnlineUsers` and `numUsers`
4. (Server) Get all messages and return the response in this format:
``` javascript
{
  success: true,
  data: {
    user: user_object
    messages: [message_object],
    numUsers: numUsers
  }
}
```
5. (Client) Populate html by received `messages` and `numUsers`
6. (Server) Update all messages' `num_read` by 1 and emit `num_read_updated`
7. (Client) Update `num_read` by finding message in the messages variable. 

#### User in localStorage
1. (Client) Do POST `/api/users/:userid/on_login`.
2. (Server) Get user object rom DB
3. (Server) Get all messages and return the response in this format:
``` javascript
{
  success: true,
  data: {
    messages: [message_object],
    numUsers: numUsers
  }
}
```
4. (Client) Populate html by received `messages` and `numUsers`
5. (Server) Filter messages whose `sent_at` is greater than user's `logoff_at`
6. (Server) Incremet `num_read` by 1 and emit `num_read_updated`
7. (Client) `num_read_updated` handler

### Messages logic
#### New message
1. (Client) Mkae POST request to `/api/messages`
2. (Server) Assign `numOnlineUsers` to `num_read` and create a new message object
3. (Server) Assign given user_object to sender and return the response in the following format:
``` javascript
{
  success: true
}
```
4. (Server) Emits `new_message` with format defined in Socket events
5. (Client) Adds new message to the `messages` variable

### Logoff
1. (Client) Detect window is about closed, and do POST `/api/users/:userid/on_logoff`
2. (Server) Update given user's `logoff_at` and decrement `numOnLineUsers`