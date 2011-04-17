/**
 * jquery builder
 * --------------
 *
 * *AKA yet another jquery builder*
 * 
 * **jquery builder** is a jquery plugin for building XML or HTML dynamically.
 * I couldn't find a builder plugin with the syntax I wanted out there, so here's my version.
 * See [the project's github page](https://github.com/jeremyruppel/jquery.builder) for more information.
 *
 * **Contributors:**
 *
 * - [Jeremy Ruppel](https://github.com/jeremyruppel) *Author*
 *
 * - [Paulo Gabriel Poiati](https://github.com/poiati)
 */
( function( $ )
{
  /**
   * Builder class, provides builder API
   */
  var Builder = function( scope, tags )
  {
    // Shortcut to build method for expression-style building
    var self = function ( expression, value, options ) 
    { 
      self.build( expression, value, options, self.scope );
    };
    
    // The scope to start building on
    self.scope = scope;
    
    // The list of recognized tags
    self.tags = tags;
    
    // Create a method for each of the tags given
    $( tags ).each( $.proxy( function( index, tag )
    {
      this[ tag ] = function( value, options )
      {
        return this.build( tag, value, options, this.scope );
      };
    }, null, self ) );
    
    // Adds raw text to the builder's current scope
    self.text = function( value )
    {
      $( self.scope ).append( value );
      /*
        TODO test returns self for chaining
      */
    };
    
    // Adds an attribute to the builder's current scope
    self.attr = function( name, value )
    {
      $( self.scope ).attr( name, value );
      /*
        TODO test returns self for chaining
      */
    };
    
    // Generic build method to build onto a builder's current scope
    self.build = function( expression, value, options, scope )
    {
      // Create reference to the new tag
      var tagReference = new TagReference( expression );
      
      // Add the new tag to the current scope
      self.scope.append( tagReference.root );
      
      // Accept a couple types of values
      switch( typeof value )
      {
        // If it's a function, alter our scope and call it
        case 'function':
        
          // Change scope
          self.scope = tagReference.innermost;
          
          // Call the block
          value.call( self, self );
          
          // Revert the scope back
          self.scope = scope;
          
          break;
        // If it's a string or number, add it as text to the node
        case 'string':
        case 'number':
          
          tagReference.innermost.append( value );
          
          break;
        // If it's a hash, apply it as attributes to the node
        case 'object' :
        
          tagReference.innermost.attr( value );
        
          break;
      }
      
      // If the user wanted to pass text *and* an attribute hash, apply it now
      if( typeof options === 'object' )
      {
        tagReference.innermost.attr( options );
      }
      
      // Return self for chaining
      return self;
    };
    
    // End class definition
    return self;
  };
  
  /**
   * TagReference class, unifies API for builder when working with expressions or single tags
   */
  var TagReference = function( expression )
  {
    // Check if this is a complex ( more than one tag ) or simple expression and if is
    // complex return the outermost and innermost element
    var expr = new Expression( expression );
    var root = null, innermost = null;
    
    // If the expression is not complex, i.e. has only one tag, create it and return
    if ( !expr.isComplex( ) )
    {
      innermost = root = $( '<' + expression + '/>' );
      return { root : root, innermost : innermost };
    }

    // Else, create all of the tags in the expression and assign the root and innermost tag appropriately
    expr.eachTag( function( tag )
    {
      if ( !innermost )
      {
        innermost = root = $( '<' + tag + '/>' );
      }          
      else
      {
        innermost = $( '<' + tag + '/>' ).appendTo( innermost );
      }
    } );

    return { root : root, innermost : innermost };
  };
  
  /**
   * Expression class, allows creation of multiple nested tags through a simple syntax
   */
  var Expression = function( value )
  {
    // Null check for the expression value
    if( !value )
    {
      throw new Error( 'Invalid expression: empty or null' );
    }
    
    // Tags in an expression are separated by whitespace
    var tags = value.split( /\s+/ );
    
    // Whether or not this expression is complex, i.e. has more than one tag
    this.isComplex = function( )
    {
      return tags.length > 1;
    };
    
    // Sugar method to iterate over the tags in this expression
    this.eachTag = function( fn )
    {
      return $( tags ).each( function( ) { fn.call( null, String( this ) ); } );
    };
  };
  
  // A list of default tags to support
  var defaults = 'h1 h2 h3 h4 h5 div input span a ul li table tbody thead th tr td label hr'.split( /\s+/ );
  
  // A full list of the tags to support, including custom ones
  var available = defaults.concat( );
  
  // jquery build plugin
  // -------------------
  $.fn.build = function( value )
  {
    // Create our builder instance
    var builder = new Builder( this, available );
    
    // Accept a couple types of values here, too
    switch( typeof value )
    {
      // If it's a function, start building!
      case 'function':
        value.call( builder, builder );
        
        break;
      // If it's a string, add it to our custom tags list
      case 'string':
        
        if( builder.hasOwnProperty( value ) )
        {
          throw "jquery.builder: cannot add method '" + value + "' to builder because it is already defined";
        }
        
        available.push( value );
      
        break;
      
      // If it's a boolean and it's false, reset the tags list
      case 'boolean' :
      
        if( value === false )
        {
          available = defaults.concat( );
        }
    }
    // Return jquery for chaining
    return this;
  };
} )( jQuery );