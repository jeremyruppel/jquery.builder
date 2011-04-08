require 'bundler'
Bundler.require

# 
# Documentation tasks
# 
desc "Generates docco docs"
task :docco do
  FileUtils.rm_rf 'doc'
  FileUtils.mkdir 'doc'
  File.open 'doc/jquery.builder.js.html', 'w' do |f|
    f << Rocco.new( 'src/jquery.builder.js', [ ], { :language => 'js' } ).to_html
  end
end

# 
# Release tasks
# 
namespace :release do
  
  desc "Clears out the bin directory"
  task :clear do
    FileUtils.rm_rf 'bin'
    FileUtils.mkdir 'bin'
  end
  
  desc "Generates the debug version of the script"
  task :debug do
    File.open 'bin/jquery.builder.js', 'w' do |f|
      f << IO.read( 'src/jquery.builder.js' )
    end
  end
  
  desc "Generates the minified version of the script"
  task :minify do
    File.open 'bin/jquery.builder.min.js', 'w' do |f|
      f << Uglifier.new.compile( IO.read( 'src/jquery.builder.js' ) )
    end
  end
  
end

desc "Generate release files"
task :release => [ :'release:clear', :'release:debug', :'release:minify', :docco ]