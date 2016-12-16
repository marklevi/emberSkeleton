'use strict';

const gulp = require('gulp');
const awspublish = require('gulp-awspublish');
const argv = require('yargs').argv;

gulp.task('publish', () => {
  let deployEnv = argv.env || 'dev';
  const bucketName = `las-iguanas-${deployEnv}.com`;

  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  const publisher = awspublish.create({
    region: 'eu-west-1',
    params: {
      Bucket: bucketName
    }
  });


  // define custom headers
  const headers = {
    'Cache-Control': 'max-age=60, no-transform, public'
  };

  return gulp.src('./dist/**/*')
    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(publisher.publish(headers))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

    // print upload updates to console
    .pipe(awspublish.reporter());
});


gulp.task('default', ['publish']);
