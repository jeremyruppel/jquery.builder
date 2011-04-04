jquery.builder plugin
=====================

*AKA yet another jquery builder*

**jquery builder** is a jquery plugin for building XML or HTML dynamically.
I couldn't find a builder plugin with the syntax I wanted out there, so here's my version.

Usage
-----

To start building, use the `build` method. You can give this build method a block.

  $( '#context' ).build( function( )
  {
    this.div( 'hello!' );
  } );
  
  $( '#context' ).html( ); // => <div>hello!</div>

In this block and any child blocks, `this` refers to the builder instance. The same builder
instance will also be passed to the block if you want to name the reference.

  $( '#context' ).build( function( b )
  {
    b.div( 'hello!' );
  } );

The builder object has a method for every common html tag, but you can add your own tag 
methods easily (more on that later).

