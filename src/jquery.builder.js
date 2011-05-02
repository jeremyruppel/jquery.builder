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
    
    // The scope is a reference to a jQuery wrapped element
    // $ is just an alias for the scope
    var changeScope = function( newScope )
    {
      self.scope = self.$ = newScope;
    };
    
    // The scope to start building on
    changeScope( scope );
    
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
      
      // Return self for chaining
      return self;
    };
    
    // Adds an attribute to the builder's current scope
    self.attr = function( name, value )
    {
      $( self.scope ).attr( name, value );
      
      // Return self for chaining
      return self;
    };
    
    // Generic build method to build onto a builder's current scope
    self.build = function( expr, value, options, scope )
    {
      // Create reference to the new tag
      var expression = new Expression( expr );
      
      // Add the new tag to the current scope
      self.scope.append( expression.root );
      
      // Accept a couple types of values
      switch( typeof value )
      {
        // If it's a function, alter our scope and call it
        case 'function':
        
          // Change scope
          changeScope( expression.innermost );
          
          // Call the block
          value.call( self, self );
          
          // Revert the scope back
          changeScope( scope );
          
          break;
        // If it's a string or number, add it as text to the node
        case 'string':
        case 'number':
          
          expression.innermost.append( value );
          
          break;
        // If it's a hash, apply it as attributes to the node
        case 'object' :
        
          expression.innermost.attr( value );
        
          break;
      }
      
      // If the user wanted to pass text *and* an attribute hash, apply it now
      if( typeof options === 'object' )
      {
        expression.innermost.attr( options );
      }
      
      // Return self for chaining
      return self;
    };
    
    // End class definition
    return self;
  };
  
  // Regexp for finding a tag name in an expression
  var tagNameExprPattern = /([\w-_]+)[\.#]?/g;
  // Regexp for finding a class in an expression
  var classExprPattern   = /\.([\w-_]+)/g;
  // Regexp for finding an id in an expression
  var idExprPattern      = /#([\w-_]+)/g;
  
  /**
   * Expression class
   * ----------------
   * An expression represents a more advanced syntax for building nodes.
   * Unifies API for builder when working with expressions or single tags.
   */
  var Expression = function( value )
  {
    // Null check for the expression value
    if( !value )
    {
      throw new Error( 'Invalid expression: empty or null' );
    }
    
    // Reset RegExp object last match index
    var resetRegexp = function( regexp ) 
    { 
      regexp.lastIndex = 0; 
    };
    
    // Extract the tag name from the expression
    var extractTagName = function( expr )
    {
      resetRegexp( tagNameExprPattern );
      
      return tagNameExprPattern.exec( expr )[ 1 ];
    };
    
    // Extract the tag id from the expression
    var extractId = function( expr ) {
      resetRegexp( idExprPattern );
      var matcher = idExprPattern.exec( expr );
      
      return matcher ? matcher[ 1 ] : null;
    };
    
    // Extract the classes from the expression
    var extractClasses = function( expr ) 
    {
      resetRegexp( classExprPattern );
      var clazz = null, result = [ ];
      
      while ( ( clazz = classExprPattern.exec( expr ) ) )
      {
        result.push( clazz[ 1 ] );
      }
      return result;
    };
    
    // Builds a jquery selector for a given tag name
    var makeTag = function( expr )
    { 
      var newTag = $( '<' + extractTagName( expr ) + '/>' ),
          id     = extractId( expr );
      
      // Add the id if it is present in the expression
      if ( id !== null )
      {
        newTag.attr( 'id', id );
      }
      
      // Add the classes to the tag and return it
      return newTag.addClass( extractClasses( expr ).join( ' ' ) );
    };
    
    // Tags in an expression are separated by whitespace
    var tags = value.split( /\s+/ );
    
    // Define the root tag
    this.root = makeTag( tags.shift( ) );
    
    // If there is only one tag, the innermost tag *is* the root tag
    this.innermost = this.root;
    
    // If there are more tags left, tack them onto the root and alter the innermost tag reference
    $( tags ).each( $.proxy( function( index, tag )
    {
      this.innermost = makeTag( tag ).appendTo( this.innermost );
    },
    this ) );
  };
  
  // A list of default tags to support
  var defaults = 'h1 h2 h3 h4 h5 div form input span a ul li table tbody thead th tr td label hr p style script'.split( /\s+/ );
  
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