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

For building node hierarchies, you can give any tag method a block and the builder will adjust
its scope appropriately:

	$( '#context' ).build( function( )
	{
		this.div( function( )
		{
			this.div( 'nested' );
		} );
		
		this.span( function( )
		{
			this.a( 'hierarchy' );
		} );
	} );
	
	$( '#context' ).html( ); // => <div><div>nested</div></div><span><a>hierarchy</a></span>

Scope can be nested as deeply as you want. Go crazy.

You can pass a hash of options to any tag method and those key-value pairs will be added as
attributes to the created node.

	$( '#context' ).build( function( )
	{
		this.a( { href : 'github.com' } );
	} );
	
	$( '#context' ).html( ); // => <a href="github.com"></a>

The options hash may also be passed after the node text, like:

	$( '#context' ).build( function( )
	{
		this.a( 'github rules', { href : 'github.com' } );
	} );

	$( '#context' ).html( ); // => <a href="github.com">github rules</a>

Custom Tags
-----------

If you're building XML, you're going to need some custom tags. **jquery.builder** can be set up
to build any tag that isn't a reserved word. Just pass your tag name to the `build` method and
it will be available on any new builders.

	$( '#context' ).build( 'custom' );
	
	$( '#context' ).build( function( )
	{
		this.custom( 'sweet' );
	} );
	
	$( '#context' ).html( ); // => <custom>sweet</custom>

If at any point you need to reset the tag list to the defaults, just pass *false* to the `build` method.

Right now, custom tags are shared between all builder instances regardless of their context node.

Expressions Syntax
-----------

Expressions is the easiest way to create nested elements. Using it you don't need to specify a function to every nested object. You can also mix expressions style with the standard builder style.

    $( '#context' ).build( function( )
    {
      this( 'body div ul', function ( ) 
      {
        this( 'li', function ( ) 
        {
          this.a( function ( ) { this.text( 'Hello World' ); }, { class: 'text' } );
        } );
      } );
    } );
  
    $( '#context' ).html( ); // <body><div><ul><li><a class="text">Hello World</a></li></ul></div></body>