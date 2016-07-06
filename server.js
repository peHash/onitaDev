//wtf
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var crypto = require('crypto');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');

var async = require('async');
var request = require('request');
var xml2js = require('xml2js');

var agenda = require('agenda')({ db: { address: '185.8.172.102:27017/Megakar' } });
var sugar = require('sugar');
var nodemailer = require('nodemailer');
var _ = require('lodash');
// ---- 12/6/94 ----
var fs = require('fs-extra');
var formidable = require('formidable');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
// ----
//var ip = require('ip');
//console.log(ip.address());
var tokenSecret = 'your unique secret';

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;



var userSchema = new Schema({
  // _creator: {type: Number, ref: 'Course'},
  firstName: { type: String, trim: true, required: true },
  lastName: {type: String, trim: true, required: true},
  cellPhoneNumber : {type: Number, unique: true, default: ''},
  email: { type: String, unique: true, lowercase: true, trim: true , required: true},
  password: { type: String },
  facebook: {
    id: String,
    email: String
  },
  google: {
    id: String,
    email: String
  }, 
  bids: [{type: mongoose.Schema.Types.ObjectId,
    ref: 'Bid'}], 
  tags: [{type: String, default: ''}], 
  summary: {type: String, default: ''},
  resumes: [{ 
    title: {type: String, default: ''},
    category: {type: String, default: ''},
    start: {type: String, default: ''},
    finish: {type: String, default: ''},
    desc: {type: String, default: ''}
  }], 
  educations: [{
    name: {type: String, default: ''},
    start: {type: String, default: ''},
    finish: {type: String, default: ''},
    field: {type: String, default: ''},
    grade: {type: String, default: ''}
  }], 
  projects: [{type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job', default: null}], 
  texts: [{
    receiver: {type: mongoose.Schema.Types.ObjectId, default: null}, 
    messages: [{
      text: {type: String, default: ''},
      time_sent: {type: Date, default: new Date}
    }]
  }]
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

var jobSchema = new Schema({
    id: ObjectId,
    category: {type: Number, required: true},
    title: {type: String, required: true},
    tags: [{type: String, default: ''}],
    longDesc: {type: String, default: ''},
    budgetNumber: {type: Number, default: ''},
    budgetRate: {type: String, default: ''},
    startedDate: {type: Date, default: ''},
    deadlineDate: {type: String, default: ''},
    featured:  {type :Boolean, default: ''},
    views: {type: Number, default: ''},
    report: [{
      user: {type: mongoose.Schema.Types.ObjectId, 
             ref: 'User'},
      claim: {type: String, default: ''},
      report_date: {type: Date, default: new Date()},
      response_to_claim: {type: String, default: ''}
    }],
    reportCounter: {type: Number, default : ''},
    status: {type: String, default: ''},
    poster: {type: String, default: ''},
    lastModifiedInDate: {type: Date, default : ''},
    verified: {type: Boolean, default: ''},
    bids: [{type: mongoose.Schema.Types.ObjectId,
      ref: 'Bid', default: null}], 
    user: {type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', default: null}
});


var bidSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    amount: String,
    days: String,
    post_date: Date,
    sponsor: Boolean,
    desc: String
});
   // postedBy: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'User'
    // }],
    
    // lastModifiedBy: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'User'
    // }],
var projectSchemaNew = new mongoose.Schema({
    // tags: [String],
    // longDesc: String,
    // budgetNumber: Number,
    // budgetRate: String,
    // startedDate: Date,
    // deadlineDate: Date,
    // featured: Boolean,
    // views: Number,
    // report: Boolean,
    // reportCounter: Number,
    // status: String,
    // poster: String,
    // // postedBy: [{
    // //     type: mongoose.Schema.Types.ObjectId, ref: 'User'
    // // }],
    // lastModifiedInDate: Date,
    // // lastModifiedBy: [{
    // //     type: mongoose.Schema.Types.ObjectId, ref: 'User'
    // // }],
    // verified: Boolean
});

var User = mongoose.model('User', userSchema);

var Job = mongoose.model('Job', jobSchema);
jobSchema.plugin(deepPopulate);

var Bid = mongoose.model('Bid', bidSchema);
/////////


mongoose.connect('mongodb://localhost/Megakar');




var app = express();

app.set('port', process.env.PORT || 2020);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser({defer: true}));

function ensureAuthenticated(req, res, next) {
  if (req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    try {
      var decoded = jwt.decode(token, tokenSecret);
      if (decoded.exp <= Date.now()) {
        res.send(400, 'Access token has expired');
      } else {
        req.user = decoded.user;
        return next();
      }
    } catch (err) {
      return res.send(500, 'Error parsing token');
    }
  } else {
    return res.send(401);
  }
}

function createJwtToken(user) {
  var payload = {
    user: user,
    iat: new Date().getTime(),
    exp: moment().add('days', 7).valueOf()
  };
  return jwt.encode(payload, tokenSecret);
}

app.post('/auth/signup', function(req, res, next) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    cellPhoneNumber: req.body.cellPhoneNumber,
    email: req.body.email.toLowerCase(),
    password: req.body.password
  });
  user.save(function(err) {
    if (err) return next(err);
    res.send(200);
  });
});

app.post('/auth/login', function(req, res, next) {
  User.findOne({ email: req.body.email.toLowerCase() }, function(err, user) {
    if (!user) return res.send(401, 'User does not exist');
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) return res.send(401, 'Invalid email and/or password');
      var cpUser = {
        _id: user._id,
        email: user.email,
        password: user.password
      };
      var token = createJwtToken(cpUser);
      res.send({ token: token });
    });
  });
});

app.post('/auth/facebook', function(req, res, next) {
  var profile = req.body.profile;
  var signedRequest = req.body.signedRequest;
  var encodedSignature = signedRequest.split('.')[0];
  var payload = signedRequest.split('.')[1];

  var appSecret = '298fb6c080fda239b809ae418bf49700';

  var expectedSignature = crypto.createHmac('sha256', appSecret).update(payload).digest('base64');
  expectedSignature = expectedSignature.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  if (encodedSignature !== expectedSignature) {
    return res.send(400, 'Invalid Request Signature');
  }

  User.findOne({ facebook: profile.id }, function(err, existingUser) {
    if (existingUser) {
      var token = createJwtToken(existingUser);
      return res.send(token);
    }
    var user = new User({
      name: profile.name,
      facebook: {
        id: profile.id,
        email: profile.email
      }
    });
    user.save(function(err) {
      if (err) return next(err);
      var token = createJwtToken(user);
      res.send(token);
    });
  });
});

app.post('/auth/google', function(req, res, next) {
  var profile = req.body.profile;
  User.findOne({ google: profile.id }, function(err, existingUser) {
    if (existingUser) {
      var token = createJwtToken(existingUser);
      return res.send(token);
    }
    var user = new User({
      name: profile.displayName,
      google: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });
    user.save(function(err) {
      if (err) return next(err);
      var token = createJwtToken(user);
      res.send(token);
    });
  });
});

app.get('/api/users', function(req, res, next) {
  if (!req.query.email) {
    return res.send(400, { message: 'Email parameter is required.' });
  }

  User.findOne({ email: req.query.email }, function(err, user) {
    if (err) return next(err);
    res.send({ available: !user });
  });
});



app.get('/api/jobs' , function(req, res, next) {

//Just for test
// var aNewText = {
//   receiver: '55b392241d26fcfe017dd3dd', 
//   messages: [{
//     text: 'hello ahmad mahmoud', 
//     time_sent: new Date
//   }];
// User.update({_id: req.user._id}, {
//       $push: {
//         texts: aNewText
//       }
//     },{ upsert: true}, function(err, number){
//       if (err) return Next(err);
//       console.log(number + 'new text/s successfully inserted !');
//     });


/*
    Storymdl
        .find({})
        .populate('_creator')
        .exec(function (err, story) {
            if (err) return next(err);
            res.send(story);
            // prints "The creator is Aaron"
        });
});*/


    // var question2 = new Question({
    //     title: 'elmlink2',
    //     body: 'elmlink2',
    //     tags: ['computer', 'mathematic', 'mechanic'],
    //     voteup: 12,
    //     votedown: 18,
    //     report: 12,
    //     status: 'closed',
    //     poster: '',
    //     verified_ans: 'false',
    //     last_modified_in_date: new Date(2013,11,10),
    //     answers: [{
    //         code: 232,
    //         body: 'javabe dorost ine',
    //         date: new Date(2014,11,27),
    //         last_modified_in: new Date(2014,11,27),

    //         overview: 'true',
    //         comments: [{
    //             context: 'first answers comment is this !',
    //             date: new Date(2014,11,28)
    //         }]
    //     }],
    //     comments: [{
    //         context: 'first questions comment',
    //         date: new Date(2014,11,29)
    //     }]

    // });
/*    // Remove Question Collection
    Question.remove({}, function(err, number) {
        if (err) console.log('error on removing the document.');
        console.log('Document Successfully Removed !' + ' -- ' + number + 'row/s has affected !');
    });*/

    // question2.save(function (err, number) {
    //     if (err) console.log('Error on save!');
    //     console.log('everything is ok!' + ' -- ' + number + ' row/s has affected');
    // });

// var pop = Bid.find({}).populate('user').exec(function(err, res) {
//   if (err) return Next(err);
//   console.log(res);
// });

  if (req.query.tag) {
    // query.where({ $in : { tags : req.query.tag }});
    var query = Job.find({}).where('tags').in([req.query.tag]);
  } else if (req.query.alphabet) {
    query.where({ name: new RegExp('^' + '[' + req.query.alphabet + ']', 'i') });
  } else {
    var query = Job.find({});
  }
  query.exec(function(err, jobs) {
    if (err) return next(err);
    res.send(jobs);
  });


});

app.get('/api/jobs/:id', function(req, res, next) {
  // ---- 12/6/94 ----
  // Job.findById(req.params.id, function(err, job) {
  //   if (err) return Next(err);
  //   res.send(job);
  // });
  // Job.findById(req.params.id)
  // .populate('bids')
  // .exec(function(err , job){
  //   if (err) console.log(err);
  //   User.findById(job)
  // });
  Job.findById(req.params.id).deepPopulate('bids.user').exec(function (err, job) {
    if (err) console.log(err);
    res.send(job);
});
});



app.post('/api/jobs', ensureAuthenticated , function (req, res, next) {
/*  var seriesName = req.body.showName
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '');
  var apiKey = '9EF1D1E7D28FDA0B';
  var parser = xml2js.Parser({
    explicitArray: false,
    normalizeTags: true
  });

  async.waterfall([
    function (callback) {
      request.get('http://thetvdb.com/api/GetSeries.php?seriesname=' + seriesName, function (error, response, body) {
        if (error) return next(error);
        parser.parseString(body, function (err, result) {
          if (!result.data.series) {
            return res.send(400, { message: req.body.showName + ' was not found.' });
          }
          var seriesId = result.data.series.seriesid || result.data.series[0].seriesid;
          callback(err, seriesId);
        });
      });
    },
    function (seriesId, callback) {
      request.get('http://thetvdb.com/api/' + apiKey + '/series/' + seriesId + '/all/en.xml', function (error, response, body) {
        if (error) return next(error);
        parser.parseString(body, function (err, result) {
          var series = result.data.series;
          var episodes = result.data.episode;
          var show = new Show({
            _id: series.id,
            name: series.seriesname,
            airsDayOfWeek: series.airs_dayofweek,
            airsTime: series.airs_time,
            firstAired: series.firstaired,
            genre: series.genre.split('|').filter(Boolean),
            network: series.network,
            overview: series.overview,
            rating: series.rating,
            ratingCount: series.ratingcount,
            runtime: series.runtime,
            status: series.status,
            poster: series.poster,
            episodes: []
          });
          _.each(episodes, function (episode) {
            show.episodes.push({
              season: episode.seasonnumber,
              episodeNumber: episode.episodenumber,
              episodeName: episode.episodename,
              firstAired: episode.firstaired,
              overview: episode.overview
            });
          });
          callback(err, show);
        });
      });
    },
    function (show, callback) {
      var url = 'http://thetvdb.com/banners/' + show.poster;
      request({ url: url, encoding: null }, function (error, response, body) {
        show.poster = 'data:' + response.headers['content-type'] + ';base64,' + body.toString('base64');
        callback(error, show);
      });
    }
  ], function (err, show) {
    if (err) return next(err);
    show.save(function (err) {
      if (err) {
        if (err.code == 11000) {
          return res.send(409, { message: show.name + ' already exists.' });
        }
        return next(err);
      }
      var alertDate = Date.create('Next ' + show.airsDayOfWeek + ' at ' + show.airsTime).rewind({ hour: 2});
      agenda.schedule(alertDate, 'send email alert', show.name).repeatEvery('1 week');
      res.send(200);
    });
  });*/
  var job = new Job({
    category: req.body.category.value,
    title: req.body.title,
    tags: req.body.skills,
    longDesc: req.body.desc,
    budgetNumber: req.body.budgetNumber,
    budgetRate: req.body.budgetRate || 0,
    startedDate: new Date(),
    deadlineDate: new Date(req.body.deadline),
    featured: req.body.featured,
    views: 0,
    report: false,
    reportCounter: 0,
    status: 1, 
    poster: 0,
    verified: true, 
    user: req.user._id
  });
  job.save(function(err) {
    if (err) return next(err);
    console.log(job);
    User.findById(req.user._id, function (err, doc) {
    if (err) return handleError(err);
      doc.projects.push(job._id);
      doc.save(function(err){
        if (err) console.log(err);
      });
    });
    res.send(200);
  });

});

app.post('/api/subscribe', ensureAuthenticated, function(req, res, next) {
    Show.findById(req.body.showId, function(err, show) {
        if (err) return next(err);
        show.subscribers.push(req.user._id);
        show.save(function(err) {
            if (err) return next(err);
            res.send(200);
        });
    });
});

app.post('/api/answer', ensureAuthenticated, function(req, res, next) {
    Course.findById(req.body.questionId, function(err, question) {
        if (err) return next(err);
        question.question[0].questionBody = req.body.answerbody;
        question.save(function(err) {
            if (err) return next(err);
            res.send(200);
            console.log(question.question[0].questionBody + ' Saved Successfully');
        });
    });
});

app.post('/api/v1/bid', ensureAuthenticated, function(req, res, next) {

 var bid = new Bid({
  user: req.user._id,
  amount: req.body.amount,
  days: req.body.days,
  desc: req.body.desc,
  post_date: new Date()
 });

 bid.save(function(err, cb) {
  if (err) return Next(err);
    Job.update({_id: req.body.projectid}, {
      $push: {
        bids: cb._id
      }
    },{ upsert: false}, function(err){
      if (err) return Next(err);
    });
    User.update({_id: req.user._id}, {
      $push: {
        bids: cb._id
      }
    },{upsert: false}, function(err, cb){
      console.log(cb + 'row has effected');
      res.status(200).end();
    });

 });


});

app.get('/api/v1/user', function(req, res, next){
  if (req.query.tag) {
    var query = User.find({}).where('tags').in([req.query.tag]);
  } else {
    var query = User.find({});
  };
  query.limit(20).exec(function(err, users){
    if (err) return next(err);
    res.send(users);
  });
});
app.get('/api/v1/user/:id', ensureAuthenticated, function(req, res, next) {
  if (req.user._id == req.params.id) {
    User.findById(req.params.id, function(err, user){
      if (err) return next(err);
      res.send(user);
  });
  } else {
    res.send(400, { message: "You cannot access to this page !" });
  }
});
app.get('/api/v1/inbox/:id', ensureAuthenticated, function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if (err) return next(err);
    res.send(user);
  })
});

app.get('/api/v1/profile/:id', function(req, res, next){
  var resp = {};
  if (req.params.id === '111') {
    resp.status = 404;
    resp.error = 'nothing found here !';
    res.send(resp);
  }
  User.findById(req.params.id)
    .populate('projects')
    .exec(function(err, user){
      if (err) return next(err);  
    resp.data = user;
    resp.status = 200;
    res.send(resp);
  });
});

app.post('/api/v1/skills', ensureAuthenticated, function(req, res, next){
  User.update({_id: req.body.user._id}, {
      // $push: {
      //   tags: {
      //     $each: req.body.tags
      //   }
      tags: req.body.tags
    },{ upsert: true}, function(err){
      if (err) return next(err);
    });
    res.status(200).end();
});

app.post('/api/v1/summary', ensureAuthenticated, function(req, res, next){
  User.update({_id: req.body.user._id}, {
      summary: req.body.summary
    },{ upsert: true}, function(err){
      if (err) console.log(err);
    });
    res.status(200).end();
});

app.post('/api/v1/resume', ensureAuthenticated , function(req, res, next) {
User.update({_id: req.body.user._id}, {
  $push: {
    resumes: {
      title: req.body.resume.title,
      category: req.body.resume.category,
      start: req.body.resume.start, 
      finish: req.body.resume.finish,
      desc: req.body.resume.desc
    }
  }
}, {upsert: true}, function(err){
      if (err) console.log(err);
    });
res.status(200).end();
});
app.delete('/api/v1/resume/user/:id1/resume/:id2', ensureAuthenticated, function(req, res, next){
if (req.params.id1 && req.params.id2) {
  User.update({_id: req.params.id1}, {
    $pull: {
      resumes: {
        _id: req.params.id2
      }
    }
  }, {upsert: false}, function(err){
    if (err) console.log(err);
  });
  res.sendStatus(200);
} else {
  console.log('Resume delete parameter error !');
  res.sendStatus(401);
}
});

app.post('/api/v1/education', ensureAuthenticated , function(req, res, next) {
User.update({_id: req.body.user._id}, {
  $push: {
    educations: {
      name: req.body.education.name,
      start: req.body.education.start,
      finish: req.body.education.finish, 
      field: req.body.education.field,
      grade: req.body.education.grade
    }
  }
}, {upsert: true}, function(err){
      if (err) console.log(err);
    });
res.status(200).end();
});

app.delete('/api/v1/education/user/:id1/edu/:id2', ensureAuthenticated, function(req, res, next){
if (req.params.id1 && req.params.id2) {
  User.update({_id: req.params.id1}, {
    $pull: {
      educations: {
        _id: req.params.id2
      }
    }
  }, {upsert: false}, function(err){
    if (err) console.log(err);
  });
  res.sendStatus(200);
} else {
  console.log('Education delete parameter error !');
  res.sendStatus(401);
}
});


app.post('/upload' , function(req, res, next) {
 var form = new formidable.IncomingForm();
 form.uploadDir = './public/img-upload';
 form.keepExtensions = true;

 form.parse(req, function(err, fields, files){
        res.status(200).send('file uploaded Successfully');
        console.log("form.bytesReceived");
        // TESTING
        console.log("file size: "+JSON.stringify(files.file.size));
        console.log("file path: "+JSON.stringify(files.file.path));
        console.log("file name: "+JSON.stringify(files.file.name));
        console.log("file type: "+JSON.stringify(files.file.type));
        console.log("astModifiedDate: "+JSON.stringify(files.file.lastModifiedDate));
        // Formidable changes the name of the uploaded file
        // Rename the file to its original name
        fs.rename(files.file.path, './public/img-upload/' + files.file.name, function(err) {
        if (err) console.log(err);
          console.log('renamed complete');  
        });
 });
});



app.post('/api/unsubscribe', ensureAuthenticated, function(req, res, next) {
  Show.findById(req.body.showId, function(err, show) {
    if (err) return next(err);
    var index = show.subscribers.indexOf(req.user._id);
    show.subscribers.splice(index, 1);
    show.save(function(err) {
      if (err) return next(err);
      res.status(200).end();
    });
  });
});



app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

// agenda.define('send email alert', function(job, done) {
//   Show.findOne({ name: job.attrs.data }).populate('subscribers').exec(function(err, show) {
//     var emails = show.subscribers.map(function(user) {
//       if (user.facebook) {
//         return user.facebook.email;
//       } elseif (user.google) {
//         return user.google.email
//       } else {
//         return user.email
//       }
//     });

//     var upcomingEpisode = show.episodes.filter(function(episode) {
//       return new Date(episode.firstAired) > new Date();
//     })[0];

//     var smtpTransport = nodemailer.createTransport('SMTP', {
//       service: 'SendGrid',
//       auth: { user: 'hslogin', pass: 'hspassword00' }
//     });

//     var mailOptions = {
//       from: 'Fred Foo ✔ <foo@blurdybloop.com>',
//       to: emails.join(','),
//       subject: show.name + ' is starting soon!',
//       text: show.name + ' starts in less than 2 hours on ' + show.network + '.\n\n' +
//         'Episode ' + upcomingEpisode.episodeNumber + ' Overview\n\n' + upcomingEpisode.overview
//     };

//     smtpTransport.sendMail(mailOptions, function(error, response) {
//       console.log('Message sent: ' + response.message);
//       smtpTransport.close();
//       done();
//     });
//   });
// });

// //agenda.start();

// agenda.on('start', function(job) {
//   console.log("Job %s starting", job.attrs.name);
// });

// agenda.on('complete', function(job) {
//   console.log("Job %s finished", job.attrs.name);
// });