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