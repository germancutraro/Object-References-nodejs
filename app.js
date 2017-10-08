const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/references', {useMongoClient: true});
mongoose.connection
  .once('open', () => console.log('Connected to the database, you are ready :)'))
  .on('error', err => console.log('Error with the database, you are not ready :('));

const Schema = mongoose.Schema;

let postSchema = new Schema({
  title: String,
  content: String
});
const Post = mongoose.model('Post', postSchema);

let userSchema = new Schema({
  name: String,
  email: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post' // name of the collection - mongoose.model(this is the ref value, schema)
  }]
});
const User = mongoose.model('User', userSchema);

User.create({name: 'Germán', email: 'germancutraro@hotmail.com'});

Post.create({title: 'Arrow Functions in Js Es6', content: 'Arrow functions are great...'}).then(post => {
  User.findOne({email: 'germancutraro@hotmail.com'}).then(user => {
    user.posts.push(post);
    user.save();
  });
});

Post.create({title: 'Template Strings', content: 'I love the new feature...'}).then(post => {
  User.findOne({email: 'germancutraro@hotmail.com'}).then(user => {
    user.posts.push(post);
    user.save();
  });
});

User.findOne({email: 'germancutraro@hotmail.com'}).populate('posts').exec().then(user => {
  console.log(user);
});
