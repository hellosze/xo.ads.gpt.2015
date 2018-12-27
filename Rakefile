require 'filewatcher'
require 'fileutils'


namespace :build do
  desc 'Compile and deploy'

 task :create do
    puts "Minifying"
    system("grunt")
    puts "End minifying"
  end


  task :development do
    Rake::Task["build:create"].invoke

    puts "Syncing xo.ads.gpt.js with Develop S3 bucket"
    system("aws --profile=patterns s3 cp build/javascripts/xo.ads.gpt.min.js s3://dev-patterns.xogrp.com/javascripts/xo.ads.gpt.min.js --acl=public-read")
  end

  task :qa do
    Rake::Task["build:create"].invoke

    puts "Syncing xo.ads.gpt.js with QA S3 bucket"
    system("aws --profile=patterns s3 cp build/javascripts/xo.ads.gpt.min.js s3://qa-patterns.xogrp.com/javascripts/xo.ads.gpt.min.js --acl=public-read")
  end

  task :production do
    Rake::Task["build:create"].invoke

    puts "Syncing xo.ads.gpt.js with Production S3 bucket"
    system("aws --profile=patterns s3 cp build/javascripts/xo.ads.gpt.min.js s3://patterns.xogrp.com/javascripts/xo.ads.gpt.min.js --acl=public-read")
  end
end
