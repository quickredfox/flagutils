#!/usr/bin/env ruby
require 'ftools'
require 'fssm'
LIB_PATH = File.join(File.dirname(__FILE__), 'lib')
BUILD_PATH = File.join(File.dirname(__FILE__), 'build')
WARN = "/* DO NOT EDIT, FILE IS GENERATED */\n\n"


class JSBUILDERTasks
  def initialize
    @merged = []
    @compressed = ''
  end
  def build
    make_build_dirs
    merge_scripts
    make_compressed
    make_files
  end
  def watch
    FSSM.monitor(LIB_PATH, '*.js') do
      update {|base, relative| JSBUILDER.build }
      delete {|base, relative| JSBUILDER.build }
      create {|base, relative| JSBUILDER.build }
    end
  end
  
  private
  def merge_scripts
    @merged << File.read(File.join(LIB_PATH,'flagutil.js'))      
    @merged << File.read(File.join(LIB_PATH,'jquery-flagutil.js'))          
    @merged = "#{WARN}(function(window){\n#{@merged.join("\n").strip.gsub(/^/," ")}\n})(window);"
  end
  def make_compressed
    require "yui/compressor"
    compressor = YUI::JavaScriptCompressor.new(:munge=>true)
    @compressed = compressor.compress(@merged)
  end
  def make_files
    File.open(File.join(BUILD_PATH,'flagutil.js'), 'w').write(@merged)
    File.open(File.join(BUILD_PATH,'flagutil-compressed.js'), 'w').write("#{WARN}#{@compressed}")
  end
  def make_build_dirs
      File.makedirs(BUILD_PATH)
  end
end
JSBUILDER = JSBUILDERTasks.new
desc "Build the necessary files"
task :build do 
  JSBUILDER.build
end

desc "Watch the lib dir and regenerate as it changes"
task :watch do
  JSBUILDER.watch
end
